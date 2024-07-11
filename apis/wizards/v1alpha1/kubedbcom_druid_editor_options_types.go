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

// KubedbcomDruidEditorOptions defines the schama for Druid Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomdruideditoroptionss,singular=kubedbcomdruideditoroptions
type KubedbcomDruidEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomDruidEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomDruidEditorOptionsSpec is the schema for Druid profile values file
type KubedbcomDruidEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomDruidEditorOptionsSpecSpec `json:"spec"`
	Form         DruidAlertsSpecForm                 `json:"form"`
}

type KubedbcomDruidEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels          map[string]string         `json:"labels"`
	Version         string                    `json:"version"`
	Mode            DruidMode                 `json:"mode"`
	ReplicaSet      DruidReplicaSet           `json:"replicaSet"`
	ShardTopology   DruidShardTopology        `json:"shardTopology"`
	ClusterAuthMode DruidClusterAuthMode      `json:"clusterAuthMode"`
	SslMode         DruidSSLMode              `json:"sslMode"`
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
type DruidMode string

// +kubebuilder:validation:Enum=keyFile;sendKeyFile;sendX509;x509
type DruidClusterAuthMode string

// +kubebuilder:validation:Enum=disabled;allowSSL;preferSSL;requireSSL
type DruidSSLMode string

type DruidReplicaSet struct {
	Name     string `json:"name"`
	Replicas int    `json:"replicas"`
}

type DruidShard struct {
	Replicas    int         `json:"replicas"`
	Shards      int         `json:"shards"`
	Persistence Persistence `json:"persistence"`
}

type DruidConfigServer struct {
	Replicas    int         `json:"replicas"`
	Persistence Persistence `json:"persistence"`
}

type DruidMongos struct {
	Replicas    int         `json:"replicas"`
	Persistence Persistence `json:"persistence"`
}

type DruidShardTopology struct {
	Shard        DruidShard        `json:"shard"`
	ConfigServer DruidConfigServer `json:"configServer"`
	Mongos       DruidMongos       `json:"mongos"`
}

type DruidAlertsSpecForm struct {
	Alert alerts.DruidAlert `json:"alert"`
	CAPI  CAPIFormSpec      `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomDruidEditorOptionsList is a list of KubedbcomDruidEditorOptionss
type KubedbcomDruidEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomDruidEditorOptions CRD objects
	Items []KubedbcomDruidEditorOptions `json:"items,omitempty"`
}
