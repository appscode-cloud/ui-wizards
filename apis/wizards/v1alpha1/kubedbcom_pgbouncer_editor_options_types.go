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
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// KubedbcomPgbouncerEditorOptions defines the schama for PgBouncer Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcompgbouncereditoroptionss,singular=kubedbcompgbouncereditoroptions
type KubedbcomPgbouncerEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomPgbouncerEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomPgbouncerEditorOptionsSpec is the schema for Pgbouncer profile values file
type KubedbcomPgbouncerEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomPgbouncerEditorOptionsSpecSpec `json:"spec"`
}

type KubedbcomPgbouncerEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels            map[string]string         `json:"labels"`
	Replicas          int                       `json:"replicas"`
	Version           string                    `json:"version"`
	TerminationPolicy TerminationPolicy         `json:"terminationPolicy"`
	Machine           MachineType               `json:"machine"`
	Resources         core.ResourceRequirements `json:"resources"`
	AuthSecret        AuthSecret                `json:"authSecret"`
	Monitoring        Monitoring                `json:"monitoring"`
}

// +kubebuilder:validation:Enum=Standalone;Cluster
type PgbouncerMode string

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomPgbouncerEditorOptionsList is a list of KubedbcomPgbouncerEditorOptionss
type KubedbcomPgbouncerEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomPgbouncerEditorOptions CRD objects
	Items []KubedbcomPgbouncerEditorOptions `json:"items,omitempty"`
}
