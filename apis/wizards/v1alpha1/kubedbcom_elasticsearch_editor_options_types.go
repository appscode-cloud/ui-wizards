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
	Form         ElasticsearchAlertsSpecForm                 `json:"form"`
}

type KubedbcomElasticsearchEditorOptionsSpecSpec struct {
	Version string `json:"version"`
	// Authentication plugin used by Elasticsearch cluster
	AuthPlugin ElasticsearchAuthPlugin `json:"authPlugin"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	Mode   ElasticsearchMode `json:"mode"`
	// +optional
	Replicas *int `json:"replicas,omitempty"`
	// +optional
	Topology          *ElasticsearchTopology `json:"topology,omitempty"`
	EnableSSL         bool                   `json:"enableSSL"`
	DisableSecurity   bool                   `json:"disableSecurity"`
	TerminationPolicy TerminationPolicy      `json:"terminationPolicy"`
	StorageClass      StorageClass           `json:"storageClass"`
	// +optional
	Persistence *Persistence `json:"persistence"`
	// +optional
	Machine    MachineType               `json:"machine"`
	Resources  core.ResourceRequirements `json:"resources"`
	AuthSecret AuthSecret                `json:"authSecret"`
	Monitoring Monitoring                `json:"monitoring"`
	Backup     BackupToolSpec            `json:"backup"`
}

// +kubebuilder:validation:Enum=OpenDistro;OpenSearch;SearchGuard;X-Pack
type ElasticsearchAuthPlugin string

const (
	ElasticsearchAuthPluginOpenDistro  ElasticsearchAuthPlugin = "OpenDistro"
	ElasticsearchAuthPluginOpenSearch  ElasticsearchAuthPlugin = "OpenSearch"
	ElasticsearchAuthPluginSearchGuard ElasticsearchAuthPlugin = "SearchGuard"
	ElasticsearchAuthPluginXpack       ElasticsearchAuthPlugin = "X-Pack"
)

type ElasticsearchTopology struct {
	Master ElasticsearchNode `json:"master"`
	Data   ElasticsearchNode `json:"data"`
	Ingest ElasticsearchNode `json:"ingest"`
}

type ElasticsearchNode struct {
	Replicas int `json:"replicas"`
	// +optional
	Machine     string      `json:"machine"`
	Persistence Persistence `json:"persistence"`
}

// +kubebuilder:validation:Enum=Combined;Dedicated
type ElasticsearchMode string

type ElasticsearchAlertsSpecForm struct {
	Alert alerts.ElasticsearchAlert `json:"alert"`
	CAPI  CAPIFormSpec              `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomElasticsearchEditorOptionsList is a list of KubedbcomElasticsearchEditorOptionss
type KubedbcomElasticsearchEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomElasticsearchEditorOptions CRD objects
	Items []KubedbcomElasticsearchEditorOptions `json:"items,omitempty"`
}
