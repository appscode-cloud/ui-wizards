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
	kubestashapi "kubestash.dev/apimachinery/apis/storage/v1alpha1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// StoragekubestashcomBackupstorageEditorOptions defines the schama for Stash Repository Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=storagekubestashcombackupstorageeditoroptionss,singular=storagekubestashcombackupstorageeditoroptions
type StoragekubestashcomBackupstorageEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              StoragekubestashcomBackupstorageEditorOptionsSpec `json:"spec,omitempty"`
}

// StoragekubestashcomBackupstorageEditorOptionsSpec is the schema for Stash Repository profile values file
type StoragekubestashcomBackupstorageEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         StoragekubestashcomBackupstorageEditorOptionsSpecSpec `json:"spec"`
}

type StoragekubestashcomBackupstorageEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels          map[string]string           `json:"labels"`
	Backend         KubeStashBackend            `json:"backend"`
	DeletionPolicy  kubestashapi.DeletionPolicy `json:"deletionPolicy"`
	RuntimeSettings RuntimeSettings             `json:"runtimeSettings"`
}

type KubeStashBackend struct {
	Provider KubeStashProvider `json:"provider"`
	// +optional
	S3 S3 `json:"s3"`
	// +optional
	Azure Azure `json:"azure"`
	// +optional
	GCS GCS `json:"gcs"`
	// +optional
	Local Local `json:"local"`
}

// +kubebuilder:validation:Enum=s3;azure;gcs;local
type KubeStashProvider string

type RuntimeSettings struct {
	// +optional
	SecurityContext int64 `json:"securityContext"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// StoragekubestashcomBackupstorageEditorOptionsList is a list of StoragekubestashcomBackupstorageEditorOptionss
type StoragekubestashcomBackupstorageEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of StoragekubestashcomBackupstorageEditorOptions CRD objects
	Items []StoragekubestashcomBackupstorageEditorOptions `json:"items,omitempty"`
}
