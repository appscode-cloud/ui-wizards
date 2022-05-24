{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "kubedbcom-mongodb-editor.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "kubedbcom-mongodb-editor.selectorLabels" -}}
app.kubernetes.io/name: mongodbs.kubedb.com
app.kubernetes.io/instance: {{ include "kubedbcom-mongodb-editor.fullname" . }}
{{- end }}

{{/*
Alert labels
*/}}
{{- define "kubedbcom-mongodb-editor.alertLabels" -}}
k8s_group: {{ .Values.metadata.resource.group }}
k8s_kind: {{ .Values.metadata.resource.kind }}
k8s_resource: {{ .Values.metadata.resource.name }}
app: {{ include "kubedbcom-mongodb-editor.fullname" . }}
app_namespace: {{ .Release.Namespace }}
{{- if .Values.form.alert.additionalRuleLabels }}
{{ toYaml .Values.form.alert.additionalRuleLabels }}
{{- end }}
{{- end }}
