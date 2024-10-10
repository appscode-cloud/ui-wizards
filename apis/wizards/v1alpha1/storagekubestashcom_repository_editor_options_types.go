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
	kubestashapi "kubestash.dev/apimachinery/apis/storage/v1alpha1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// StoragekubestashcomRepositoryEditorOptions defines the schama for Stash Repository Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=storagekubestashcomrepositoryeditoroptionss,singular=storagekubestashcomrepositoryeditoroptions
type StoragekubestashcomRepositoryEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              StoragekubestashcomRepositoryEditorOptionsSpec `json:"spec,omitempty"`
}

// StoragekubestashcomRepositoryEditorOptionsSpec is the schema for Stash Repository profile values file
type StoragekubestashcomRepositoryEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         StoragekubestashcomRepositoryEditorOptionsSpecSpec `json:"spec"`
}

type StoragekubestashcomRepositoryEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels           map[string]string           `json:"labels"`
	StorageRef       ObjectReference             `json:"storageRef"`
	EncryptionSecret ObjectReference             `json:"encryptionSecret"`
	DeletionPolicy   kubestashapi.DeletionPolicy `json:"deletionPolicy"`
	Path             string                      `json:"path"`
	// +optional
	AppRef kmapi.TypedObjectReference `json:"appRef"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// StoragekubestashcomRepositoryEditorOptionsList is a list of StoragekubestashcomRepositoryEditorOptionss
type StoragekubestashcomRepositoryEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of StoragekubestashcomRepositoryEditorOptions CRD objects
	Items []StoragekubestashcomRepositoryEditorOptions `json:"items,omitempty"`
}
