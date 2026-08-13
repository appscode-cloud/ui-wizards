#!/usr/bin/env bash

# Syncs <db>-alerts/templates/alert.yaml from the alerts repo into this repo's
# kubedbcom-<db>-editor and kubedbcom-<db>-editor-options charts.
#
# Usage:
#   sync-alerts.sh              # list syncable dbs, change nothing
#   sync-alerts.sh <db> [db...] # sync the named dbs
#   sync-alerts.sh --all        # sync every matched db
#   sync-alerts.sh --check ...  # report what would change, write nothing
#
# Env:
#   ALERTS_DIR  root of the alerts repo (default ~/go/src/go.opnpulse.dev/alerts)

set -euo pipefail

ALERTS_DIR="${ALERTS_DIR:-$HOME/go/src/go.opnpulse.dev/alerts}"
REPO_ROOT="$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)"
cd "$REPO_ROOT"

TMPROOT="$(mktemp -d)"
trap 'rm -rf "$TMPROOT"' EXIT

CHECK=0

srcFile() { echo "$ALERTS_DIR/charts/$1-alerts/templates/alert.yaml"; }
dstFile() { echo "charts/kubedbcom-$1-$2/templates/monitoring/alert.yaml"; }

candidates() {
    local d db
    for d in charts/kubedbcom-*-editor-options; do
        db="${d#charts/kubedbcom-}"
        db="${db%-editor-options}"
        echo "$db"
    done
}

