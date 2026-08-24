{{/*
Expand the name of the chart.
*/}}
{{- define "monitoringk8sappscodecom-telemetrystack-editor-options.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "monitoringk8sappscodecom-telemetrystack-editor-options.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "monitoringk8sappscodecom-telemetrystack-editor-options.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "monitoringk8sappscodecom-telemetrystack-editor-options.labels" -}}
{{ include "monitoringk8sappscodecom-telemetrystack-editor-options.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "monitoringk8sappscodecom-telemetrystack-editor-options.selectorLabels" -}}
app.kubernetes.io/name: telemetrystacks.monitoring.k8s.appscode.com
app.kubernetes.io/instance: {{ include "monitoringk8sappscodecom-telemetrystack-editor-options.fullname" . }}
{{- end }}

{{/*
Render a ClickHouse pillar (logs/traces) as the CRD's expected `clickhouse` object.
Call with a dict: {"root": $, "pillar": .Values.spec.logs}
*/}}
{{- define "monitoringk8sappscodecom-telemetrystack-editor-options.clickhouse" -}}
{{- $root := .root -}}
{{- $pillar := .pillar -}}
enabled: {{ $pillar.enabled }}
{{- if $pillar.enabled }}
deploymentMode: {{ $pillar.deploymentMode }}
version: {{ $pillar.version | quote }}
deletionPolicy: {{ $pillar.deletionPolicy }}
storage:
  storageClassName: {{ $pillar.storage.storageClassName | quote }}
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: {{ $pillar.storage.size }}
{{- if $pillar.clientCaCertificates }}
tls:
  clientCaCertificateRefs:
    {{- toYaml $pillar.clientCaCertificates | nindent 4 }}
{{- end }}
{{- if $pillar.s3.bucket }}
s3:
  {{- toYaml $pillar.s3 | nindent 2 }}
{{- end }}
{{- if eq $pillar.deploymentMode "ClusterTopology" }}
clusterTopology:
  cluster:
    name: {{ $pillar.clusterTopology.cluster.name }}
    replicas: {{ $pillar.clusterTopology.cluster.replicas }}
    shards: {{ $pillar.clusterTopology.cluster.shards }}
    storage:
      storageClassName: {{ $pillar.clusterTopology.cluster.persistence.storageClassName | quote }}
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: {{ $pillar.clusterTopology.cluster.persistence.size }}
  clickHouseKeeper:
    externallyManaged: {{ $pillar.clusterTopology.clickHouseKeeper.externallyManaged }}
    replicas: {{ $pillar.clusterTopology.clickHouseKeeper.replicas }}
    storage:
      storageClassName: {{ $pillar.clusterTopology.clickHouseKeeper.persistence.storageClassName | quote }}
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: {{ $pillar.clusterTopology.clickHouseKeeper.persistence.size }}
{{- end }}
{{- end }}
{{- end }}
