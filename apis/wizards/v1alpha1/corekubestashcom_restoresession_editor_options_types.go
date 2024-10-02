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
	kmapi "kmodules.xyz/client-go/api/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// CorekubestashcomRestoreSessionEditorOptions defines the schama for Stash RestoreSession Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=corekubestashcomrestoresessioneditoroptionss,singular=corekubestashcomrestoresessioneditoroptions
type CorekubestashcomRestoreSessionEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              CorekubestashcomRestoresessionEditorOptionsSpec `json:"spec,omitempty"`
}

// CorekubestashcomRestoresessionEditorOptionsSpec is the schema for Stash RestoreSession profile values file
type CorekubestashcomRestoresessionEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         CorekubestashcomRestoresessionEditorOptionsSpecSpec `json:"spec"`
}

type CorekubestashcomRestoresessionEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels     map[string]string `json:"labels"`
	DataSource RestoreDataSource `json:"dataSource"`
	Addon      KubeStashAddon    `json:"addon"`
	// +optional
	Target kmapi.TypedObjectReference `json:"target"`
}

type RestoreDataSource struct {
	Repository       kmapi.ObjectReference `json:"repository"`
	Snapshot         string                `json:"snapshot"`
	EncryptionSecret kmapi.ObjectReference `json:"encryptionSecret"`
}

type KubeStashAddon struct {
	Name  string    `json:"name"`
	Tasks []TaskRef `json:"tasks"`
	// +optional
	JobTemplate JobTemplate `json:"jobTemplate"`
}

type TaskRef struct {
	Name string `json:"name"`
	// +optional
	Params string `json:"params"`
}

type JobTemplate struct {
	// +optional
	SecurityContext int64 `json:"securityContext"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// CorekubestashcomRestoreSessionEditorOptionsList is a list of CorekubestashcomRestoreSessionEditorOptionss
type CorekubestashcomRestoreSessionEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of CorekubestashcomRestoreSessionEditorOptions CRD objects
	Items []CorekubestashcomRestoreSessionEditorOptions `json:"items,omitempty"`
}
