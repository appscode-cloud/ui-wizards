{{/*
Expand the name of the chart.
*/}}
{{- define "kubevaultcom-vaultserver-editor-options.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "kubevaultcom-vaultserver-editor-options.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "kubevaultcom-vaultserver-editor-options.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "kubevaultcom-vaultserver-editor-options.labels" -}}
{{ include "kubevaultcom-vaultserver-editor-options.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- range $k, $v := .Values.spec.labels }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "kubevaultcom-vaultserver-editor-options.selectorLabels" -}}
app.kubernetes.io/name: vaultservers.kubevault.com
app.kubernetes.io/instance: {{ include "kubevaultcom-vaultserver-editor-options.fullname" . }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "kubevaultcom-vaultserver-editor-options.serviceAccountName" -}}
{{- if .Values.spec.serviceAccount.create }}
{{- default (include "kubevaultcom-vaultserver-editor-options.fullname" .) .Values.spec.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.spec.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Common annotations
*/}}
{{- define "kubevaultcom-vaultserver-editor-options.annotations" -}}
{{- range $k, $v := .Values.spec.annotations }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Alert labels
*/}}
{{- define "kubevaultcom-vaultserver-editor-options.alertLabels" -}}
k8s-group: {{ .Values.metadata.resource.group }}
k8s-kind: {{ .Values.metadata.resource.kind }}
k8s-resource: {{ .Values.metadata.resource.name }}
k8s-name: {{ include "kubevaultcom-vaultserver-editor-options.fullname" . }}
k8s-namespace: {{ .Release.Namespace }}
{{- if .Values.spec.alert.additionalRuleLabels }}
{{- toYaml .Values.spec.alert.additionalRuleLabels }}
{{- end }}
{{- end }}
