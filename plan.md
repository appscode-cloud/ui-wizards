# Solr external zookeeperRef — backend wiring

Frontend (create-ui.yaml/functions.js/language.yaml) already has an "external zookeeper" toggle
for Solr, but it's UI-only (`temp/zookeeperExternal`), because the Go API has no
`externallyManaged` field. Mirror Druid's pattern (`DruidZooKeeperRef`) for Solr.

## Changes

1. **`apis/wizards/v1alpha1/kubedbcom_solr_editor_options_types.go`**
   - Add `SolrZooKeeperRef` struct (mirrors `DruidZooKeeperRef`):
     ```go
     type SolrZooKeeperRef struct {
         ObjectReference   `json:",inline"`
         ExternallyManaged bool `json:"externallyManaged"`
     }
     ```
   - Change `ZookeeperRef ObjectReference` → `ZookeeperRef SolrZooKeeperRef` in
     `KubedbcomSolrEditorOptionsSpecSpec`.

2. **`make gen`** — regenerate `zz_generated.deepcopy.go` (adds `SolrZooKeeperRef.DeepCopyInto/DeepCopy`)
   and `charts/kubedbcom-solr-editor-options/values.openapiv3_schema.yaml` (adds
   `externallyManaged` under `zookeeperRef`).

3. **`charts/kubedbcom-solr-editor-options/values.yaml`**
   - Add `externallyManaged: false` under `spec.zookeeperRef`.

4. **`charts/kubedbcom-solr-editor-options/templates/db.yaml`**
   - Guard the zookeeperRef block like Druid's and emit `externallyManaged`:
     ```yaml
     {{- if .Values.spec.zookeeperRef.name }}
       zookeeperRef:
         name: {{ .Values.spec.zookeeperRef.name }}
         namespace: {{ .Values.spec.zookeeperRef.namespace }}
         externallyManaged: {{ .Values.spec.zookeeperRef.externallyManaged }}
     {{- end }}
     ```

5. **`charts/kubedbcom-solr-editor-options/ui/create-ui.yaml`**
   - Point "Zookeeper External" switch at the real schema path:
     `schema/properties/spec/properties/zookeeperRef/properties/externallyManaged`
     (instead of `temp/zookeeperExternal`).
   - Change guard `if.name` from `isZookeeperExternal` to the generic
     `isExternallyManaged|zookeeperRef` (same convention as Druid).

6. **`charts/kubedbcom-solr-editor-options/ui/functions.js`**
   - Replace Solr-specific `isZookeeperExternal()` with Druid's generic
     `isExternallyManaged(type)` (parametrized, reads `/spec/${type}/externallyManaged`
     from the model, clears refs when false) — reuse Druid's implementation verbatim,
     adapted to Solr's existing `getAppBindings`/`onRefChange`/`clearRefs` helpers already
     present in this file.

7. Run `go build ./...` to confirm compilation after `make gen`.

## Out of scope
- No changes to `language.yaml` (already has the right labels for both `external` and `zookeeper` keys).
- No changes to Druid files.
