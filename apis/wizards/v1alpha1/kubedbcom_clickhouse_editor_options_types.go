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

// KubedbcomClickhouseEditorOptions defines the schama for ClickHouse Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomclickhouseeditoroptionss,singular=kubedbcomclickhouseeditoroptions
type KubedbcomClickhouseEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomClickhouseEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomClickhouseEditorOptionsSpec is the schema for ClickHouse profile values file
type KubedbcomClickhouseEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomClickhouseEditorOptionsSpecSpec `json:"spec"`
}

type KubedbcomClickhouseEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels         map[string]string  `json:"labels"`
	Mode           ClickHouseMode     `json:"mode"`
	Topology       ClickHouseTopology `json:"topology"`
	Persistence    Persistence        `json:"persistence"`
	PodResources   PodResources       `json:"podResources"`
	AuthSecret     AuthSecret         `json:"authSecret"`
	DeletionPolicy DeletionPolicy     `json:"deletionPolicy"`
	Configuration  string             `json:"configuration"`
	Admin          AdminOptions       `json:"admin"`
	Backup         BackupToolSpec     `json:"backup"`
	Monitoring     MonitoringOperator `json:"monitoring"`
	// +optional
	Openshift Openshift `json:"openshift"`
}

// +kubebuilder:validation:Enum=Standalone;Topology
type ClickHouseMode string

type ClickHouseTopology struct {
	Cluster          []ClickHouseClusterSpec `json:"cluster"`
	ClickHouseKeeper *ClickHouseKeeperConfig `json:"clickHouseKeeper"`
}

type ClickHouseClusterSpec struct {
	Name     string `json:"name"`
	Replicas int32  `json:"replicas"`
	Shards   int32  `json:"shards"`
}

type ClickHouseKeeperConfig struct {
	Host string `json:"host"`
	Port int32  `json:"port"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomClickhouseEditorOptionsList is a list of KubedbcomClickhouseEditorOptionss
type KubedbcomClickhouseEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomClickhouseEditorOptions CRD objects
	Items []KubedbcomClickhouseEditorOptions `json:"items,omitempty"`
}
