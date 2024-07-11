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

// KubedbcomFerretdbEditorOptions defines the schama for FerretDB Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomferretdbeditoroptionss,singular=kubedbcomferretdbeditoroptions
type KubedbcomFerretdbEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomFerretdbEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomFerretdbEditorOptionsSpec is the schema for FerretDB profile values file
type KubedbcomFerretdbEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomFerretdbEditorOptionsSpecSpec `json:"spec"`
	Form         FerretdbAlertsSpecForm                 `json:"form"`
}

type KubedbcomFerretdbEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels          map[string]string         `json:"labels"`
	Version         string                    `json:"version"`
	Mode            FerretDBMode              `json:"mode"`
	ReplicaSet      FerretDBReplicaSet        `json:"replicaSet"`
	ShardTopology   FerretDBShardTopology     `json:"shardTopology"`
	ClusterAuthMode FerretDBClusterAuthMode   `json:"clusterAuthMode"`
	SslMode         FerretDBSSLMode           `json:"sslMode"`
	DeletionPolicy  DeletionPolicy            `json:"deletionPolicy"`
	StorageClass    StorageClass              `json:"storageClass"`
	Persistence     Persistence               `json:"persistence"`
	Machine         MachineType               `json:"machine"`
	Resources       core.ResourceRequirements `json:"resources"`
	AuthSecret      AuthSecret                `json:"authSecret"`
	Monitoring      Monitoring                `json:"monitoring"`
	Backup          BackupToolSpec            `json:"backup"`
}

// +kubebuilder:validation:Enum=Standalone;Replicaset;Sharded
type FerretDBMode string

// +kubebuilder:validation:Enum=keyFile;sendKeyFile;sendX509;x509
type FerretDBClusterAuthMode string

// +kubebuilder:validation:Enum=disabled;allowSSL;preferSSL;requireSSL
type FerretDBSSLMode string

type FerretDBReplicaSet struct {
	Name     string `json:"name"`
	Replicas int    `json:"replicas"`
}

type FerretDBShard struct {
	Replicas    int         `json:"replicas"`
	Shards      int         `json:"shards"`
	Persistence Persistence `json:"persistence"`
}

type FerretDBConfigServer struct {
	Replicas    int         `json:"replicas"`
	Persistence Persistence `json:"persistence"`
}

type FerretDBMongos struct {
	Replicas int `json:"replicas"`
}

type FerretDBShardTopology struct {
	Shard        FerretDBShard        `json:"shard"`
	ConfigServer FerretDBConfigServer `json:"configServer"`
	Mongos       FerretDBMongos       `json:"mongos"`
}

type FerretdbAlertsSpecForm struct {
	Alert alerts.PostgresAlert `json:"alert"`
	CAPI  CAPIFormSpec         `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomFerretdbEditorOptionsList is a list of KubedbcomFerretdbEditorOptionss
type KubedbcomFerretdbEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomFerretdbEditorOptions CRD objects
	Items []KubedbcomFerretdbEditorOptions `json:"items,omitempty"`
}
