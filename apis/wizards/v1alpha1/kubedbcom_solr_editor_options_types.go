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

// KubedbcomSolrEditorOptions defines the schama for Solr Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomsolreditoroptionss,singular=kubedbcomsolreditoroptions
type KubedbcomSolrEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomSolrEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomSolrEditorOptionsSpec is the schema for Solr profile values file
type KubedbcomSolrEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomSolrEditorOptionsSpecSpec `json:"spec"`
	Form         SolrAlertsSpecForm                 `json:"form"`
}

type KubedbcomSolrEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels            map[string]string         `json:"labels"`
	Version           string                    `json:"version"`
	Mode              SolrMode                  `json:"mode"`
	ReplicaSet        SolrReplicaSet            `json:"replicaSet"`
	ShardTopology     SolrShardTopology         `json:"shardTopology"`
	ClusterAuthMode   SolrClusterAuthMode       `json:"clusterAuthMode"`
	SslMode           SolrSSLMode               `json:"sslMode"`
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
type SolrMode string

// +kubebuilder:validation:Enum=keyFile;sendKeyFile;sendX509;x509
type SolrClusterAuthMode string

// +kubebuilder:validation:Enum=disabled;allowSSL;preferSSL;requireSSL
type SolrSSLMode string

type SolrReplicaSet struct {
	Name     string `json:"name"`
	Replicas int    `json:"replicas"`
}

type SolrShard struct {
	Replicas    int         `json:"replicas"`
	Shards      int         `json:"shards"`
	Persistence Persistence `json:"persistence"`
}

type SolrConfigServer struct {
	Replicas    int         `json:"replicas"`
	Persistence Persistence `json:"persistence"`
}

type SolrShardTopology struct {
	Shard        SolrShard        `json:"shard"`
	ConfigServer SolrConfigServer `json:"configServer"`
}

type SolrAlertsSpecForm struct {
	Alert alerts.SolrAlert `json:"alert"`
	CAPI  CAPIFormSpec     `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomSolrEditorOptionsList is a list of KubedbcomSolrEditorOptionss
type KubedbcomSolrEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomSolrEditorOptions CRD objects
	Items []KubedbcomSolrEditorOptions `json:"items,omitempty"`
}