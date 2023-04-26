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
	ofst "kmodules.xyz/offshoot-api/api/v1"
	stashv1beta1 "stash.appscode.dev/apimachinery/apis/stash/v1beta1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// StashappscodecomRestoreSessionEditorOptions defines the schama for Stash RestoreSession Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=stashappscodecomrestoresessioneditoroptionss,singular=stashappscodecomrestoresessioneditoroptions
type StashappscodecomRestoreSessionEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              StashappscodecomRestoresessionEditorOptionsSpec `json:"spec,omitempty"`
}

// StashappscodecomRestoresessionEditorOptionsSpec is the schema for Stash RestoreSession profile values file
type StashappscodecomRestoresessionEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         StashappscodecomRestoresessionEditorOptionsSpecSpec `json:"spec"`
}

type StashappscodecomRestoresessionEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	// InterimVolumeTemplate specifies a template for a volume to hold targeted data temporarily
	// before uploading to backend or inserting into target. It is only usable for job model.
	// Don't specify it in sidecar model.
	// +optional
	InterimVolumeTemplate *ofst.PersistentVolumeClaim `json:"interimVolumeTemplate,omitempty"`
	// Repository refer to the Repository crd that hold backend information
	Repository kmapi.ObjectReference `json:"repository"`
	// RuntimeSettings allow to specify Resources, NodeSelector, Affinity, Toleration, ReadinessProbe etc.
	// +optional
	RuntimeSettings ofst.RuntimeSettings `json:"runtimeSettings,omitempty"`
	Snapshot        string               `json:"snapshot"`
	// Target indicates the target where the recovered data will be stored
	Target stashv1beta1.TargetRef `json:"target"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// StashappscodecomRestoreSessionEditorOptionsList is a list of StashappscodecomRestoreSessionEditorOptionss
type StashappscodecomRestoreSessionEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of StashappscodecomRestoreSessionEditorOptions CRD objects
	Items []StashappscodecomRestoreSessionEditorOptions `json:"items,omitempty"`
}
