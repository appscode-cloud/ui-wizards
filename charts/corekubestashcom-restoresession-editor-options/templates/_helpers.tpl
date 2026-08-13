{{/*
Expand the name of the chart.
*/}}
{{- define "corekubestashcom-restoresession-editor-options.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "corekubestashcom-restoresession-editor-options.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "corekubestashcom-restoresession-editor-options.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "corekubestashcom-restoresession-editor-options.labels" -}}
{{ include "corekubestashcom-restoresession-editor-options.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- range $k, $v := .Values.spec.labels }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "corekubestashcom-restoresession-editor-options.selectorLabels" -}}
app.kubernetes.io/name: restoresessions.core.kubestash.com
app.kubernetes.io/instance: {{ include "corekubestashcom-restoresession-editor-options.fullname" . }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "corekubestashcom-restoresession-editor-options.serviceAccountName" -}}
{{- if .Values.spec.serviceAccount.create }}
{{- default (include "corekubestashcom-restoresession-editor-options.fullname" .) .Values.spec.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.spec.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Restore job runAsUser. Defaults mirror container.securityContext of each
kubedbcom-<db>-editor-options chart; the OpenShift uid-range value wins when set.
*/}}
{{- define "corekubestashcom-restoresession-editor-options.runAsUser" -}}
{{- $defaults := dict
  "Cassandra" 999
  "ClickHouse" 101
  "DB2" 54321
  "DocumentDB" 999
  "Druid" 1000
  "Elasticsearch" 1000
  "HanaDB" 54321
  "Hazelcast" 65534
  "Ignite" 70
  "Kafka" 1001
  "MariaDB" 999
  "Memcached" 999
  "Milvus" 54321
  "MongoDB" 999
  "MSSQLServer" 10001
  "MySQL" 999
  "Neo4j" 7474
  "Oracle" 54321
  "PerconaXtraDB" 1001
  "PgBouncer" 70
  "Pgpool" 70
  "Postgres" 999
  "ProxySQL" 999
  "Qdrant" 1000
  "Redis" 999
  "Singlestore" 999
  "Solr" 8983
  "Weaviate" 54321
  "ZooKeeper" 1000
-}}
{{- $override := "" -}}
{{- if .Values.spec.addon.jobTemplate -}}
{{- $override = .Values.spec.addon.jobTemplate.securityContext -}}
{{- end -}}
{{- $kind := "" -}}
{{- if .Values.spec.target -}}
{{- $kind = .Values.spec.target.kind | default "" -}}
{{- end -}}
{{- $override | default (dig $kind "" $defaults) -}}
{{- end }}

{{/*
Common annotations
*/}}
{{- define "corekubestashcom-restoresession-editor-options.annotations" -}}
{{- range $k, $v := .Values.spec.annotations }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}
