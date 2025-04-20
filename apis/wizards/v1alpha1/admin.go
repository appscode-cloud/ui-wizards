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

import (
	core "k8s.io/api/core/v1"
	mona "kmodules.xyz/monitoring-agent-api/api/v1"
	kubestashapi "kubestash.dev/apimachinery/apis"
)

// +kubebuilder:validation:Enum=Shared;Dedicated
type DeploymentMode string

const (
	DeploymentModeShared    DeploymentMode = "Shared"
	DeploymentModeDedicated DeploymentMode = "Dedicated"
)

// +kubebuilder:validation:Enum=GeneralPurpose;MemoryOptimized;CPUOptimized
type ClusterTierMode string

const (
	ClusterTierModeGeneralPurpose  ClusterTierMode = "GeneralPurpose"
	ClusterTierModeMemoryOptimized ClusterTierMode = "MemoryOptimized"
	ClusterTierModeCPUOptimized    ClusterTierMode = "CPUOptimized"
)

// +kubebuilder:validation:Enum=OnDemand;Spot
type CapacityMode string

const (
	CapacityModeOnDemand CapacityMode = "OnDemand"
	CapacityModeSpot     CapacityMode = "Spot"
)

type AdminOptions struct {
	Deployment  DeploymentProfile  `json:"deployment"`
	ClusterTier ClusterTierProfile `json:"clusterTier"`

	ShowPreview bool      `json:"showPreview"`
	LeftPanel   LeftPanel `json:"leftPanel"`

	// +optional
	NodeSelector map[string]string `json:"nodeSelector"`
	// +optional
	Tolerations []core.Toleration `json:"tolerations"`

	Databases      DatabaseProfiles             `json:"databases"`
	StorageClasses RequiredClusterScopedProfile `json:"storageClasses"`

	TLS            ToggleProfileOnBoolean `json:"tls"`
	ClusterIssuers ClusterScopedProfile   `json:"clusterIssuers"`
	Expose         ToggleProfileOnBoolean `json:"expose"`

	Monitoring Monitoring `json:"monitoring"`
	Alert      Alert      `json:"alert"`

	AuthCredential      AuthCredential `json:"authCredential"`
	CustomConfiguration bool           `json:"customConfiguration"`

	DeletionPolicy      ToggleProfileOnString  `json:"deletionPolicy"`
	Backup              BackupProfile          `json:"backup"`
	Archiver            ArchiverProfile        `json:"archiver"`
	PointInTimeRecovery ToggleProfileOnBoolean `json:"pointInTimeRecovery"`

	MachineProfiles MachineProfiles `json:"machineProfiles"`
}

// *** Machine-related starts *** //

type DeploymentProfile struct {
	Default DeploymentMode `json:"default"`
	Toggle  bool           `json:"toggle"`
}

type ClusterTierProfile struct {
	Default      ClusterTierMode      `json:"default"`
	Toggle       bool                 `json:"toggle"`
	NodeTopology ClusterScopedProfile `json:"nodeTopology"`
	Placement    ClusterScopedProfile `json:"placement"`
}

// *** Machine-related ends *** //

