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

	Databases      DatabasesProfile     `json:"databases"`
	StorageClasses ClusterScopedProfile `json:"storageClasses"`

	TLS            ToggleProfileOnBoolean `json:"tls"`
	ClusterIssuers ClusterScopedProfile   `json:"clusterIssuers"`
	WebUI          ToggleProfileOnBoolean `json:"webUI"`

	Monitoring Monitoring `json:"monitoring"`
	Alert      Alert      `json:"alert"`

	Archiver ToggleProfileOnBoolean `json:"archiver"`
	Backup   BackupToolSpec         `json:"backup"`
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

type DatabasesProfile struct {
	ClickHouse    DatabaseProfile `json:"ClickHouse"`
	Druid         DatabaseProfile `json:"Druid"`
	Elasticsearch DatabaseProfile `json:"Elasticsearch"`
	FerretDB      DatabaseProfile `json:"FerretDB"`
	Kafka         DatabaseProfile `json:"Kafka"`
	MariaDB       DatabaseProfile `json:"MariaDB"`
	Memcached     DatabaseProfile `json:"Memcached"`
	MongoDB       DatabaseProfile `json:"MongoDB"`
	MSSQLServer   DatabaseProfile `json:"MSSQLServer"`
	MySQL         DatabaseProfile `json:"MySQL"`
	PerconaXtraDB DatabaseProfile `json:"PerconaXtraDB"`
	PgBouncer     DatabaseProfile `json:"PgBouncer"`
	Pgpool        DatabaseProfile `json:"Pgpool"`
	Postgres      DatabaseProfile `json:"Postgres"`
	ProxySQL      DatabaseProfile `json:"ProxySQL"`
	RabbitMQ      DatabaseProfile `json:"RabbitMQ"`
	Redis         DatabaseProfile `json:"Redis"`
	Singlestore   DatabaseProfile `json:"Singlestore"`
	Solr          DatabaseProfile `json:"Solr"`
	ZooKeeper     DatabaseProfile `json:"ZooKeeper"`
}

type DatabaseProfile struct {
	Versions ClusterScopedProfile `json:"versions"`
}

type ClusterScopedProfile struct {
	Available []string `json:"available"`
	// +optional
	Default string `json:"default"`
	Toggle  bool   `json:"toggle"`
}

type NamespaceScopedProfile struct {
	Available []ObjectReference `json:"available"`
	Default   ObjectReference   `json:"default"`
	Toggle    bool              `json:"toggle"`
}

type ToggleProfileOnBoolean struct {
	Default bool `json:"default"`
	Toggle  bool `json:"toggle"`
}

// *** Monitoring starts *** //

type Monitoring struct {
	Agent          mona.AgentType             `json:"agent"`
	Exporter       PrometheusExporter         `json:"exporter"`
	ServiceMonitor *mona.ServiceMonitorLabels `json:"serviceMonitor"`
	Toggle         bool                       `json:"toggle"`
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