listDbs() {
    local db matched=() skipped=()
    while read -r db; do
        if [ -f "$(srcFile "$db")" ]; then matched+=("$db"); else skipped+=("$db"); fi
    done < <(candidates)

    echo "syncable (${#matched[@]}):"
    printf '  %s\n' "${matched[@]}"
    if [ ${#skipped[@]} -gt 0 ]; then
        echo "skipped, no upstream <db>-alerts chart (${#skipped[@]}):"
        printf '  %s\n' "${skipped[@]}"
    fi
}

matchedDbs() {
    local db
    while read -r db; do
        [ -f "$(srcFile "$db")" ] && echo "$db"
    done < <(candidates)
}

# transform <db> <dst-chart-name> < src > dst
transform() {
    local src="$1-alerts" dst="$2"
    perl -0777 -pe "
    s{^([ ]*)\\Q{{- include \"$src.labels\" . | nindent 4 }}\\E\$}
     {\$1.'app.kubernetes.io/managed-by: {{ .Release.Service }}'.\"\\n\".\$1.'{{- include \"$dst.selectorLabels\" . | nindent 4 }}'}gme;
    s{\\.rules\\.(\\w+)\\.enabled \\.rules\\.\\1\\.severity\\)}{.rules \"\$1\")}g;
    s{\"\\Q$src.\\E}{\"$dst.}g;
  "
}

# ruleKeys <template-file>  -> sorted unique rule keys referenced by the template
ruleKeys() {
    grep -o '\.rules "[A-Za-z0-9_]*"' "$1" | sed 's/.*"\(.*\)"/\1/' | sort -u
}

# valuesKeys <chart-dir> -> sorted unique rule keys declared in values.yaml
valuesKeys() {
    python3 -c '
import sys, yaml
v = yaml.safe_load(open(sys.argv[1]))
ks = set()
for g in v["form"]["alert"]["groups"].values():
    ks |= set(g.get("rules") or {})
print("\n".join(sorted(ks)))
' "$1/values.yaml"
}

# valuesEqual <db> <chart-dir> -> prints yes/no
valuesEqual() {
    python3 -c '
import sys, yaml
a = yaml.safe_load(open(sys.argv[1]))["form"]["alert"]
b = yaml.safe_load(open(sys.argv[2]))["form"]["alert"]
print("yes" if a == b else "no")
' "$ALERTS_DIR/charts/$1-alerts/values.yaml" "$2/values.yaml"
}

syncDb() {
    local db="$1" src suffix chart dst tmp rc=0
    src="$(srcFile "$db")"

    echo "=== $db"
    if [ ! -f "$src" ]; then
        echo "  ERROR: no source at $src"
        return 1
    fi

    tmp="$TMPROOT/$db"
    mkdir -p "$tmp"

    for suffix in editor-options editor; do
        chart="charts/kubedbcom-$db-$suffix"
        dst="$(dstFile "$db" "$suffix")"
        if [ ! -d "$chart" ]; then
            echo "  ERROR: missing chart $chart"
            return 1
        fi
        mkdir -p "$(dirname "$dst")"
        transform "$db" "kubedbcom-$db-$suffix" <"$src" >"$tmp/new-$suffix"
        if [ -f "$dst" ] && cmp -s "$dst" "$tmp/new-$suffix"; then
            echo "  $dst: unchanged"
        elif [ "$CHECK" = 1 ]; then
            echo "  $dst: DIFFERS (check mode, not written)"
            rc=1
        else
            cp "$tmp/new-$suffix" "$dst"
            echo "  $dst: WROTE"
        fi
    done

    # drift check.
    #
    # Two independent things are checked, and only two things are actionable:
    #
    #  1. form.alert differs from the source chart's -> copy it over, then 'make gen'.
    #  2. the template references a rule key that values.yaml doesn't declare -> the form
    #     is missing a knob, so the rule renders against a nil value. Hard error.
    #
    # The reverse (values declares a key the template never references) is NOT actionable
    # when form.alert already matches the source: the upstream alerts chart carries the same
    # unused keys, so it's an upstream-wide unused form field, not a sync failure. Reported
    # as INFO and does not fail the run.
    for suffix in editor-options editor; do
        chart="charts/kubedbcom-$db-$suffix"
        ruleKeys "$tmp/new-$suffix" >"$tmp/tpl"
        valuesKeys "$chart" >"$tmp/val"
        local onlyTpl onlyVal eq
        onlyTpl="$(comm -23 "$tmp/tpl" "$tmp/val" | tr '\n' ' ')"
        onlyVal="$(comm -13 "$tmp/tpl" "$tmp/val" | tr '\n' ' ')"
        eq="$(valuesEqual "$db" "$chart")"

        if [ "$eq" = yes ]; then
            echo "  $chart: values form.alert matches source"
        else
            echo "  $chart: values form.alert DIFFERS from source"
            echo "    -> copy form.alert from $ALERTS_DIR/charts/$db-alerts/values.yaml,"
            echo "       then 'make gen-chart-doc-kubedbcom-$db-$suffix' (needs docker) because"
            echo "       README.md embeds the values.yaml defaults."
            echo "       If rule KEYS changed (not just thresholds), also 'make gen': "
            echo "       values.openapiv3_schema.yaml is generated from the vendored"
            echo "       go.appscode.dev/alerts types — never hand-edit it, and if the vendored"
            echo "       type lacks the field, a dep bump is needed first."
            rc=1
        fi

        if [ -n "$onlyTpl" ]; then
            echo "    ERROR rule in template but not in values.yaml: $onlyTpl"
            rc=1
        fi
        if [ -n "$onlyVal" ]; then
            echo "    info: rule in values.yaml never used by template: $onlyVal"
            if [ "$eq" = yes ]; then
                echo "          (same upstream — unused form knob, not a sync problem)"
            fi
        fi
    done

    # verify: both charts render, and render identically apart from the Source comment
    for suffix in editor-options editor; do
        chart="charts/kubedbcom-$db-$suffix"
        if ! helm template rel "$chart" -s templates/monitoring/alert.yaml >"$tmp/render-$suffix" 2>"$tmp/err-$suffix"; then
            echo "  $chart: RENDER FAILED"
            sed 's/^/    /' "$tmp/err-$suffix"
            rc=1
            continue
        fi
        echo "  $chart: renders OK, $(grep -c '^ *- alert:' "$tmp/render-$suffix") alerts"
    done

    if [ -s "$tmp/render-editor-options" ] && [ -s "$tmp/render-editor" ]; then
        if ! diff <(grep -v '^# Source:' "$tmp/render-editor-options") \
            <(grep -v '^# Source:' "$tmp/render-editor") >"$tmp/crossdiff"; then
            echo "  CROSS-DIFF: editor and editor-options renders differ"
            sed 's/^/    /' "$tmp/crossdiff"
            rc=1
        else
            echo "  cross-diff: identical"
        fi
    fi

    return $rc
}

main() {
    local rc=0 dbs=()
    if [ "${1:-}" = "--check" ]; then
        CHECK=1
        shift
    fi
    case "${1:-}" in
        "" | --list)
            listDbs
            return 0
            ;;
        --all) while read -r db; do dbs+=("$db"); done < <(matchedDbs) ;;
        *) dbs=("$@") ;;
    esac

    for db in "${dbs[@]}"; do
        syncDb "$db" || rc=1
    done
    return $rc
}

main "$@"
