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

// KubedbcomWeaviateEditorOptions defines the schama for Weaviate Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomweaviateeditoroptionss,singular=kubedbcomweaviateeditoroptions
type KubedbcomWeaviateEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomWeaviateEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomWeaviateEditorOptionsSpec is the schema for Weaviate profile values file
type KubedbcomWeaviateEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomWeaviateEditorOptionsSpecSpec `json:"spec"`
	Form         WeaviateAlertsSpecForm                 `json:"form"`
}

type KubedbcomWeaviateEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	// +optional
	Replicas        int  `json:"replicas,omitempty"`
	DisableSecurity bool `json:"disableSecurity"`
	// +optional
	HealthChecker  *WeaviateHealthChecker `json:"healthChecker,omitempty"`
	Persistence    Persistence            `json:"persistence"`
	PodResources   PodResources           `json:"podResources"`
	AuthSecret     WeaviateAuthSecret     `json:"authSecret"`
	DeletionPolicy DeletionPolicy         `json:"deletionPolicy"`
	Configuration  string                 `json:"configuration"`
	Admin          AdminOptions           `json:"admin"`
	Backup         BackupToolSpec         `json:"backup"`
	Monitoring     MonitoringOperator     `json:"monitoring"`
	// +optional
	Openshift Openshift `json:"openshift"`
}

type WeaviateAuthSecret struct {
	// +optional
	Name string `json:"name"`
	// +optional
	// +kubebuilder:validation:Format:=password
	// Comma separated api keys, stored as the AUTHENTICATION_APIKEY_ALLOWED_KEYS secret key.
	AllowedKeys string `json:"allowedKeys"`
}

type WeaviateHealthChecker struct {
	PeriodSeconds    int32 `json:"periodSeconds"`
	TimeoutSeconds   int32 `json:"timeoutSeconds"`
	FailureThreshold int32 `json:"failureThreshold"`
}

type WeaviateAlertsSpecForm struct {
	Alert alerts.WeaviateAlert `json:"alert"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomWeaviateEditorOptionsList is a list of KubedbcomWeaviateEditorOptionss
type KubedbcomWeaviateEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomWeaviateEditorOptions CRD objects
	Items []KubedbcomWeaviateEditorOptions `json:"items,omitempty"`
}
