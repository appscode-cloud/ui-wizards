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
	api "kubepack.dev/lib-app/api/v1alpha1"
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
	Form         KubedbcomMysqlEditorOptionsSpecForm `json:"form"`
}

type KubedbcomMysqlEditorOptionsSpecSpec struct {
	Version string `json:"version"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	Mode   MysqlMode         `json:"mode"`
	// +optional
	Replicas int `json:"replicas,omitempty"`
	// +optional
	InnoDBCluster     MySQLInnoDBCluster        `json:"innoDBCluster,omitempty"`
	TerminationPolicy TerminationPolicy         `json:"terminationPolicy"`
	StorageClass      StorageClass              `json:"storageClass"`
	Persistence       Persistence               `json:"persistence"`
	Machine           MachineType               `json:"machine"`
	Resources         core.ResourceRequirements `json:"resources"`
	AuthSecret        AuthSecret                `json:"authSecret"`
	Monitoring        Monitoring                `json:"monitoring"`
}

type KubedbcomMysqlEditorOptionsSpecForm struct {
	Alert MySQLAlert `json:"alert"`
}

type MySQLInnoDBCluster struct {
	Router MySQLRouter `json:"router"`
}

type MySQLRouter struct {
	Replicas int `json:"replicas"`
}

// *** Alerts *** //

type MySQLAlert struct {
	Enabled bool              `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               MySQLAlertGroups  `json:"groups"`
}

type MySQLAlertGroups struct {
	Database      MySQLDatabaseAlert `json:"database"`
	Group         MySQLGroupAlert    `json:"group"`
	Provisioner   ProvisionerAlert   `json:"provisioner"`
	OpsManager    OpsManagerAlert    `json:"opsManager"`
	Stash         StashAlert         `json:"stash"`
	SchemaManager SchemaManagerAlert `json:"schemaManager"`
}

type MySQLDatabaseAlert struct {
	Enabled bool                    `json:"enabled"`
	Rules   MySQLDatabaseAlertRules `json:"rules"`
}

type MySQLDatabaseAlertRules struct {
	MySQLInstanceDown       FixedAlert  `json:"mySQLInstanceDown"`
	MySQLServiceDown        FixedAlert  `json:"mySQLServiceDown"`
	MySQLTooManyConnections IntValAlert `json:"mySQLTooManyConnections"`
	MySQLHighThreadsRunning IntValAlert `json:"mySQLHighThreadsRunning"`
	MySQLSlowQueries        FixedAlert  `json:"mySQLSlowQueries"`
	MySQLInnoDBLogWaits     IntValAlert `json:"mySQLInnoDBLogWaits"`
	MySQLRestarted          IntValAlert `json:"mySQLRestarted"`
	MySQLHighQPS            IntValAlert `json:"mySQLHighQPS"`
	MySQLHighIncomingBytes  IntValAlert `json:"mySQLHighIncomingBytes"`
	MySQLHighOutgoingBytes  IntValAlert `json:"mySQLHighOutgoingBytes"`
	MySQLTooManyOpenFiles   IntValAlert `json:"mySQLTooManyOpenFiles"`
}

type MySQLGroupAlert struct {
	Enabled bool                 `json:"enabled"`
	Rules   MySQLGroupAlertRules `json:"rules"`
}

type MySQLGroupAlertRules struct {
	MySQLHighReplicationDelay           FloatValAlertConfig `json:"mySQLHighReplicationDelay"`
	MySQLHighReplicationTransportTime   FloatValAlertConfig `json:"mySQLHighReplicationTransportTime"`
	MySQLHighReplicationApplyTime       FloatValAlertConfig `json:"mySQLHighReplicationApplyTime"`
	MySQLReplicationHighTransactionTime FloatValAlertConfig `json:"mySQLReplicationHighTransactionTime"`
}

// *** Alerts *** //

// +kubebuilder:validation:Enum=Standalone;GroupReplication;InnoDBCluster
type MysqlMode string

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomMysqlEditorOptionsList is a list of KubedbcomMysqlEditorOptionss
type KubedbcomMysqlEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomMysqlEditorOptions CRD objects
	Items []KubedbcomMysqlEditorOptions `json:"items,omitempty"`
}
