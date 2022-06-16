/*
Copyright AppsCode Inc. and Contributors

Licensed under the PolyForm Noncommercial License 1.0.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://github.com/appscode/licenses/raw/1.0.0/PolyForm-Noncommercial-1.0.0.md

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha1

import core "k8s.io/api/core/v1"

// +kubebuilder:validation:Enum=db.t.micro;db.t.small;db.t.medium;db.t.large;db.t.xlarge;db.t.2xlarge;db.m.small;db.m.large;db.m.xlarge;db.m.2xlarge;db.m.4xlarge;db.m.8xlarge;db.m.12xlarge;db.m.16xlarge;db.m.24xlarge;db.r.large;db.r.xlarge;db.r.2xlarge;db.r.4xlarge;db.r.8xlarge;db.r.12xlarge;db.r.16xlarge;db.r.24xlarge
type MachineType string

// +kubebuilder:validation:Enum=Halt;Delete;WipeOut;DoNotTerminate
type TerminationPolicy string

type Persistence struct {
	Size string `json:"size"`
}

type StorageClass struct {
	Name string `json:"name"`
}

type AuthSecret struct {
	// +optional
	Name string `json:"name"`
	// +optional
	// +kubebuilder:validation:Format:=password
	Password string `json:"password"`
}

// *** Monitoring *** //

// +kubebuilder:validation:Enum=prometheus.io;prometheus.io/operator;prometheus.io/builtin
type MonitoringAgent string

type Monitoring struct {
	Agent          MonitoringAgent       `json:"agent"`
	Exporter       PrometheusExporter    `json:"exporter"`
	ServiceMonitor *ServiceMonitorLabels `json:"serviceMonitor"`
}

type PrometheusExporter struct {
	// Compute Resources required by the sidecar container.
	// +optional
	Resources core.ResourceRequirements `json:"resources"`
}

type ServiceMonitorLabels struct {
	// +optional
	Labels map[string]string `json:"labels"`
}

// *** Monitoring *** //

// *** Alerts *** //

type FixedAlert struct {
	Enabled  bool   `json:"enabled"`
	Duration string `json:"duration"`
	Severity string `json:"severity"`
}

type StringValAlert struct {
	Enabled  bool   `json:"enabled"`
	Duration string `json:"duration"`
	Val      string `json:"val"`
	Severity string `json:"severity"`
}

type IntValAlert struct {
	Enabled  bool   `json:"enabled"`
	Duration string `json:"duration"`
	Val      int    `json:"val"`
	Severity string `json:"severity"`
}

type FloatValAlertConfig struct {
	Enabled  bool    `json:"enabled"`
	Duration string  `json:"duration"`
	Val      float64 `json:"val"`
	Severity string  `json:"severity"`
}

type ProvisionerAlert struct {
	Enabled bool                  `json:"enabled"`
	Rules   ProvisionerAlertRules `json:"rules"`
}

type ProvisionerAlertRules struct {
	AppPhaseNotReady FixedAlert `json:"appPhaseNotReady"`
	AppPhaseCritical FixedAlert `json:"appPhaseCritical"`
}

type OpsManagerAlert struct {
	Enabled bool                 `json:"enabled"`
	Rules   OpsManagerAlertRules `json:"rules"`
}

type OpsManagerAlertRules struct {
	OpsRequestOnProgress              FixedAlert `json:"opsRequestOnProgress"`
	OpsRequestStatusProgressingToLong FixedAlert `json:"opsRequestStatusProgressingToLong"`
	OpsRequestFailed                  FixedAlert `json:"opsRequestFailed"`
}

type StashAlert struct {
	Enabled bool            `json:"enabled"`
	Rules   StashAlertRules `json:"rules"`
}

type StashAlertRules struct {
	BackupSessionFailed         FixedAlert  `json:"backupSessionFailed"`
	RestoreSessionFailed        FixedAlert  `json:"restoreSessionFailed"`
	NoBackupSessionForTooLong   IntValAlert `json:"noBackupSessionForTooLong"`
	RepositoryCorrupted         FixedAlert  `json:"repositoryCorrupted"`
	RepositoryStorageRunningLow IntValAlert `json:"repositoryStorageRunningLow"`
	BackupSessionPeriodTooLong  IntValAlert `json:"backupSessionPeriodTooLong"`
	RestoreSessionPeriodTooLong IntValAlert `json:"restoreSessionPeriodTooLong"`
}

type SchemaManagerAlert struct {
	Enabled bool                    `json:"enabled"`
	Rules   SchemaManagerAlertRules `json:"rules"`
}

type SchemaManagerAlertRules struct {
	SchemaPendingForTooLong     FixedAlert `json:"schemaPendingForTooLong"`
	SchemaInProgressForTooLong  FixedAlert `json:"schemaInProgressForTooLong"`
	SchemaTerminatingForTooLong FixedAlert `json:"schemaTerminatingForTooLong"`
	SchemaFailed                FixedAlert `json:"schemaFailed"`
	SchemaExpired               FixedAlert `json:"schemaExpired"`
}

// *** Alerts *** //
