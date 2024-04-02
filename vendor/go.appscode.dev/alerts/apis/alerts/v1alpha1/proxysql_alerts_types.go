/*
Copyright AppsCode Inc. and Contributors

Licensed under the AppsCode Community License 1.0.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://github.com/appscode/licenses/raw/1.0.0/AppsCode-Community-1.0.0.md

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

const (
	ResourceKindProxysqlAlerts = "ProxysqlAlerts"
	ResourceProxysqlAlerts     = "proxysqlalerts"
	ResourceProxysqlAlertss    = "proxysqlalertss"
)

// ProxysqlAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=proxysqlalertss,singular=proxysqlalerts,categories={kubedb,appscode}
type ProxysqlAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              ProxysqlAlertsSpec `json:"spec,omitempty"`
}

// ProxysqlAlertsSpec is the schema for kubedb-autoscaler chart values file
type ProxysqlAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         ProxysqlAlertsSpecForm `json:"form"`
}

type ProxysqlAlertsSpecForm struct {
	Alert ProxySQLAlert `json:"alert"`
}

type ProxySQLAlert struct {
	Enabled SeverityFlag      `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string   `json:"additionalRuleLabels"`
	Groups               ProxySQLAlertGroups `json:"groups"`
}

type ProxySQLAlertGroups struct {
	Database    ProxySQLDatabaseAlert `json:"database"`
	Cluster     ProxySQLClusterAlert  `json:"cluster"`
	Provisioner ProvisionerAlert      `json:"provisioner"`
	OpsManager  OpsManagerAlert       `json:"opsManager"`
}

type ProxySQLDatabaseAlert struct {
	Enabled SeverityFlag               `json:"enabled"`
	Rules   ProxySQLDatabaseAlertRules `json:"rules"`
}

type ProxySQLDatabaseAlertRules struct {
	ProxySQLInstanceDown       FixedAlert  `json:"proxysqlInstanceDown"`
	ProxySQLServiceDown        FixedAlert  `json:"proxysqlServiceDown"`
	ProxySQLTooManyConnections IntValAlert `json:"proxysqlTooManyConnections"`
	ProxySQLHighThreadsRunning IntValAlert `json:"proxysqlHighThreadsRunning"`
	ProxySQLSlowQueries        FixedAlert  `json:"proxysqlSlowQueries"`
	ProxySQLRestarted          IntValAlert `json:"proxysqlRestarted"`
	ProxySQLHighQPS            IntValAlert `json:"proxysqlHighQPS"`
	ProxySQLHighIncomingBytes  IntValAlert `json:"proxysqlHighIncomingBytes"`
	ProxySQLHighOutgoingBytes  IntValAlert `json:"proxysqlHighOutgoingBytes"`
}

type ProxySQLClusterAlert struct {
	Enabled SeverityFlag              `json:"enabled"`
	Rules   ProxySQLClusterAlertRules `json:"rules"`
}

type ProxySQLClusterAlertRules struct {
	ProxysqlClusterSyncFailure FloatValAlertConfig `json:"proxysqlClusterSyncFailure"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ProxysqlAlertsList is a list of ProxysqlAlertss
type ProxysqlAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of ProxysqlAlerts CRD objects
	Items []ProxysqlAlerts `json:"items,omitempty"`
}
