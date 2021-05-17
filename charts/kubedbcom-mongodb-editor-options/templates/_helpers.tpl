{{/*
Expand the name of the chart.
*/}}
{{- define "kubedbcom-mongodb-editor-options.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "kubedbcom-mongodb-editor-options.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "kubedbcom-mongodb-editor-options.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "kubedbcom-mongodb-editor-options.labels" -}}
{{ include "kubedbcom-mongodb-editor-options.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- range $k, $v := .Values.spec.labels }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "kubedbcom-mongodb-editor-options.selectorLabels" -}}
app.kubernetes.io/name: mongodbs.kubedb.com
app.kubernetes.io/instance: {{ include "kubedbcom-mongodb-editor-options.fullname" . }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "kubedbcom-mongodb-editor-options.serviceAccountName" -}}
{{- if .Values.spec.serviceAccount.create }}
{{- default (include "kubedbcom-mongodb-editor-options.fullname" .) .Values.spec.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.spec.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Common annotations
*/}}
{{- define "kubedbcom-mongodb-editor-options.annotations" -}}
{{- range $k, $v := .Values.spec.annotations }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}
