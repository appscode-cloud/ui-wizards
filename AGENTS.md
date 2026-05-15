# AGENTS.md

This file provides guidance to coding agents (e.g. Claude Code, claude.ai/code) when working with code in this repository.

## Repository purpose

Go module `go.bytebuilders.dev/ui-wizards` — the **chart registry of editor wizards** consumed by the AppsCode console. Hundreds of Helm-chart-shaped editors, one per Kubernetes resource kind (across cert-manager, OCM, Cluster API, KubeDB, KubeStash, KubeVault, etc.). Each chart renders a form-driven editor for its target resource.

The README documents how to consume the registry via Helm.

## Architecture

- `charts/` — one chart per editor, named `<group>-<resource>-editor` (e.g. `addonskubestashcom-addon-editor`). Each chart is a Helm chart with templates plus a `values.openapiv3_schema.yaml`.
- `apis/` — Go types backing the chart values (consumed by the `ui-builder` form renderer).
- `data/` — supporting data (e.g. `machines.yaml`).
- `hack/`, `Makefile` — generation harness.
- `lintconf.yaml` — chart-testing YAML lint config.

## Common commands

- `make gen` — regenerate chart values schemas and per-chart docs after changes to `apis/`.
- `make fmt`, `make lint`, `make unit-tests` / `make test` — standard.
- `make ct` — chart-testing.
- `make verify` — module-tidy verification.

## Conventions

- Module path is `go.bytebuilders.dev/ui-wizards`; imports must use that.
- Each editor is identified by its **`<group>-<resource>-editor`** chart name; that's the user contract (the console fetches by that name). Don't rename existing charts.
- Form schemas come from the Go types under `apis/` via `gen-values-schema`. Don't hand-edit `values.openapiv3_schema.yaml`.
- Adding a new editor: drop a new `charts/<group>-<resource>-editor/` directory, add the matching Go type under `apis/`, run `make gen`.
- License: `LICENSE.md`. Sign off commits (`git commit -s`).
