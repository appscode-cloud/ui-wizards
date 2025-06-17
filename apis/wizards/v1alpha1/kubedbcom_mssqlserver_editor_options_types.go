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

// KubedbcomMssqlserverEditorOptions defines the schama for Mssqlserver Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcommssqlservereditoroptionss,singular=kubedbcommssqlservereditoroptions
type KubedbcomMssqlserverEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomMssqlserverEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomMssqlserverEditorOptionsSpec is the schema for Mssqlserver profile values file
type KubedbcomMssqlserverEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomMssqlserverEditorOptionsSpecSpec `json:"spec"`
	Form         MssqlserverAlertsSpecForm                 `json:"form"`
}

type KubedbcomMssqlserverEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels         map[string]string   `json:"labels"`
	Mode           DoubleMode          `json:"mode"`
	Replicas       int                 `json:"replicas"`
	AcceptEULA     bool                `json:"acceptEULA"`
	PID            MSSQLServerPID      `json:"pid"`
	Topology       MSSQLServerTopology `json:"topology"`
	Persistence    Persistence         `json:"persistence"`
	PodResources   PodResources        `json:"podResources"`
	AuthSecret     AuthSecret          `json:"authSecret"`
	DeletionPolicy DeletionPolicy      `json:"deletionPolicy"`
	Configuration  string              `json:"configuration"`
	// +optional
	ArchiverName string             `json:"archiverName"`
	Init         InitDatabase       `json:"init"`
	Admin        AdminOptions       `json:"admin"`
	Backup       BackupToolSpec     `json:"backup"`
	Monitoring   MonitoringOperator `json:"monitoring"`
	// +optional
	Openshift Openshift `json:"openshift"`
}

type MSSQLServerTopology struct {
	AvailabilityGroup *MSSQLServerAGSpec `json:"availabilityGroup"`
}

// +kubebuilder:validation:Enum=Developer;Express;Standard;Enterprise;EnterpriseCore;Custom
type MSSQLServerPID string

type MSSQLServerAGSpec struct {
	// +optional
	Databases []string `json:"databases"`
}

type MssqlserverAlertsSpecForm struct {
	Alert alerts.PostgresAlert `json:"alert"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomMssqlserverEditorOptionsList is a list of KubedbcomMssqlserverEditorOptionss
type KubedbcomMssqlserverEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomMssqlserverEditorOptions CRD objects
	Items []KubedbcomMssqlserverEditorOptions `json:"items,omitempty"`
}
