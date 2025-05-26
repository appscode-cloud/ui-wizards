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

{{/*
Alert labels
*/}}
{{- define "kubedbcom-mongodb-editor-options.alertLabels" -}}
k8s_group: {{ .Values.metadata.resource.group }}
k8s_kind: {{ .Values.metadata.resource.kind }}
k8s_resource: {{ .Values.metadata.resource.name }}
app: {{ include "kubedbcom-mongodb-editor-options.fullname" . }}
app_namespace: {{ .Release.Namespace }}
{{- if .Values.form.alert.additionalRuleLabels }}
{{ toYaml .Values.form.alert.additionalRuleLabels }}
{{- end }}
{{- end }}

{{/*
Alerts Enabled
*/}}
{{- define "kubedbcom-mongodb-editor-options.alertsEnabled" -}}
{{- $ranks := dict "critical" 1 "warning" 2 "info" 3 -}}
{{- $result := dig . 0 $ranks -}}
{{- if $result -}}{{ . }}{{- end -}}
{{- end }}

{{/*
Alert Group Enabled
*/}}
{{- define "kubedbcom-mongodb-editor-options.alertGroupEnabled" -}}
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
{{- define "kubedbcom-mongodb-editor-options.alertEnabled" -}}
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
{{- $version := .Values.spec.admin.databases.MongoDB.versions.default }}
allowPrivilegeEscalation: false
capabilities:
  drop:
  - ALL
runAsGroup: 0
{{- if hasPrefix "percona-" $version }}
runAsUser: 1001
{{- else }}
runAsUser: {{ $.Values.spec.openshift.securityContext.runAsUser | default 999 }}
{{- end }}
runAsNonRoot: true
seccompProfile:
  type: RuntimeDefault
{{- end }}


{{- define "container.fsGroup" -}}
{{- if hasPrefix "percona-" .Values.spec.admin.databases.MongoDB.versions.default }}
fsGroup: {{ .Values.spec.openshift.securityContext.runAsUser | default 1001 }}
{{- else }}
fsGroup: {{ .Values.spec.openshift.securityContext.runAsUser | default 999 }}
{{- end }}
{{- end }}






{{- define "resource-profiles" -}}
{{- $machines := .Files.Get "data/machines.yaml" | fromYaml -}}
{{- $profiles := dict -}}

{{- $res := dict -}}
{{- $shard_res := dict -}}
{{- $configServer_res := dict -}}
{{- $mongos_res := dict -}}
{{- $arbiter_res := dict -}}
{{- $hidden_res := dict -}}

{{- if eq .Values.spec.mode "Sharded" }}

  {{- $shard_res = .Values.spec.shardTopology.shard.podResources.resources -}}

  {{- if and .Values.spec.shardTopology.shard.podResources.machine (hasKey $machines .Values.spec.shardTopology.shard.podResources.machine) }}
    {{- $shard_res = get (get $machines .Values.spec.shardTopology.shard.podResources.machine) "resources" }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.shardTopology.shard.podResources.machine (eq .id $.Values.spec.shardTopology.shard.podResources.machine) }}
      {{- $shard_res = dict "requests" .limits "limits" .limits }}
      {{- $_ := set $profiles "shard" .id }}
    {{- end }}
  {{- end }}

  {{- $configServer_res = .Values.spec.shardTopology.configServer.podResources.resources -}}

  {{- if and .Values.spec.shardTopology.configServer.podResources.machine (hasKey $machines .Values.spec.shardTopology.configServer.podResources.machine) }}
    {{- $configServer_res = get (get $machines .Values.spec.shardTopology.configServer.podResources.machine) "resources" }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.shardTopology.configServer.podResources.machine (eq .id $.Values.spec.shardTopology.configServer.podResources.machine) }}
      {{- $configServer_res = dict "requests" .limits "limits" .limits }}
      {{- $_ := set $profiles "configServer" .id }}
    {{- end }}
  {{- end }}

  {{- $mongos_res = .Values.spec.shardTopology.mongos.podResources.resources -}}

  {{- if and .Values.spec.shardTopology.mongos.podResources.machine (hasKey $machines .Values.spec.shardTopology.mongos.podResources.machine) }}
    {{- $mongos_res = get (get $machines .Values.spec.shardTopology.mongos.podResources.machine) "resources" }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.shardTopology.mongos.podResources.machine (eq .id $.Values.spec.shardTopology.mongos.podResources.machine) }}
      {{- $mongos_res = dict "requests" .limits "limits" .limits }}
      {{- $_ := set $profiles "mongos" .id }}
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
      {{- if eq $.Values.spec.mode "Replicaset" }}
        {{- $_ := set $profiles "replicaSet" .id }}
      {{- end }}
      {{- if eq $.Values.spec.mode "Standalone" }}
        {{- $_ := set $profiles "standalone" .id }}
      {{- end }}
    {{- end }}
  {{- end }}

{{- end }}

{{- if .Values.spec.arbiter.enabled }}
  {{- $arbiter_res = .Values.spec.arbiter.podResources.resources -}}

  {{- if and .Values.spec.arbiter.podResources.machine (hasKey $machines .Values.spec.arbiter.podResources.machine) }}
    {{- $arbiter_res = get (get $machines .Values.spec.arbiter.podResources.machine) "resources" }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.arbiter.podResources.machine (eq .id $.Values.spec.arbiter.podResources.machine) }}
      {{- $arbiter_res = dict "requests" .limits "limits" .limits }}
      {{- $_ := set $profiles "arbiter" .id }}
    {{- end }}
  {{- end }}
{{- end }}

{{- if .Values.spec.hidden.enabled }}
  {{- $hidden_res = .Values.spec.hidden.podResources.resources -}}

  {{- if and .Values.spec.hidden.podResources.machine (hasKey $machines .Values.spec.hidden.podResources.machine) }}
    {{- $hidden_res = get (get $machines .Values.spec.hidden.podResources.machine) "resources" }}
    {{- $_ := set $profiles "hidden" .id }}
  {{- end }}

  {{- range .Values.spec.admin.machineProfiles.machines }}
    {{- if and $.Values.spec.hidden.podResources.machine (eq .id $.Values.spec.hidden.podResources.machine) }}
      {{- $hidden_res = dict "requests" .limits "limits" .limits }}
    {{- end }}
  {{- end }}
{{- end }}

{{- $init_res := dict "limits" (dict "memory" "512Mi") "requests" (dict "cpu" "200m" "memory" "256Mi") -}}
{{- $sidecar_res := dict "limits" (dict "memory" "256Mi") "requests" (dict "cpu" "200m" "memory" "256Mi") -}}

{{- $_ := set . "shard_res" $shard_res -}}
{{- $_ = set . "configServer_res" $configServer_res -}}
{{- $_ = set . "mongos_res" $mongos_res -}}
{{- $_ = set . "res" $res -}}
{{- $_ = set . "arbiter_res" $arbiter_res -}}
{{- $_ = set . "hidden_res" $hidden_res -}}
{{- $_ = set . "init_res" $init_res -}}
{{- $_ = set . "sidecar_res" $sidecar_res -}}

{{- $profiles | toJson -}}
{{- end -}}
