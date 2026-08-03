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
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// Monitoringk8sappscodecomTelemetryStackEditorOptions defines the schama for TelemetryStack Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=monitoringk8sappscodecomtelemetrystackeditoroptionss,singular=monitoringk8sappscodecomtelemetrystackeditoroptions
type Monitoringk8sappscodecomTelemetryStackEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              Monitoringk8sappscodecomTelemetryStackEditorOptionsSpec `json:"spec,omitempty"`
}

// Monitoringk8sappscodecomTelemetryStackEditorOptionsSpec is the schema for TelemetryStack profile values file
type Monitoringk8sappscodecomTelemetryStackEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         Monitoringk8sappscodecomTelemetryStackEditorOptionsSpecSpec `json:"spec"`
}

type Monitoringk8sappscodecomTelemetryStackEditorOptionsSpecSpec struct {
	Metrics MetricsOptions    `json:"metrics"`
	Logs    ClickHouseOptions `json:"logs"`
	Traces  ClickHouseOptions `json:"traces"`
}

// MetricsOptions configures the Thanos based metrics pillar of the TelemetryStack.
type MetricsOptions struct {
	Thanos ThanosOptions `json:"thanos"`
}

type ThanosOptions struct {
	Compact ThanosCompactOptions `json:"compact"`
	Store   ThanosStoreOptions   `json:"store"`
	Query   ThanosQueryOptions   `json:"query"`
	Receive ThanosReceiveOptions `json:"receive"`
	Ruler   ThanosRulerOptions   `json:"ruler"`
	S3      S3Storage            `json:"s3"`
}

type ThanosCompactOptions struct {
	StorageSize string `json:"storageSize"`
	// +optional
	RetentionConfig []ThanosRetentionConfig `json:"retentionConfig,omitempty"`
}

type ThanosRetentionConfig struct {
	// +optional
	Raw string `json:"raw,omitempty"`
	// +optional
	OneHour string `json:"oneHour,omitempty"`
	// +optional
	FiveMinutes string `json:"fiveMinutes,omitempty"`
}

type ThanosStoreOptions struct {
	StorageSize string `json:"storageSize"`
	// +optional
	IgnoreDeletionMarksDelay string                 `json:"ignoreDeletionMarksDelay,omitempty"`
	ShardingStrategy         ThanosShardingStrategy `json:"shardingStrategy"`
}

type ThanosShardingStrategy struct {
	Type   string `json:"type"`
	Shards int32  `json:"shards"`
}

type ThanosQueryOptions struct {
	// +optional
	Replicas *int32 `json:"replicas,omitempty"`
}

type ThanosReceiveOptions struct {
	IngesterSpec ThanosIngesterSpec `json:"ingesterSpec"`
	RouterSpec   ThanosRouterSpec   `json:"routerSpec"`
}

type ThanosIngesterSpec struct {
	// Name of the hashring
	Name        string `json:"name"`
	Replicas    int32  `json:"replicas"`
	StorageSize string `json:"storageSize"`
	// +optional
	TSDBRetention string `json:"tsdbRetention,omitempty"`
	// +optional
	TenancyConfig ThanosTenancyConfig `json:"tenancyConfig,omitempty"`
}

type ThanosTenancyConfig struct {
	// +kubebuilder:validation:Enum=exact;glob
	// +optional
	TenantMatcherType string `json:"tenantMatcherType,omitempty"`
	// +optional
	TenantHeader string `json:"tenantHeader,omitempty"`
	// +optional
	DefaultTenantID string `json:"defaultTenantID,omitempty"`
	// +optional
	TenantLabelName string `json:"tenantLabelName,omitempty"`
}

type ThanosRouterSpec struct {
	Replicas          int32 `json:"replicas"`
	ReplicationFactor int32 `json:"replicationFactor"`
	// +optional
	ExternalLabels map[string]string `json:"externalLabels,omitempty"`
}

type ThanosRulerOptions struct {
	Replicas        int32  `json:"replicas"`
	StorageSize     string `json:"storageSize"`
	AlertmanagerURL string `json:"alertmanagerURL"`
	// +optional
	AdditionalConfig AdditionalConfig `json:"additionalConfig,omitempty"`
}