type DatabaseProfiles struct {
	ClickHouse    *DatabaseProfile `json:"ClickHouse,omitempty"`
	Druid         *DatabaseProfile `json:"Druid,omitempty"`
	Elasticsearch *DatabaseProfile `json:"Elasticsearch,omitempty"`
	FerretDB      *DatabaseProfile `json:"FerretDB,omitempty"`
	Kafka         *DatabaseProfile `json:"Kafka,omitempty"`
	MariaDB       *DatabaseProfile `json:"MariaDB,omitempty"`
	Memcached     *DatabaseProfile `json:"Memcached,omitempty"`
	MongoDB       *DatabaseProfile `json:"MongoDB,omitempty"`
	MSSQLServer   *DatabaseProfile `json:"MSSQLServer,omitempty"`
	MySQL         *DatabaseProfile `json:"MySQL,omitempty"`
	PerconaXtraDB *DatabaseProfile `json:"PerconaXtraDB,omitempty"`
	PgBouncer     *DatabaseProfile `json:"PgBouncer,omitempty"`
	Pgpool        *DatabaseProfile `json:"Pgpool,omitempty"`
	Postgres      *DatabaseProfile `json:"Postgres,omitempty"`
	ProxySQL      *DatabaseProfile `json:"ProxySQL,omitempty"`
	RabbitMQ      *DatabaseProfile `json:"RabbitMQ,omitempty"`
	Redis         *DatabaseProfile `json:"Redis,omitempty"`
	Singlestore   *DatabaseProfile `json:"Singlestore,omitempty"`
	Solr          *DatabaseProfile `json:"Solr,omitempty"`
	ZooKeeper     *DatabaseProfile `json:"ZooKeeper,omitempty"`
}

type DatabaseProfile struct {
	Versions RequiredClusterScopedProfile `json:"versions"`
	Mode     RequiredClusterScopedProfile `json:"mode"`
}

// *** Backup-related starts *** //

type BackupProfile struct {
	Enable ToggleProfileOnBoolean `json:"enable"`
	// +kubebuilder:default=BackupConfiguration
	By BackupBy `json:"by"`
	// +kubebuilder:default=Restic
	Via kubestashapi.Driver `json:"via"`
}

// +kubebuilder:validation:Enum=BackupConfiguration;BackupBlueprint
type BackupBy string

type ArchiverProfile struct {
	Enable ToggleProfileOnBoolean `json:"enable"`
	// +kubebuilder:default=Restic
	Via kubestashapi.Driver `json:"via"`
}

// *** Backup-related ends *** //

type MachineProfiles struct {
	Machines  []Machine `json:"machines"`
	Available []string  `json:"available"`
	Default   string    `json:"default"`
}

type Machine struct {
	Id     string            `json:"id"`
	Name   string            `json:"name,omitempty"`
	Limits core.ResourceList `json:"limits"`
}

type AuthCredential struct {
	Customize     bool `json:"customize"`
	ReferExisting bool `json:"referExisting"`
}

type LeftPanel struct {
	ShowInsights     bool `json:"showInsights"`
	ShowVaultInfo    bool `json:"showVaultInfo"`
	ShowOperations   bool `json:"showOperations"`
	ShowBackup       bool `json:"showBackup"`
	ShowBackupLegacy bool `json:"showBackupLegacy"`
	ShowSecurity     bool `json:"showSecurity"`
}

type ClusterScopedProfile struct {
	// +optional
	Available []string `json:"available"`
	// +optional
	Default string `json:"default"`
	Toggle  bool   `json:"toggle"`
}

type RequiredClusterScopedProfile struct {
	Available []string `json:"available"`
	Default   string   `json:"default"`
	Toggle    bool     `json:"toggle"`
}

type NamespaceScopedProfile struct {
	Available []ObjectReference `json:"available"`
	Default   ObjectReference   `json:"default"`
	Toggle    bool              `json:"toggle"`
}

type ToggleProfileOnString struct {
	Default string `json:"default"`
	Toggle  bool   `json:"toggle"`
}

type ToggleProfileOnBoolean struct {
	Default bool `json:"default"`
	Toggle  bool `json:"toggle"`
}

// *** Monitoring starts *** //

type MonitoringOperator struct {
	ServiceMonitor *mona.ServiceMonitorLabels `json:"serviceMonitor"`
}

type Monitoring struct {
	Agent    mona.AgentType     `json:"agent"`
	Exporter PrometheusExporter `json:"exporter"`
	Toggle   bool               `json:"toggle"`
}

type PrometheusExporter struct {
	// Compute Resources required by the sidecar container.
	// +optional
	Resources core.ResourceRequirements `json:"resources"`
}

type Alert struct {
	Toggle bool `json:"toggle"`
}

// *** Monitoring ends *** //
