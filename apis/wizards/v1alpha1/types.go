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
)

// +kubebuilder:validation:Enum=db.t.micro;db.t.small;db.t.medium;db.t.large;db.t.xlarge;db.t.2xlarge;db.m.small;db.m.large;db.m.xlarge;db.m.2xlarge;db.m.4xlarge;db.m.8xlarge;db.m.12xlarge;db.m.16xlarge;db.m.24xlarge;db.r.large;db.r.xlarge;db.r.2xlarge;db.r.4xlarge;db.r.8xlarge;db.r.12xlarge;db.r.16xlarge;db.r.24xlarge
type MachineType string

// +kubebuilder:validation:Enum=Halt;Delete;WipeOut;DoNotTerminate
type DeletionPolicy string

type Persistence struct {
	Size string `json:"size"`
}

type PodResources struct {
	Machine   MachineType               `json:"machine"`
	Resources core.ResourceRequirements `json:"resources"`
}

type StorageClass struct {
	Name string `json:"name"`
}

type InitDatabase struct {
	Archiver Archiver `json:"archiver"`
}

type Archiver struct {
	RecoveryTimestamp  metav1.Time     `json:"recoveryTimestamp"`
	EncryptionSecret   ObjectReference `json:"encryptionSecret"`
	FullDBRepository   ObjectReference `json:"fullDBRepository"`
	ManifestRepository ObjectReference `json:"manifestRepository"`
}

// +kubebuilder:validation:Enum=Standalone;Replicaset
type GeneralMode string

type AuthSecret struct {
	// +optional
	Name string `json:"name"`
	// +optional
	// +kubebuilder:validation:Format:=password
	Password string `json:"password"`
}

type Openshift struct {
	// +optional
	SecurityContext SecurityContext `json:"securityContext"`
}

type SecurityContext struct {
	// +optional
	RunAsUser *int64 `json:"runAsUser"`
}

// ObjectReference contains enough information to let you inspect or modify the referred object.
type ObjectReference struct {
	Namespace string `json:"namespace"`
	Name      string `json:"name"`
}

type OptionalResource struct {
	// +optional
	Create bool `json:"create"`
}
