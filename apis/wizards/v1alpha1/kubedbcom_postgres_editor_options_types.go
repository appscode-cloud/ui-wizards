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
	alerts "go.appscode.dev/alerts/apis/alerts/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// KubedbcomPostgresEditorOptions defines the schama for PostgreSQL Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcompostgreseditoroptionss,singular=kubedbcompostgreseditoroptions
type KubedbcomPostgresEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomPostgresEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomPostgresEditorOptionsSpec is the schema for PostgreSQL profile values file
type KubedbcomPostgresEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomPostgresEditorOptionsSpecSpec `json:"spec"`
	Form         PostgresAlertsSpecForm                 `json:"form"`
}

type KubedbcomPostgresEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels   map[string]string `json:"labels"`
	Mode     PostgresMode      `json:"mode"`
	Replicas int               `json:"replicas"`
	// +optional
	RemoteReplica  *RemoteReplica         `json:"remoteReplica,omitempty"`
	StandbyMode    *PostgresStandbyMode   `json:"standbyMode"`
	StreamingMode  *PostgresStreamingMode `json:"streamingMode"`
	DeletionPolicy DeletionPolicy         `json:"deletionPolicy"`
	Persistence    Persistence            `json:"persistence"`
	PodResources   PodResources           `json:"podResources"`
	AuthSecret     AuthSecret             `json:"authSecret"`
	Configuration  string                 `json:"configuration"`
	// +optional
	ArchiverName string             `json:"archiverName"`
	Init         InitDatabase       `json:"init"`
	Admin        AdminOptions       `json:"admin"`
	Backup       BackupToolSpec     `json:"backup"`
	Monitoring   MonitoringOperator `json:"monitoring"`
	// +optional
	Openshift Openshift `json:"openshift"`
}

// +kubebuilder:validation:Enum=Standalone;Cluster;RemoteReplica
type PostgresMode string

// +kubebuilder:validation:Enum=Hot;Warm
type PostgresStandbyMode string

const (
	HotPostgresStandbyMode  PostgresStandbyMode = "Hot"
	WarmPostgresStandbyMode PostgresStandbyMode = "Warm"
)

// +kubebuilder:validation:Enum=Synchronous;Asynchronous
type PostgresStreamingMode string

const (
	SynchronousPostgresStreamingMode  PostgresStreamingMode = "Synchronous"
	AsynchronousPostgresStreamingMode PostgresStreamingMode = "Asynchronous"
)

type PostgresAlertsSpecForm struct {
	Alert alerts.PostgresAlert `json:"alert"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomPostgresEditorOptionsList is a list of KubedbcomPostgresEditorOptionss
type KubedbcomPostgresEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomPostgresEditorOptions CRD objects
	Items []KubedbcomPostgresEditorOptions `json:"items,omitempty"`
}
