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

// CorekubestashcomBackupSessionEditorOptions defines the schama for Stash RestoreSession Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=corekubestashcombackupsessioneditoroptionss,singular=corekubestashcombackupsessioneditoroptions
type CorekubestashcomBackupSessionEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              CorekubestashcomBackupsessionEditorOptionsSpec `json:"spec,omitempty"`
}

// CorekubestashcomBackupsessionEditorOptionsSpec is the schema for Stash RestoreSession profile values file
type CorekubestashcomBackupsessionEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         CorekubestashcomBackupsessionEditorOptionsSpecSpec `json:"spec"`
}

type CorekubestashcomBackupsessionEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels   map[string]string               `json:"labels"`
	OwnerUID string                          `json:"ownerUID"`
	Invoker  *core.TypedLocalObjectReference `json:"invoker"`
	Session  string                          `json:"session"`
	// +optional
	BackupTimeout *metav1.Duration `json:"backupTimeout,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// CorekubestashcomBackupSessionEditorOptionsList is a list of CorekubestashcomBackupSessionEditorOptionss
type CorekubestashcomBackupSessionEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of CorekubestashcomBackupSessionEditorOptions CRD objects
	Items []CorekubestashcomBackupSessionEditorOptions `json:"items,omitempty"`
}
