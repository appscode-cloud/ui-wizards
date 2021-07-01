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

// KubedbcomElasticsearchEditorOptions defines the schama for Elasticsearch Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomelasticsearcheditoroptionss,singular=kubedbcomelasticsearcheditoroptions
type KubedbcomElasticsearchEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomElasticsearchEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomElasticsearchEditorOptionsSpec is the schema for Elasticsearch profile values file
type KubedbcomElasticsearchEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomElasticsearchEditorOptionsSpecSpec `json:"spec"`
}

type KubedbcomElasticsearchEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels            map[string]string         `json:"labels"`
	Version           string                    `json:"version"`
	Mode              ElasticsearchMode         `json:"mode"`
	Replicas          int                       `json:"replicas"`
	TerminationPolicy TerminationPolicy         `json:"terminationPolicy"`
	StorageClass      StorageClass              `json:"storageClass"`
	Persistence       Persistence               `json:"persistence"`
	Machine           MachineType               `json:"machine"`
	Resources         core.ResourceRequirements `json:"resources"`
	AuthSecret        AuthSecret                `json:"authSecret"`
}

// +kubebuilder:validation:Enum=Standalone;Replicaset;Sharded
type ElasticsearchMode string

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomElasticsearchEditorOptionsList is a list of KubedbcomElasticsearchEditorOptionss
type KubedbcomElasticsearchEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomElasticsearchEditorOptions CRD objects
	Items []KubedbcomElasticsearchEditorOptions `json:"items,omitempty"`
}
