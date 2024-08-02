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
	Labels         map[string]string `json:"labels"`
	Mode           SolrMode          `json:"mode"`
	ReplicaSet     SolrReplicaSet    `json:"replicaSet"`
	Topology       SolrTopology      `json:"topology"`
	ZookeeperRef   ObjectReference   `json:"zookeeperRef"`
	Persistence    Persistence       `json:"persistence"`
	PodResources   PodResources      `json:"podResources"`
	AuthSecret     AuthSecret        `json:"authSecret"`
	DeletionPolicy DeletionPolicy    `json:"deletionPolicy"`
	Configuration  string            `json:"configuration"`
	Admin          AdminOptions      `json:"admin"`
}

// +kubebuilder:validation:Enum=Standalone;Replicaset;Topology
type SolrMode string

type SolrReplicaSet struct {
	Replicas int `json:"replicas"`
}

type SolrNode struct {
	Replicas     int          `json:"replicas"`
	PodResources PodResources `json:"podResources"`
	Persistence  Persistence  `json:"persistence"`
}

type SolrTopology struct {
	Overseer    *SolrNode `json:"overseer"`
	Data        *SolrNode `json:"data"`
	Coordinator *SolrNode `json:"coordinator"`
}

type SolrAlertsSpecForm struct {
	Alert alerts.SolrAlert `json:"alert"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomSolrEditorOptionsList is a list of KubedbcomSolrEditorOptionss
type KubedbcomSolrEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomSolrEditorOptions CRD objects
	Items []KubedbcomSolrEditorOptions `json:"items,omitempty"`
}
