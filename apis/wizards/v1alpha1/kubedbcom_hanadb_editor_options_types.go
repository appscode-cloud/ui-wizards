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

// KubedbcomHanaDBEditorOptions defines the schama for HanaDB Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomhanadbeditoroptionss,singular=kubedbcomhanadbeditoroptions
type KubedbcomHanaDBEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomHanaDBEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomHanaDBEditorOptionsSpec is the schema for HanaDB profile values file
type KubedbcomHanaDBEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomHanaDBEditorOptionsSpecSpec `json:"spec"`
}

type KubedbcomHanaDBEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	Mode   HanaDBMode        `json:"mode"`
	// +optional
	SystemReplication *HanaDBSystemReplication `json:"systemReplication,omitempty"`
	// +optional
	Replicas       int                `json:"replicas,omitempty"`
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

// +kubebuilder:validation:Enum=Standalone;SystemReplication
type HanaDBMode string

type HanaDBSystemReplication struct {
	ReplicationMode HanaDBReplicationMode `json:"replicationMode"`
	OperationMode   HanaDBOperationMode   `json:"operationMode"`
}

// +kubebuilder:validation:Enum=sync;syncmem;async;fullsync
type HanaDBReplicationMode string

// +kubebuilder:validation:Enum=logreplay;delta_datashipping;logreplay_readaccess
type HanaDBOperationMode string

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomHanaDBEditorOptionsList is a list of KubedbcomHanaDBEditorOptionss
type KubedbcomHanaDBEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomHanaDBEditorOptions CRD objects
	Items []KubedbcomHanaDBEditorOptions `json:"items,omitempty"`
}