// AdditionalConfig lets advanced users pass extra CLI args and sidecar volumes/mounts.
type AdditionalConfig struct {
	// +optional
	AdditionalArgs []string `json:"additionalArgs,omitempty"`
	// +optional
	AdditionalVolumes []AdditionalVolume `json:"additionalVolumes,omitempty"`
	// +optional
	AdditionalVolumeMounts []AdditionalVolumeMount `json:"additionalVolumeMounts,omitempty"`
}

// +kubebuilder:validation:Enum=Secret;ConfigMap
type AdditionalVolumeType string

const (
	AdditionalVolumeTypeSecret    AdditionalVolumeType = "Secret"
	AdditionalVolumeTypeConfigMap AdditionalVolumeType = "ConfigMap"
)

type AdditionalVolume struct {
	VolumeType AdditionalVolumeType `json:"volumeType"`
	Name       string               `json:"name"`
	// +optional
	SecretName string `json:"secretName,omitempty"`
	// +optional
	Key string `json:"key,omitempty"`
	// +optional
	Path string `json:"path,omitempty"`
	// +optional
	Mode *int32 `json:"mode,omitempty"`
}

type AdditionalVolumeMount struct {
	Name      string `json:"name"`
	MountPath string `json:"mountPath"`
	// +optional
	ReadOnly bool `json:"readOnly,omitempty"`
}

// S3Storage is the shared object storage backend for the telemetry pillars.
type S3Storage struct {
	Bucket   string `json:"bucket"`
	Endpoint string `json:"endpoint"`
	Region   string `json:"region"`
	// +optional
	Prefix    string `json:"prefix,omitempty"`
	AccessKey string `json:"accessKey"`
	SecretKey string `json:"secretKey"`
}

// ClickHouseOptions configures the ClickHouse backend shared by the logs and traces pillars.
type ClickHouseOptions struct {
	Enabled        bool                     `json:"enabled"`
	DeploymentMode ClickHouseDeploymentMode `json:"deploymentMode"`
	Version        string                   `json:"version"`
	DeletionPolicy DeletionPolicy           `json:"deletionPolicy"`
	Storage        ClickHouseStorage        `json:"storage"`
	// +optional
	ClientCACertificates []ClientCACertificateRef `json:"clientCaCertificates,omitempty"`
	// +optional
	ClusterTopology *ClickHouseClusterTopology `json:"clusterTopology,omitempty"`
	S3              S3Storage                  `json:"s3"`
}

// +kubebuilder:validation:Enum=Standalone;ClusterTopology
type ClickHouseDeploymentMode string

const (
	ClickHouseDeploymentModeStandalone      ClickHouseDeploymentMode = "Standalone"
	ClickHouseDeploymentModeClusterTopology ClickHouseDeploymentMode = "ClusterTopology"
)

type ClickHouseStorage struct {
	StorageClassName string `json:"storageClassName"`
	Size             string `json:"size"`
}

type ClientCACertificateRef struct {
	Name string `json:"name"`
	Key  string `json:"key"`
}

// ClickHouseClusterTopology configures ClickHouse for high availability, used when
// DeploymentMode is ClusterTopology.
type ClickHouseClusterTopology struct {
	Cluster          ClickHouseCluster       `json:"cluster"`
	ClickHouseKeeper ClickHouseKeeperOptions `json:"clickHouseKeeper"`
}

type ClickHouseCluster struct {
	Name        string      `json:"name"`
	Replicas    int32       `json:"replicas"`
	Shards      int32       `json:"shards"`
	Persistence Persistence `json:"persistence"`
}

type ClickHouseKeeperOptions struct {
	// +optional
	ExternallyManaged bool        `json:"externallyManaged,omitempty"`
	Replicas          int32       `json:"replicas"`
	Persistence       Persistence `json:"persistence"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// Monitoringk8sappscodecomTelemetryStackEditorOptionsList is a list of Monitoringk8sappscodecomTelemetryStackEditorOptions
type Monitoringk8sappscodecomTelemetryStackEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of Monitoringk8sappscodecomTelemetryStackEditorOptions CRD objects
	Items []Monitoringk8sappscodecomTelemetryStackEditorOptions `json:"items,omitempty"`
}
