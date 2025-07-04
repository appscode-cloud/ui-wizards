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

// KubedbcomHazelcastEditorOptions defines the schama for Hazelcast Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomhazelcasteditoroptionss,singular=kubedbcomhazelcasteditoroptions
type KubedbcomHazelcastEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomHazelcastEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomHazelcastEditorOptionsSpec is the schema for Hazelcast profile values file
type KubedbcomHazelcastEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomHazelcastEditorOptionsSpecSpec `json:"spec"`
}

type KubedbcomHazelcastEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	Mode   HazelcastMode     `json:"mode"`
	// +optional
	Replicas       int                `json:"replicas,omitempty"`
	Persistence    Persistence        `json:"persistence"`
	PodResources   PodResources       `json:"podResources"`
	LicenseSecret  LicenseSecret      `json:"licenseSecret"`
	AuthSecret     AuthSecret         `json:"authSecret"`
	DeletionPolicy DeletionPolicy     `json:"deletionPolicy"`
	Configuration  string             `json:"configuration"`
	Admin          AdminOptions       `json:"admin"`
	Backup         BackupToolSpec     `json:"backup"`
	Monitoring     MonitoringOperator `json:"monitoring"`
	// +optional
	Openshift Openshift `json:"openshift"`
}

// +kubebuilder:validation:Enum=Combined;Topology
type HazelcastMode string

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomHazelcastEditorOptionsList is a list of KubedbcomHazelcastEditorOptionss
type KubedbcomHazelcastEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomHazelcastEditorOptions CRD objects
	Items []KubedbcomHazelcastEditorOptions `json:"items,omitempty"`
}
