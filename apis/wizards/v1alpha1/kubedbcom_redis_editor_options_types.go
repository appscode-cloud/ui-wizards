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

// KubedbcomRedisEditorOptions defines the schama for Redis Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomrediseditoroptionss,singular=kubedbcomrediseditoroptions
type KubedbcomRedisEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomRedisEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomRedisEditorOptionsSpec is the schema for Redis profile values file
type KubedbcomRedisEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomRedisEditorOptionsSpecSpec `json:"spec"`
	Form         RedisAlertsSpecForm                 `json:"form"`
}

type KubedbcomRedisEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	Mode   RedisMode         `json:"mode"`
	// +optional
	Replicas int `json:"replicas,omitempty"`
	// +optional
	Cluster        RedisCluster   `json:"cluster,omitempty"`
	SentinelRef    NamespacedName `json:"sentinelRef,omitempty"`
	Persistence    Persistence    `json:"persistence"`
	PodResources   PodResources   `json:"podResources"`
	AuthSecret     AuthSecret     `json:"authSecret"`
	DeletionPolicy DeletionPolicy `json:"deletionPolicy"`
	Configuration  string         `json:"configuration"`
	Admin          AdminOptions   `json:"admin"`
}

type RedisCluster struct {
	Master   int `json:"master"`
	Replicas int `json:"replicas"`
}

type NamespacedName struct {
	Name      string `json:"name"`
	Namespace string `json:"namespace"`
}

// +kubebuilder:validation:Enum=Standalone;Cluster;Sentinel
type RedisMode string

type RedisAlertsSpecForm struct {
	Alert alerts.RedisAlert `json:"alert"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomRedisEditorOptionsList is a list of KubedbcomRedisEditorOptionss
type KubedbcomRedisEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomRedisEditorOptions CRD objects
	Items []KubedbcomRedisEditorOptions `json:"items,omitempty"`
}
