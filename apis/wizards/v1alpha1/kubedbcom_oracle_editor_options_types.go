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

// KubedbcomOracleEditorOptions defines the schama for Oracle Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomoracleeditoroptionss,singular=kubedbcomoracleeditoroptions
type KubedbcomOracleEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomOracleEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomOracleEditorOptionsSpec is the schema for Oracle profile values file
type KubedbcomOracleEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomOracleEditorOptionsSpecSpec `json:"spec"`
}

type KubedbcomOracleEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels    map[string]string `json:"labels"`
	Mode      OracleMode        `json:"mode"`
	DataGuard *DataGuardSpec    `json:"dataGuard,omitempty"`
	// +optional
	Replicas       int                `json:"replicas,omitempty"`
	Persistence    Persistence        `json:"persistence"`
	PodResources   PodResources       `json:"podResources"`
	AuthSecret     AuthSecret         `json:"authSecret"`
	DeletionPolicy DeletionPolicy     `json:"deletionPolicy"`
	Configuration  string             `json:"configuration"`
	Admin          AdminOptions       `json:"admin"`
	Backup         BackupToolSpec     `json:"backup"`
	Monitoring     MonitoringOperator `json:"monitoring"`
	// +optional
	Openshift Openshift `json:"openshift"`
}

// +kubebuilder:validation:Enum=Standalone;DataGuard
type OracleMode string

const (
	OracleModeStandalone OracleMode = "Standalone"
	OracleModeDataGuard  OracleMode = "DataGuard"
)

type DataGuardSpec struct {
	ProtectionMode    ProtectionMode  `json:"protectionMode,omitempty"`
	SyncMode          SyncMode        `json:"syncMode,omitempty"`
	StandbyType       StandbyType     `json:"standbyType,omitempty"`
	ApplyLagThreshold *int32          `json:"applyLagThreshold,omitempty"`
	Observer          *OracleObserver `json:"observer,omitempty"`
}

// +kubebuilder:validation:Enum=MaximumAvailability;MaximumPerformance;MaximumProtection
type ProtectionMode string

const (
	// ProtectionModeMaximumAvailability provides high availability with possible trade-offs in performance.
	ProtectionModeMaximumAvailability ProtectionMode = "MaximumAvailability"

	// ProtectionModeMaximumPerformance optimizes for speed with reduced redundancy.
	ProtectionModeMaximumPerformance ProtectionMode = "MaximumPerformance"

	// ProtectionModeMaximumProtection ensures maximum data durability at the cost of performance.
	ProtectionModeMaximumProtection ProtectionMode = "MaximumProtection"
)

// +kubebuilder:validation:Enum=SYNC;ASYNC
type SyncMode string

const (
	// SyncModeSync indicates synchronous replication (strong consistency).
	SyncModeSync SyncMode = "SYNC"

	// SyncModeAsync indicates asynchronous replication (eventual consistency).
	SyncModeAsync SyncMode = "ASYNC"
)

// +kubebuilder:validation:Enum=PHYSICAL;LOGICAL
type StandbyType string

const (
	// StandbyTypePhysical indicates a physical standby (block-level replication).
	StandbyTypePhysical StandbyType = "PHYSICAL"

	// StandbyTypeLogical indicates a logical standby (SQL-level replication).
	StandbyTypeLogical StandbyType = "LOGICAL"
)

type OracleObserver struct {
	Persistence  Persistence  `json:"persistence"`
	PodResources PodResources `json:"podResources"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomOracleEditorOptionsList is a list of KubedbcomOracleEditorOptionss
type KubedbcomOracleEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomOracleEditorOptions CRD objects
	Items []KubedbcomOracleEditorOptions `json:"items,omitempty"`
}
