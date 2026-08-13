---
description: Sync a <db>-alerts chart's alert.yaml into the kubedbcom-<db> editor charts
argument-hint: "[--check] [db|--all] (omit to list syncable dbs)"
allowed-tools: Bash, Read, Edit
---

All the work is done by `.claude/commands/sync-alerts.sh`. Do not reimplement its logic, do not
hand-edit the templates, and do not do the transform yourself — just run the script and report
what it printed.

Arguments: $ARGUMENTS

## Run

```bash
bash .claude/commands/sync-alerts.sh $ARGUMENTS
```

- No arguments → the script lists syncable dbs and the ones skipped for having no upstream
  `<db>-alerts` chart, and changes nothing. Show that list and ask which db to sync.
- `<db> [db...]` → syncs those dbs.
- `--all` → syncs every matched db.
- `--check` (first arg, combinable with the above) → reports what would change, writes nothing.
- `ALERTS_DIR` env var overrides the alerts repo location
  (default `~/go/src/go.opnpulse.dev/alerts`).

Exit 0 means everything is in sync and verified. Exit 1 means at least one db needs attention.

## Report

Relay the script's output. Non-zero exit means one of:

- **`DIFFERS (check mode, not written)`** — the template is out of date; re-run without `--check`.
- **`values form.alert DIFFERS from source`** — copy `form.alert` from
  `$ALERTS_DIR/charts/<db>-alerts/values.yaml` into that chart's `values.yaml`, minding the
  differing nesting depth between `-editor` and `-editor-options`. Then:
  - Always run `make gen-chart-doc-kubedbcom-<db>-<suffix>` (needs docker) — `README.md` embeds
    the `values.yaml` defaults, so it goes stale on any threshold change.
  - If rule **keys** changed (not just thresholds), also run `make gen`.
    `values.openapiv3_schema.yaml` is generated from the vendored `go.appscode.dev/alerts` types —
    never hand-edit it, never edit `vendor/`. If the vendored type lacks the new field, a dep bump
    is needed first: **stop and ask the user**, don't bump it yourself.

  Before editing, diff the two `form.alert` trees and classify each difference. A value stored as
  `8e+08` where the source has `800000000` is the same number in a different YAML scalar form —
  normalize it, but don't report it as a threshold change.
- **`ERROR rule in template but not in values.yaml`** — the form is missing a knob the template
  reads; same fix as above.
- **`RENDER FAILED` / `CROSS-DIFF`** — report verbatim, don't paper over it.

Lines marked `info:` are not failures; mention them only if the user asks.

Do not run `make fmt` if the script wrote nothing. Do not commit unless asked.
