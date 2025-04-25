{{/*
Expand the name of the chart.
*/}}
{{- define "kubedbcom-druid-editor-options.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "kubedbcom-druid-editor-options.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "kubedbcom-druid-editor-options.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "kubedbcom-druid-editor-options.labels" -}}
{{ include "kubedbcom-druid-editor-options.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- range $k, $v := .Values.spec.labels }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "kubedbcom-druid-editor-options.selectorLabels" -}}
app.kubernetes.io/name: druids.kubedb.com
app.kubernetes.io/instance: {{ include "kubedbcom-druid-editor-options.fullname" . }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "kubedbcom-druid-editor-options.serviceAccountName" -}}
{{- if .Values.spec.serviceAccount.create }}
{{- default (include "kubedbcom-druid-editor-options.fullname" .) .Values.spec.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.spec.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Common annotations
*/}}
{{- define "kubedbcom-druid-editor-options.annotations" -}}
{{- range $k, $v := .Values.spec.annotations }}
{{ $k }}: "{{ $v }}"
{{- end -}}
{{- end }}

{{/*
Alert labels
*/}}
{{- define "kubedbcom-druid-editor-options.alertLabels" -}}
k8s_group: {{ .Values.metadata.resource.group }}
k8s_kind: {{ .Values.metadata.resource.kind }}
k8s_resource: {{ .Values.metadata.resource.name }}
app: {{ include "kubedbcom-druid-editor-options.fullname" . }}
app_namespace: {{ .Release.Namespace }}
{{- if .Values.form.alert.additionalRuleLabels }}
{{ toYaml .Values.form.alert.additionalRuleLabels }}
{{- end }}
{{- end }}

{{/*
Alerts Enabled
*/}}
{{- define "kubedbcom-druid-editor-options.alertsEnabled" -}}
{{- $ranks := dict "critical" 1 "warning" 2 "info" 3 -}}
{{- $result := dig . 0 $ranks -}}
{{- if $result -}}{{ . }}{{- end -}}
{{- end }}

{{/*
Alert Group Enabled
*/}}
{{- define "kubedbcom-druid-editor-options.alertGroupEnabled" -}}
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
{{- define "kubedbcom-druid-editor-options.alertEnabled" -}}
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

{{- $coordinators_res := dict -}}
{{- $overlords_res := dict -}}
{{- $middleManagers_res := dict -}}
{{- $historicals_res := dict -}}
{{- $brokers_res := dict -}}
{{- $routers_res := dict -}}

{{- $coordinators_res = .Values.spec.topology.coordinators.podResources.resources -}}
{{- if and .Values.spec.topology.coordinators.podResources.machine (hasKey $machines .Values.spec.topology.coordinators.podResources.machine) }}
  {{- $coordinators_res = get (get $machines .Values.spec.topology.coordinators.podResources.machine) "resources" }}
{{- end }}
{{- range .Values.spec.admin.machineProfiles.machines }}
  {{- if and $.Values.spec.topology.coordinators.podResources.machine (eq .id $.Values.spec.topology.coordinators.podResources.machine) }}
    {{- $coordinators_res  = dict "requests" .limits "limits" .limits }}
    {{- $_ := set $profiles "coordinators" .id }}
  {{- end }}
{{- end }}

{{- $overlords_res = .Values.spec.topology.overlords.podResources.resources -}}
{{- if and .Values.spec.topology.overlords.podResources.machine (hasKey $machines .Values.spec.topology.overlords.podResources.machine) }}
  {{- $overlords_res = get (get $machines .Values.spec.topology.overlords.podResources.machine) "resources" }}
{{- end }}
{{- range .Values.spec.admin.machineProfiles.machines }}
  {{- if and $.Values.spec.topology.overlords.podResources.machine (eq .id $.Values.spec.topology.overlords.podResources.machine) }}
    {{- $overlords_res  = dict "requests" .limits "limits" .limits }}
    {{- $_ := set $profiles "overlords" .id }}
  {{- end }}
{{- end }}

{{- $middleManagers_res = .Values.spec.topology.middleManagers.podResources.resources -}}
{{- if and .Values.spec.topology.middleManagers.podResources.machine (hasKey $machines .Values.spec.topology.middleManagers.podResources.machine) }}
  {{- $middleManagers_res = get (get $machines .Values.spec.topology.middleManagers.podResources.machine) "resources" }}
{{- end }}
{{- range .Values.spec.admin.machineProfiles.machines }}
  {{- if and $.Values.spec.topology.middleManagers.podResources.machine (eq .id $.Values.spec.topology.middleManagers.podResources.machine) }}
    {{- $middleManagers_res  = dict "requests" .limits "limits" .limits }}
    {{- $_ := set $profiles "middleManagers" .id }}
  {{- end }}
{{- end }}

{{- $historicals_res = .Values.spec.topology.historicals.podResources.resources -}}
{{- if and .Values.spec.topology.historicals.podResources.machine (hasKey $machines .Values.spec.topology.historicals.podResources.machine) }}
  {{- $historicals_res = get (get $machines .Values.spec.topology.historicals.podResources.machine) "resources" }}
{{- end }}
{{- range .Values.spec.admin.machineProfiles.machines }}
  {{- if and $.Values.spec.topology.historicals.podResources.machine (eq .id $.Values.spec.topology.historicals.podResources.machine) }}
    {{- $historicals_res  = dict "requests" .limits "limits" .limits }}
    {{- $_ := set $profiles "historicals" .id }}
  {{- end }}
{{- end }}

{{- $brokers_res = .Values.spec.topology.brokers.podResources.resources -}}
{{- if and .Values.spec.topology.brokers.podResources.machine (hasKey $machines .Values.spec.topology.brokers.podResources.machine) }}
  {{- $brokers_res = get (get $machines .Values.spec.topology.brokers.podResources.machine) "resources" }}
{{- end }}
{{- range .Values.spec.admin.machineProfiles.machines }}
  {{- if and $.Values.spec.topology.brokers.podResources.machine (eq .id $.Values.spec.topology.brokers.podResources.machine) }}
    {{- $brokers_res  = dict "requests" .limits "limits" .limits }}
    {{- $_ := set $profiles "brokers" .id }}
  {{- end }}
{{- end }}

{{- $routers_res = .Values.spec.topology.routers.podResources.resources -}}
{{- if and .Values.spec.topology.routers.podResources.machine (hasKey $machines .Values.spec.topology.routers.podResources.machine) }}
  {{- $routers_res = get (get $machines .Values.spec.topology.routers.podResources.machine) "resources" }}
{{- end }}
{{- range .Values.spec.admin.machineProfiles.machines }}
  {{- if and $.Values.spec.topology.routers.podResources.machine (eq .id $.Values.spec.topology.routers.podResources.machine) }}
    {{- $routers_res  = dict "requests" .limits "limits" .limits }}
    {{- $_ := set $profiles "routers" .id }}
  {{- end }}
{{- end }}


{{- $init_res := dict "limits" (dict "memory" "512Mi") "requests" (dict "cpu" "200m" "memory" "256Mi") -}}
{{- $sidecar_res := dict "limits" (dict "memory" "256Mi") "requests" (dict "cpu" "200m" "memory" "256Mi") -}}

{{- $_ := set . "coordinators_res" $coordinators_res -}}
{{- $_ := set . "overlords_res" $overlords_res -}}
{{- $_ := set . "middleManagers_res" $middleManagers_res -}}
{{- $_ := set . "historicals_res" $historicals_res -}}
{{- $_ := set . "brokers_res" $brokers_res -}}
{{- $_ := set . "routers_res" $routers_res -}}
{{- $_ = set . "init_res" $init_res -}}
{{- $_ = set . "sidecar_res" $sidecar_res -}}

{{- $profiles | toJson -}}
{{- end -}}