{{/*
Expand the name of the chart.
*/}}
{{- define "kubedbcom-milvus-editor-options.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "kubedbcom-milvus-editor-options.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "kubedbcom-milvus-editor-options.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "kubedbcom-milvus-editor-options.labels" -}}
{{ include "kubedbcom-milvus-editor-options.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- range $k, $v := .Values.spec.labels }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "kubedbcom-milvus-editor-options.selectorLabels" -}}
app.kubernetes.io/name: milvuss.kubedb.com
app.kubernetes.io/instance: {{ include "kubedbcom-milvus-editor-options.fullname" . }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "kubedbcom-milvus-editor-options.serviceAccountName" -}}
{{- if .Values.spec.serviceAccount.create }}
{{- default (include "kubedbcom-milvus-editor-options.fullname" .) .Values.spec.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.spec.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Common annotations
*/}}
{{- define "kubedbcom-milvus-editor-options.annotations" -}}
{{- range $k, $v := .Values.spec.annotations }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Alert labels
*/}}
{{- define "kubedbcom-milvus-editor-options.alertLabels" -}}
k8s_group: {{ .Values.metadata.resource.group }}
k8s_kind: {{ .Values.metadata.resource.kind }}
k8s_resource: {{ .Values.metadata.resource.name }}
app: {{ include "kubedbcom-milvus-editor-options.fullname" . }}
app_namespace: {{ .Release.Namespace }}
{{- if .Values.form.alert.additionalRuleLabels }}
{{ toYaml .Values.form.alert.additionalRuleLabels }}
{{- end }}
{{- end }}

{{/*
Alerts Enabled
*/}}
{{- define "kubedbcom-milvus-editor-options.alertsEnabled" -}}
{{- $ranks := dict "critical" 1 "warning" 2 "info" 3 -}}
{{- $result := dig . 0 $ranks -}}
{{- if $result -}}{{ . }}{{- end -}}
{{- end }}

{{/*
Alert Group Enabled
*/}}
{{- define "kubedbcom-milvus-editor-options.alertGroupEnabled" -}}
{{- $ranks := dict "critical" 1 "warning" 2 "info" 3 -}}
{{- $flags := (mustLast .) -}}
{{- $group := dig (mustFirst .) 0 $ranks -}}
{{- $group = min $group (dig $flags.enabled 0 $ranks) -}}
{{- $hasRules := false -}}
{{- range $k, $v := $flags.rules -}}
{{- $sev := dig $v.severity 0 $ranks -}}
{{- if (and $sev (le $sev $group) $v.enabled) -}}{{ $hasRules = true }}{{- end -}}
{{- end }}
{{- if (and $group $hasRules) -}}{{ $flags.enabled }}{{- end -}}
{{- end }}

{{/*
Alert Enabled
*/}}
{{- define "kubedbcom-milvus-editor-options.alertEnabled" -}}
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
runAsUser: {{ $.Values.spec.openshift.securityContext.runAsUser | default 54321 }}
seccompProfile:
  type: RuntimeDefault
{{- end }}

{{- define "resource-profiles" -}}
{{- $machines := .Files.Get "data/machines.yaml" | fromYaml -}}
{{- $profiles := dict -}}
{{- $res := dict -}}
{{- $res = .Values.spec.podResources.resources -}}
{{- if and .Values.spec.podResources.machine (hasKey $machines .Values.spec.podResources.machine) }}
  {{- $res = get (get $machines .Values.spec.podResources.machine) "resources" }}
{{- end }}
{{- range .Values.spec.admin.machineProfiles.machines }}
  {{- if and $.Values.spec.podResources.machine (eq .id $.Values.spec.podResources.machine) }}
    {{- $res  = dict "requests" .limits "limits" .limits }}
    {{- $_ := set $profiles (lower $.Values.spec.mode) .id -}}
  {{- end }}
{{- end }}

{{/* Distributed mode resources */}}
{{- $mixcoord_res := dict -}}
{{- $proxy_res := dict -}}
{{- $streamingnode_res := dict -}}
{{- $datanode_res := dict -}}
{{- $querynode_res := dict -}}

{{- if .Values.spec.distributed }}
  {{- if .Values.spec.distributed.mixcoord }}
    {{- $mixcoord_res = .Values.spec.distributed.mixcoord.podResources.resources -}}
    {{- if and .Values.spec.distributed.mixcoord.podResources.machine (hasKey $machines .Values.spec.distributed.mixcoord.podResources.machine) }}
      {{- $mixcoord_res = get (get $machines .Values.spec.distributed.mixcoord.podResources.machine) "resources" }}
    {{- end }}
  {{- end }}
  {{- if .Values.spec.distributed.proxy }}
    {{- $proxy_res = .Values.spec.distributed.proxy.podResources.resources -}}
    {{- if and .Values.spec.distributed.proxy.podResources.machine (hasKey $machines .Values.spec.distributed.proxy.podResources.machine) }}
      {{- $proxy_res = get (get $machines .Values.spec.distributed.proxy.podResources.machine) "resources" }}
    {{- end }}
  {{- end }}
  {{- if .Values.spec.distributed.streamingnode }}
    {{- $streamingnode_res = .Values.spec.distributed.streamingnode.podResources.resources -}}
    {{- if and .Values.spec.distributed.streamingnode.podResources.machine (hasKey $machines .Values.spec.distributed.streamingnode.podResources.machine) }}
      {{- $streamingnode_res = get (get $machines .Values.spec.distributed.streamingnode.podResources.machine) "resources" }}
    {{- end }}
  {{- end }}
  {{- if .Values.spec.distributed.datanode }}
    {{- $datanode_res = .Values.spec.distributed.datanode.podResources.resources -}}
    {{- if and .Values.spec.distributed.datanode.podResources.machine (hasKey $machines .Values.spec.distributed.datanode.podResources.machine) }}
      {{- $datanode_res = get (get $machines .Values.spec.distributed.datanode.podResources.machine) "resources" }}
    {{- end }}
  {{- end }}
  {{- if .Values.spec.distributed.querynode }}
    {{- $querynode_res = .Values.spec.distributed.querynode.podResources.resources -}}
    {{- if and .Values.spec.distributed.querynode.podResources.machine (hasKey $machines .Values.spec.distributed.querynode.podResources.machine) }}
      {{- $querynode_res = get (get $machines .Values.spec.distributed.querynode.podResources.machine) "resources" }}
    {{- end }}
  {{- end }}
{{- end }}

{{- $init_res := dict "limits" (dict "memory" "512Mi") "requests" (dict "cpu" "200m" "memory" "256Mi") -}}
{{- $sidecar_res := dict "limits" (dict "memory" "256Mi") "requests" (dict "cpu" "200m" "memory" "256Mi") -}}

{{- $_ := set . "res" $res -}}
{{- $_ = set . "init_res" $init_res -}}
{{- $_ = set . "sidecar_res" $sidecar_res -}}
{{- $_ = set . "mixcoord_res" $mixcoord_res -}}
{{- $_ = set . "proxy_res" $proxy_res -}}
{{- $_ = set . "streamingnode_res" $streamingnode_res -}}
{{- $_ = set . "datanode_res" $datanode_res -}}
{{- $_ = set . "querynode_res" $querynode_res -}}

{{- $profiles | toJson -}}
{{- end -}}
