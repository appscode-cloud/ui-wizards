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

// KubedbcomMysqlEditorOptions defines the schama for MySQL Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcommysqleditoroptionss,singular=kubedbcommysqleditoroptions
type KubedbcomMysqlEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomMysqlEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomMysqlEditorOptionsSpec is the schema for MySQL profile values file
type KubedbcomMysqlEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomMysqlEditorOptionsSpecSpec `json:"spec"`
	Form         MysqlAlertsSpecForm                 `json:"form"`
}

type KubedbcomMysqlEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	Mode   MysqlMode         `json:"mode"`
	// +optional
	Replicas int `json:"replicas,omitempty"`
	// +optional
	InnoDBCluster  MySQLInnoDBCluster `json:"innoDBCluster,omitempty"`
	Persistence    Persistence        `json:"persistence"`
	PodResources   PodResources       `json:"podResources"`
	AuthSecret     AuthSecret         `json:"authSecret"`
	DeletionPolicy DeletionPolicy     `json:"deletionPolicy"`
	Configuration  string             `json:"configuration"`
	// +optional
	ArchiverName string             `json:"archiverName"`
	Init         InitDatabase       `json:"init"`
	Admin        AdminOptions       `json:"admin"`
	Backup       BackupToolSpec     `json:"backup"`
	Monitoring   MonitoringOperator `json:"monitoring"`
	// +optional
	Openshift Openshift `json:"openshift"`
}

type MySQLInnoDBCluster struct {
	Router MySQLRouter `json:"router"`
}

type MySQLRouter struct {
	Replicas int `json:"replicas"`
}

// +kubebuilder:validation:Enum=Standalone;GroupReplication;InnoDBCluster
type MysqlMode string

type MysqlAlertsSpecForm struct {
	Alert alerts.MySQLAlert `json:"alert"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomMysqlEditorOptionsList is a list of KubedbcomMysqlEditorOptionss
type KubedbcomMysqlEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomMysqlEditorOptions CRD objects
	Items []KubedbcomMysqlEditorOptions `json:"items,omitempty"`
}
