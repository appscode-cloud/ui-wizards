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

// KubedbcomZookeeperEditorOptions defines the schama for MongoDB Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomzookeepereditoroptionss,singular=kubedbcomzookeepereditoroptions
type KubedbcomZookeeperEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomZookeeperEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomZookeeperEditorOptionsSpec is the schema for MongoDB profile values file
type KubedbcomZookeeperEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomZookeeperEditorOptionsSpecSpec `json:"spec"`
	Form         ZookeeperAlertsSpecForm                 `json:"form"`
}

type KubedbcomZookeeperEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels            map[string]string         `json:"labels"`
	Version           string                    `json:"version"`
	Mode              MongoDBMode               `json:"mode"`
	ReplicaSet        MongoDBReplicaSet         `json:"replicaSet"`
	ShardTopology     MongoDBShardTopology      `json:"shardTopology"`
	ClusterAuthMode   MongoDBClusterAuthMode    `json:"clusterAuthMode"`
	SslMode           MongoDBSSLMode            `json:"sslMode"`
	TerminationPolicy TerminationPolicy         `json:"terminationPolicy"`
	StorageClass      StorageClass              `json:"storageClass"`
	Persistence       Persistence               `json:"persistence"`
	Machine           MachineType               `json:"machine"`
	Resources         core.ResourceRequirements `json:"resources"`
	AuthSecret        AuthSecret                `json:"authSecret"`
	Monitoring        Monitoring                `json:"monitoring"`
	Backup            BackupToolSpec            `json:"backup"`
}

type ZookeeperAlertsSpecForm struct {
	Alert alerts.MongoDBAlert `json:"alert"`
	CAPI  CAPIFormSpec        `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomZookeeperEditorOptionsList is a list of KubedbcomZookeeperEditorOptionss
type KubedbcomZookeeperEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomZookeeperEditorOptions CRD objects
	Items []KubedbcomZookeeperEditorOptions `json:"items,omitempty"`
}
