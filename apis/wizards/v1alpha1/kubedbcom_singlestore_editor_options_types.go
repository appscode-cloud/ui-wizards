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

// KubedbcomSingleStoreEditorOptions defines the schama for SingleStore Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomsinglestoreeditoroptionss,singular=kubedbcomsinglestoreeditoroptions
type KubedbcomSingleStoreEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomSingleStoreEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomSingleStoreEditorOptionsSpec is the schema for SingleStore profile values file
type KubedbcomSingleStoreEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomSingleStoreEditorOptionsSpecSpec `json:"spec"`
	Form         SingleStoreAlertsSpecForm                 `json:"form"`
}

type KubedbcomSingleStoreEditorOptionsSpecSpec struct {
	Version string `json:"version"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	Mode   SingleStoreMode   `json:"mode"`
	// +optional
	Replicas int `json:"replicas,omitempty"`
	// +optional
	InnoDBCluster     SingleStoreInnoDBCluster  `json:"innoDBCluster,omitempty"`
	TerminationPolicy TerminationPolicy         `json:"terminationPolicy"`
	StorageClass      StorageClass              `json:"storageClass"`
	Persistence       Persistence               `json:"persistence"`
	Machine           MachineType               `json:"machine"`
	Resources         core.ResourceRequirements `json:"resources"`
	AuthSecret        AuthSecret                `json:"authSecret"`
	Monitoring        Monitoring                `json:"monitoring"`
	Backup            BackupToolSpec            `json:"backup"`
}

type SingleStoreInnoDBCluster struct {
	Router SingleStoreRouter `json:"router"`
}

type SingleStoreRouter struct {
	Replicas int `json:"replicas"`
}

// +kubebuilder:validation:Enum=Standalone;GroupReplication;InnoDBCluster
type SingleStoreMode string

type SingleStoreAlertsSpecForm struct {
	Alert alerts.SinglestoreAlert `json:"alert"`
	CAPI  CAPIFormSpec            `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomSingleStoreEditorOptionsList is a list of KubedbcomSingleStoreEditorOptionss
type KubedbcomSingleStoreEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomSingleStoreEditorOptions CRD objects
	Items []KubedbcomSingleStoreEditorOptions `json:"items,omitempty"`
}