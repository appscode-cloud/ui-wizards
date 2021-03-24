#!/bin/bash

# Copyright AppsCode Inc. and Contributors
#
# Licensed under the AppsCode Free Trial License 1.0.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://github.com/appscode/licenses/raw/1.0.0/AppsCode-Free-Trial-1.0.0.md
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -eou pipefail

SCRIPT_ROOT=$(realpath $(dirname "${BASH_SOURCE[0]}")/../..)
SCRIPT_NAME=$(basename "${BASH_SOURCE[0]}")

pushd $SCRIPT_ROOT

# http://redsymbol.net/articles/bash-exit-traps/
function cleanup() {
    popd
}
trap cleanup EXIT

CHARTS_DIR=charts
TMP_DIR="${SCRIPT_ROOT}/tmp"

REPO_DIR=${REPO_DIR:-stable}
REPO_URL=https://raw.githubusercontent.com/bytebuilders/ui-wizards/master/${REPO_DIR}/

# create temporary charts folder
mkdir -p $TMP_DIR/$CHARTS_DIR
# package charts
cd $SCRIPT_ROOT

find $CHARTS_DIR -maxdepth 1 -mindepth 1 -type d -exec helm package {} -d {} \;

cd $CHARTS_DIR
find . -maxdepth 1 -mindepth 1 -type d -exec mkdir -p $TMP_DIR/$CHARTS_DIR/{} \;
find . -path ./$CHARTS_DIR -prune -o -name '*.tgz' -exec mv {} $TMP_DIR/$CHARTS_DIR/{} \;

# update index
cd $TMP_DIR
mkdir -p $SCRIPT_ROOT/$REPO_DIR
if [ -f $SCRIPT_ROOT/$REPO_DIR/index.yaml ]; then
    helm repo index --merge $SCRIPT_ROOT/$REPO_DIR/index.yaml --url $REPO_URL $CHARTS_DIR
else
    helm repo index --url $REPO_URL $CHARTS_DIR
fi
mv $CHARTS_DIR/index.yaml $SCRIPT_ROOT/$REPO_DIR/index.yaml
cd $CHARTS_DIR
find . -maxdepth 1 -mindepth 1 -type d -exec mkdir -p $SCRIPT_ROOT/$REPO_DIR/{} \;
find . -path ./$CHARTS_DIR -prune -o -name '*.tgz' -exec mv {} $SCRIPT_ROOT/$REPO_DIR/{} \;
rm -rf $TMP_DIR
