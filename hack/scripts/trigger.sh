#!/bin/bash

set -eou pipefail

SCRIPT_ROOT=$(realpath $(dirname "${BASH_SOURCE[0]}"))
SCRIPT_NAME=$(basename "${BASH_SOURCE[0]}")

PR_BRANCH=master
COMMIT_MSG="Update charts"

skip_trigger() {
    while IFS=$': \r\t' read -r -u9 marker v; do
        if [ "$marker" = "/skip-trigger" ]; then
            return 0
        fi
    done 9< <(git show -s --format=%b)
    return 1
}

skip_trigger && {
    echo "Skipped recursive trigger."
    exit 0
}

repo_uptodate() {
    ignorefiles=(stable/index.yaml)
    # https://remarkablemark.org/blog/2017/10/12/check-git-dirty/
    changed=($(git status --porcelain | awk '{print $2}'))
    changed+=("${ignorefiles[@]}")
    # https://stackoverflow.com/a/28161520
    diff=($(echo ${changed[@]} ${ignorefiles[@]} | tr ' ' '\n' | sort | uniq -u))
    return ${#diff[@]}
}

echo "Update chart repo"
./hack/scripts/update-repo.sh

if repo_uptodate; then
    echo "Repository is up-to-date."
    exit 0
fi

git add --all
git commit -a -s -m "$COMMIT_MSG" -m "/skip-trigger"
git push -u origin $PR_BRANCH
