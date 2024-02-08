/*
Copyright AppsCode Inc. and Contributors

Licensed under the AppsCode Free Trial License 1.0.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://github.com/appscode/licenses/raw/1.0.0/AppsCode-Free-Trial-1.0.0.md

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha1

import (
	stashv1alpha1 "stash.appscode.dev/apimachinery/apis/stash/v1alpha1"
)

type BackupToolSpec struct {
	// +kubebuilder:default=KubeStash
	Tool      BackupTool     `json:"tool"`
	Kubestash *KubeStashInfo `json:"kubestash,omitempty"`
	Stash     *StashInfo     `json:"stash,omitempty"`
}

// +kubebuilder:validation:Enum=KubeStash;Stash
type BackupTool string

const (
	BackupToolKubeStash BackupTool = "KubeStash"
	BackupToolStash     BackupTool = "Stash"
)

type KubeStashInfo struct {
	// Schedule specifies the schedule for invoking backup sessions
	// +optional
	Schedule         string           `json:"schedule,omitempty"`
	StorageRef       ObjectReference  `json:"storageRef"`
	RetentionPolicy  ObjectReference  `json:"retentionPolicy"`
	EncryptionSecret ObjectReference  `json:"encryptionSecret"`
	StorageSecret    OptionalResource `json:"storageSecret"`
}

// ObjectReference contains enough information to let you inspect or modify the referred object.
type ObjectReference struct {
	// Namespace of the referent.
	// More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
	Namespace string `json:"namespace"`
	// Name of the referent.
	// More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
	Name string `json:"name"`
}

type StashInfo struct {
	// Schedule specifies the schedule for invoking backup sessions
	// +optional
	Schedule string `json:"schedule,omitempty"`
	// RetentionPolicy indicates the policy to follow to clean old backup snapshots
	RetentionPolicy stashv1alpha1.RetentionPolicy `json:"retentionPolicy"`
	AuthSecret      AuthSecret                    `json:"authSecret"`
	Backend         RepositoryBackend             `json:"backend"`
}
