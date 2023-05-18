/*
Copyright AppsCode Inc. and Contributors

Licensed under the AppsCode Community License 1.0.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://github.com/appscode/licenses/raw/1.0.0/AppsCode-Community-1.0.0.md

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha1

// +kubebuilder:validation:Enum=none;critical;warning;info
type SeverityFlag string

const (
	SeverityFlagNone     SeverityFlag = "none"     // 0
	SeverityFlagCritical SeverityFlag = "critical" // 1
	SeverityFlagWarning  SeverityFlag = "warning"  // 2
	SeverityFlagInfo     SeverityFlag = "info"     // 3
)

// +kubebuilder:validation:Enum=critical;warning;info
type Severity string

const (
	SeverityCritical Severity = "critical"
	SeverityWarning  Severity = "warning"
	SeverityInfo     Severity = "info"
)

type FixedAlert struct {
	Enabled  bool     `json:"enabled"`
	Duration string   `json:"duration"`
	Severity Severity `json:"severity"`
}

type StringValAlert struct {
	Enabled  bool     `json:"enabled"`
	Duration string   `json:"duration"`
	Val      string   `json:"val"`
	Severity Severity `json:"severity"`
}

type IntValAlert struct {
	Enabled  bool     `json:"enabled"`
	Duration string   `json:"duration"`
	Val      int      `json:"val"`
	Severity Severity `json:"severity"`
}

type FloatValAlertConfig struct {
	Enabled  bool     `json:"enabled"`
	Duration string   `json:"duration"`
	Val      float64  `json:"val"`
	Severity Severity `json:"severity"`
}

type ProvisionerAlert struct {
	Enabled SeverityFlag          `json:"enabled"`
	Rules   ProvisionerAlertRules `json:"rules"`
}

type ProvisionerAlertRules struct {
	AppPhaseNotReady FixedAlert `json:"appPhaseNotReady"`
	AppPhaseCritical FixedAlert `json:"appPhaseCritical"`
}

type OpsManagerAlert struct {
	Enabled SeverityFlag         `json:"enabled"`
	Rules   OpsManagerAlertRules `json:"rules"`
}

type OpsManagerAlertRules struct {
	OpsRequestOnProgress              FixedAlert `json:"opsRequestOnProgress"`
	OpsRequestStatusProgressingToLong FixedAlert `json:"opsRequestStatusProgressingToLong"`
	OpsRequestFailed                  FixedAlert `json:"opsRequestFailed"`
}

type StashAlert struct {
	Enabled SeverityFlag    `json:"enabled"`
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
	Enabled SeverityFlag            `json:"enabled"`
	Rules   SchemaManagerAlertRules `json:"rules"`
}

type SchemaManagerAlertRules struct {
	SchemaPendingForTooLong     FixedAlert `json:"schemaPendingForTooLong"`
	SchemaInProgressForTooLong  FixedAlert `json:"schemaInProgressForTooLong"`
	SchemaTerminatingForTooLong FixedAlert `json:"schemaTerminatingForTooLong"`
	SchemaFailed                FixedAlert `json:"schemaFailed"`
	SchemaExpired               FixedAlert `json:"schemaExpired"`
}
