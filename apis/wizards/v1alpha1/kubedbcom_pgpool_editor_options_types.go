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
	alerts "go.appscode.dev/alerts/apis/alerts/v1alpha1"
	core "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// KubedbcomPgpoolEditorOptions defines the schama for MongoDB Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcompgpooleditoroptionss,singular=kubedbcompgpooleditoroptions
type KubedbcomPgpoolEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomPgpoolEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomPgpoolEditorOptionsSpec is the schema for MongoDB profile values file
type KubedbcomPgpoolEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomPgpoolEditorOptionsSpecSpec `json:"spec"`
	Form         PgpoolAlertsSpecForm                 `json:"form"`
}

type KubedbcomPgpoolEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels            map[string]string         `json:"labels"`
	Version           string                    `json:"version"`
	Mode              PgpoolMode                `json:"mode"`
	ReplicaSet        PgpoolReplicaSet          `json:"replicaSet"`
	ShardTopology     PgpoolShardTopology       `json:"shardTopology"`
	ClusterAuthMode   PgpoolClusterAuthMode     `json:"clusterAuthMode"`
	SslMode           PgpoolSSLMode             `json:"sslMode"`
	TerminationPolicy TerminationPolicy         `json:"terminationPolicy"`
	StorageClass      StorageClass              `json:"storageClass"`
	Persistence       Persistence               `json:"persistence"`
	Machine           MachineType               `json:"machine"`
	Resources         core.ResourceRequirements `json:"resources"`
	AuthSecret        AuthSecret                `json:"authSecret"`
	Monitoring        Monitoring                `json:"monitoring"`
	Backup            BackupToolSpec            `json:"backup"`
}

// +kubebuilder:validation:Enum=Standalone;Replicaset;Sharded
type PgpoolMode string

// +kubebuilder:validation:Enum=keyFile;sendKeyFile;sendX509;x509
type PgpoolClusterAuthMode string

// +kubebuilder:validation:Enum=disabled;allowSSL;preferSSL;requireSSL
type PgpoolSSLMode string

type PgpoolReplicaSet struct {
	Name     string `json:"name"`
	Replicas int    `json:"replicas"`
}

type PgpoolShard struct {
	Replicas    int         `json:"replicas"`
	Shards      int         `json:"shards"`
	Persistence Persistence `json:"persistence"`
}

type PgpoolConfigServer struct {
	Replicas    int         `json:"replicas"`
	Persistence Persistence `json:"persistence"`
}

type PgpoolMongos struct {
	Replicas int `json:"replicas"`
}

type PgpoolShardTopology struct {
	Shard        PgpoolShard        `json:"shard"`
	ConfigServer PgpoolConfigServer `json:"configServer"`
	Mongos       PgpoolMongos       `json:"mongos"`
}

type PgpoolAlertsSpecForm struct {
	Alert alerts.PgpoolAlerts `json:"alert"`
	CAPI  CAPIFormSpec        `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomPgpoolEditorOptionsList is a list of KubedbcomPgpoolEditorOptionss
type KubedbcomPgpoolEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomPgpoolEditorOptions CRD objects
	Items []KubedbcomPgpoolEditorOptions `json:"items,omitempty"`
}