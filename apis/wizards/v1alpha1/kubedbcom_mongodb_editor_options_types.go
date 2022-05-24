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
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	api "kubepack.dev/lib-app/api/v1alpha1"
)

// KubedbcomMongodbEditorOptions defines the schama for MongoDB Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcommongodbeditoroptionss,singular=kubedbcommongodbeditoroptions
type KubedbcomMongodbEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomMongodbEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomMongodbEditorOptionsSpec is the schema for MongoDB profile values file
type KubedbcomMongodbEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomMongodbEditorOptionsSpecSpec `json:"spec"`
	Form         KubedbcomMongodbEditorOptionsSpecForm `json:"form"`
}

type KubedbcomMongodbEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels            map[string]string         `json:"labels"`
	Version           string                    `json:"version"`
	Mode              MongoDBMode               `json:"mode"`
	Replicas          int                       `json:"replicas"`
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
}

type KubedbcomMongodbEditorOptionsSpecForm struct {
	Alert MongoDBAlert `json:"alert"`
}

// +kubebuilder:validation:Enum=Standalone;Replicaset;Sharded
type MongoDBMode string

// +kubebuilder:validation:Enum=keyFile;sendKeyFile;sendX509;x509
type MongoDBClusterAuthMode string

// +kubebuilder:validation:Enum=disabled;allowSSL;preferSSL;requireSSL
type MongoDBSSLMode string

type MongoDBReplicaSet struct {
	Name string `json:"name"`
}

type MongoDBShard struct {
	Replicas    int         `json:"replicas"`
	Shards      int         `json:"shards"`
	Persistence Persistence `json:"persistence"`
}

type MongoDBConfigServer struct {
	Replicas    int         `json:"replicas"`
	Persistence Persistence `json:"persistence"`
}

type MongoDBMongos struct {
	Replicas int `json:"replicas"`
}

type MongoDBShardTopology struct {
	Shard        MongoDBShard        `json:"shard"`
	ConfigServer MongoDBConfigServer `json:"configServer"`
	Mongos       MongoDBMongos       `json:"mongos"`
}

// *** Alerts *** //

type MongoDBAlert struct {
	Enabled bool              `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string  `json:"additionalRuleLabels"`
	Groups               MongoDBAlertGroups `json:"groups"`
}

type MongoDBAlertGroups struct {
	Database      MongoDBDatabaseAlert `json:"database"`
	Provisioner   ProvisionerAlert     `json:"provisioner"`
	OpsManager    OpsManagerAlert      `json:"opsManager"`
	Stash         StashAlert           `json:"stash"`
	SchemaManager SchemaManagerAlert   `json:"schemaManager"`
}

type MongoDBDatabaseAlert struct {
	Enabled bool                      `json:"enabled"`
	Rules   MongoDBDatabaseAlertRules `json:"rules"`
}

type MongoDBDatabaseAlertRules struct {
	MongodbVirtualMemoryUsage        IntValAlert `json:"mongodbVirtualMemoryUsage"`
	MongodbReplicationLag            IntValAlert `json:"mongodbReplicationLag"`
	MongodbNumberCursorsOpen         IntValAlert `json:"mongodbNumberCursorsOpen"`
	MongodbCursorsTimeouts           IntValAlert `json:"mongodbCursorsTimeouts"`
	MongodbTooManyConnections        IntValAlert `json:"mongodbTooManyConnections"`
	MongoDBPhaseCritical             FixedAlert  `json:"mongoDBPhaseCritical"`
	MongoDBDown                      FixedAlert  `json:"mongoDBDown"`
	MongodbHighLatency               IntValAlert `json:"mongodbHighLatency"`
	MongodbHighTicketUtilization     IntValAlert `json:"mongodbHighTicketUtilization"`
	MongodbRecurrentCursorTimeout    IntValAlert `json:"mongodbRecurrentCursorTimeout"`
	MongodbRecurrentMemoryPageFaults IntValAlert `json:"mongodbRecurrentMemoryPageFaults"`
}

// *** Alerts *** //

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomMongodbEditorOptionsList is a list of KubedbcomMongodbEditorOptionss
type KubedbcomMongodbEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomMongodbEditorOptions CRD objects
	Items []KubedbcomMongodbEditorOptions `json:"items,omitempty"`
}
