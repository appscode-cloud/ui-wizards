{{/*
Expand the name of the chart.
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.labels" -}}
{{ include "kubedbcom-elasticsearch-editor-options.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- range $k, $v := .Values.spec.labels }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.selectorLabels" -}}
app.kubernetes.io/name: elasticsearches.kubedb.com
app.kubernetes.io/instance: {{ include "kubedbcom-elasticsearch-editor-options.fullname" . }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.serviceAccountName" -}}
{{- if .Values.spec.serviceAccount.create }}
{{- default (include "kubedbcom-elasticsearch-editor-options.fullname" .) .Values.spec.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.spec.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Common annotations
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.annotations" -}}
{{- range $k, $v := .Values.spec.annotations }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Alert labels
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.alertLabels" -}}
k8s_group: {{ .Values.metadata.resource.group }}
k8s_kind: {{ .Values.metadata.resource.kind }}
k8s_resource: {{ .Values.metadata.resource.name }}
app: {{ include "kubedbcom-elasticsearch-editor-options.fullname" . }}
app_namespace: {{ .Release.Namespace }}
{{- if .Values.form.alert.additionalRuleLabels }}
{{ toYaml .Values.form.alert.additionalRuleLabels }}
{{- end }}
{{- end }}

{{/*
Alerts Enabled
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.alertsEnabled" -}}
{{- $ranks := dict "critical" 1 "warning" 2 "info" 3 -}}
{{- $result := dig . 0 $ranks -}}
{{- if $result -}}{{ . }}{{- end -}}
{{- end }}

{{/*
Alert Group Enabled
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.alertGroupEnabled" -}}
{{- $ranks := dict "critical" 1 "warning" 2 "info" 3 -}}
{{- $flags := (mustLast .) -}}
{{- $group := dig (mustFirst .) 0 $ranks -}}
{{- $group = min $group (dig $flags.enabled 0 $ranks) -}}
{{- $hasRules := false -}}
{{- range $k, $v := $flags.rules -}}
{{- $sev := dig $v.severity 0 $ranks -}}
{{- if (and $sev (le $sev $group) $v.enabled) -}}{{ $hasRules = true }}{{- end -}}
{{- end -}}
{{- if (and $group $hasRules) -}}{{ $flags.enabled }}{{- end -}}
{{- end }}

{{/*
Alert Enabled
*/}}
{{- define "kubedbcom-elasticsearch-editor-options.alertEnabled" -}}
{{- $ranks := dict "critical" 1 "warning" 2 "info" 3 -}}
{{- $sev := dig (mustLast .) 0 $ranks -}}
{{- $flags := mustInitial . -}}
{{- $enabled := mustLast $flags -}}
{{- $flags = mustInitial $flags -}}
{{- $result := 3 -}}
{{- range $x := $flags -}}
{{- $result = min $result (dig $x 0 $ranks) -}}
{{- end -}}
{{- if (and $sev (le $sev $result) $enabled) -}}{{ (mustLast .) }}{{- end -}}
{{- end }}

{{- define "container.securityContext" -}}
allowPrivilegeEscalation: false
capabilities:
  drop:
  - ALL
runAsGroup: 0
runAsNonRoot: true
runAsUser: {{ $.Values.spec.openshift.securityContext.runAsUser | default 1000 }}
seccompProfile:
  type: RuntimeDefault
{{- end }}




{{- define "resource-profiles" -}}
{{- $machines := .Files.Get "data/machines.yaml" | fromYaml -}}
{{- $profiles := dict -}}

{{- $res := dict -}}
{{- $master_res := dict -}}
{{- $data_res := dict -}}
{{- $ingest_res := dict -}}

{{- if eq .Values.spec.mode "Topology" }}

  {{- $master_res = .Values.spec.topology.master.podResources.resources -}}

  {{- if and .Values.spec.topology.master.podResources.machine (hasKey $machines .Values.spec.topology.master.podResources.machine) }}
    {{- $master_res = get (get $machines .Values.spec.topology.master.podResources.machine) "resources" }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.topology.master.podResources.machine (eq .id $.Values.spec.topology.master.podResources.machine) }}
      {{- $master_res = dict "requests" .limits "limits" .limits }}
      {{- $_ := set $profiles "master" .id }}
    {{- end }}
  {{- end }}

  {{- $data_res = .Values.spec.topology.data.podResources.resources -}}

  {{- if and .Values.spec.topology.data.podResources.machine (hasKey $machines .Values.spec.topology.data.podResources.machine) }}
    {{- $data_res = get (get $machines .Values.spec.topology.data.podResources.machine) "resources" }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.topology.data.podResources.machine (eq .id $.Values.spec.topology.data.podResources.machine) }}
      {{- $data_res = dict "requests" .limits "limits" .limits }}
      {{- $_ := set $profiles "data" .id }}
    {{- end }}
  {{- end }}

  {{- $ingest_res = .Values.spec.topology.ingest.podResources.resources -}}

  {{- if and .Values.spec.topology.ingest.podResources.machine (hasKey $machines .Values.spec.topology.ingest.podResources.machine) }}
    {{- $ingest_res = get (get $machines .Values.spec.topology.ingest.podResources.machine) "resources" }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.topology.ingest.podResources.machine (eq .id $.Values.spec.topology.ingest.podResources.machine) }}
      {{- $ingest_res = dict "requests" .limits "limits" .limits }}
      {{- $_ := set $profiles "ingest" .id }}
    {{- end }}
  {{- end }}

{{- else }}

  {{- $res = .Values.spec.podResources.resources -}}

  {{- if and .Values.spec.podResources.machine (hasKey $machines .Values.spec.podResources.machine) }}
    {{- $res = get (get $machines .Values.spec.podResources.machine) "resources" }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.podResources.machine (eq .id $.Values.spec.podResources.machine) }}
      {{- $res = dict "requests" .limits "limits" .limits }}
        {{- $_ := set $profiles "node" .id }}
    {{- end }}
  {{- end }}

{{- end }}


{{- $init_res := dict "limits" (dict "memory" "512Mi") "requests" (dict "cpu" "200m" "memory" "256Mi") -}}
{{- $sidecar_res := dict "limits" (dict "memory" "256Mi") "requests" (dict "cpu" "200m" "memory" "256Mi") -}}

{{- $_ := set . "master_res" $master_res -}}
{{- $_ = set . "data_res" $data_res -}}
{{- $_ = set . "ingest_res" $ingest_res -}}
{{- $_ = set . "res" $res -}}
{{- $_ = set . "init_res" $init_res -}}
{{- $_ = set . "sidecar_res" $sidecar_res -}}

{{- $profiles | toJson -}}
{{- end -}}