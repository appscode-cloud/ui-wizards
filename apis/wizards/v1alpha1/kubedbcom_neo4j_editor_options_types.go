/*
Copyright AppsCode Inc. and Contributors

Licensed under the PolyForm Noncommercial License 1.0.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://github.com/appscode/licenses/raw/1.0.0/PolyForm-Noncommercial-1.0.0.md
r
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

// KubedbcomNeo4jEditorOptions defines the schama for Neo4j Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomneo4jeditoroptionss,singular=kubedbcomneo4jeditoroptions
type KubedbcomNeo4jEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomNeo4jEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomNeo4jEditorOptionsSpec is the schema for Neo4j profile values file
type KubedbcomNeo4jEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomNeo4jEditorOptionsSpecSpec `json:"spec"`
}

type KubedbcomNeo4jEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
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

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomNeo4jEditorOptionsList is a list of KubedbcomNeo4jEditorOptionss
type KubedbcomNeo4jEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomNeo4jEditorOptions CRD objects
	Items []KubedbcomNeo4jEditorOptions `json:"items,omitempty"`
}
