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

// CorekubestashcomBackupConfigurationEditorOptions defines the schama for Stash BackupConfiguration Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=corekubestashcombackupconfigurationeditoroptionss,singular=corekubestashcombackupconfigurationeditoroptions
type CorekubestashcomBackupConfigurationEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              CorekubestashcomBackupconfigurationEditorOptionsSpec `json:"spec,omitempty"`
}

// CorekubestashcomBackupconfigurationEditorOptionsSpec is the schema for Stash BackupConfiguration profile values file
type CorekubestashcomBackupconfigurationEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         CorekubestashcomBackupconfigurationEditorOptionsSpecSpec `json:"spec"`
}

type CorekubestashcomBackupconfigurationEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels   map[string]string `json:"labels"`
	Backend  Backend           `json:"backend"`
	Sessions []Session         `json:"sessions"`
	// +optional
	Target kmapi.TypedObjectReference `json:"target"`
}

type Backend struct {
	StorageRef      ObjectReference `json:"storageRef"`
	RetentionPolicy ObjectReference `json:"retentionPolicy"`
}

type Session struct {
	Addon            KubeStashAddon  `json:"addon"`
	SessionName      string          `json:"sessionName"`
	Schedule         string          `json:"schedule"`
	RepoName         string          `json:"repoName"`
	EncryptionSecret ObjectReference `json:"encryptionSecret"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// CorekubestashcomBackupConfigurationEditorOptionsList is a list of CorekubestashcomBackupConfigurationEditorOptionss
type CorekubestashcomBackupConfigurationEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of CorekubestashcomBackupConfigurationEditorOptions CRD objects
	Items []CorekubestashcomBackupConfigurationEditorOptions `json:"items,omitempty"`
}
