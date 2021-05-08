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

for dir in charts/*/; do
    dir=${dir%*/}
    dir=${dir##*/}
    echo $dir
    if [ ! -d "charts/${dir}/templates" ] || [ $(find charts/${dir}/templates -type f | wc -l) -le 1 ]; then
        make ct CT_COMMAND=lint TEST_CHARTS=charts/$dir
    else
        make ct TEST_CHARTS=charts/$dir
    fi
done
