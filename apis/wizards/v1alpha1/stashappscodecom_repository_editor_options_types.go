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
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// StashappscodecomRepositoryEditorOptions defines the schama for Stash Repository Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=stashappscodecomrepositoryeditoroptionss,singular=stashappscodecomrepositoryeditoroptions
type StashappscodecomRepositoryEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              StashappscodecomRepositoryEditorOptionsSpec `json:"spec,omitempty"`
}

// StashappscodecomRepositoryEditorOptionsSpec is the schema for Stash Repository profile values file
type StashappscodecomRepositoryEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         StashappscodecomRepositoryEditorOptionsSpecSpec `json:"spec"`
}

type StashappscodecomRepositoryEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels     map[string]string `json:"labels"`
	AuthSecret AuthSecret        `json:"authSecret"`
	Backend    StashRepoBackend  `json:"backend"`
}

type StashRepoBackend struct {
	Provider string `json:"provider"`
	// +optional
	S3 S3 `json:"s3"`
	// +optional
	Azure Azure `json:"azure"`
	// +optional
	GCS GCS `json:"gcs"`
	// +optional
	Swift Swift `json:"swift"`
	// +optional
	B2 B2 `json:"b2"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// StashappscodecomRepositoryEditorOptionsList is a list of StashappscodecomRepositoryEditorOptionss
type StashappscodecomRepositoryEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of StashappscodecomRepositoryEditorOptions CRD objects
	Items []StashappscodecomRepositoryEditorOptions `json:"items,omitempty"`
}
