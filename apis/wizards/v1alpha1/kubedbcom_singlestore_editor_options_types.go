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

// KubedbcomSinglestoreEditorOptions defines the schama for Singlestore Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomsinglestoreeditoroptionss,singular=kubedbcomsinglestoreeditoroptions
type KubedbcomSinglestoreEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomSinglestoreEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomSinglestoreEditorOptionsSpec is the schema for Singlestore profile values file
type KubedbcomSinglestoreEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomSinglestoreEditorOptionsSpecSpec `json:"spec"`
	Form         SinglestoreAlertsSpecForm                 `json:"form"`
}

type KubedbcomSinglestoreEditorOptionsSpecSpec struct {
	Version string `json:"version"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels         map[string]string   `json:"labels"`
	Mode           SinglestoreMode     `json:"mode"`
	DeletionPolicy DeletionPolicy      `json:"deletionPolicy"`
	StorageClass   StorageClass        `json:"storageClass"`
	Persistence    Persistence         `json:"persistence"`
	PodResources   PodResources        `json:"podResources"`
	Topology       SinglestoreTopology `json:"topology"`
	LicenseSecret  LicenseSecret       `json:"licenseSecret"`
	AuthSecret     AuthSecret          `json:"authSecret"`
	Monitoring     Monitoring          `json:"monitoring"`
	Backup         BackupToolSpec      `json:"backup"`
}

// +kubebuilder:validation:Enum=Standalone;Topology
type SinglestoreMode string

type SinglestoreTopology struct {
	Aggregator *SinglestoreNode `json:"aggregator"`
	Leaf       *SinglestoreNode `json:"leaf"`
}

type SinglestoreNode struct {
	Replicas     int          `json:"replicas"`
	PodResources PodResources `json:"podResources"`
	Persistence  Persistence  `json:"persistence"`
}

type LicenseSecret struct {
	Name string `json:"name"`
}

type SinglestoreAlertsSpecForm struct {
	Alert alerts.SinglestoreAlert `json:"alert"`
	CAPI  CAPIFormSpec            `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomSinglestoreEditorOptionsList is a list of KubedbcomSinglestoreEditorOptionss
type KubedbcomSinglestoreEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomSinglestoreEditorOptions CRD objects
	Items []KubedbcomSinglestoreEditorOptions `json:"items,omitempty"`
}
