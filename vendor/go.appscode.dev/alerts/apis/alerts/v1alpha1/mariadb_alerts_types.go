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
	ResourceKindMariadbAlerts = "MariadbAlerts"
	ResourceMariadbAlerts     = "mariadbalerts"
	ResourceMariadbAlertss    = "mariadbalertss"
)

// MariadbAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=mariadbalertss,singular=mariadbalerts,categories={kubedb,appscode}
type MariadbAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              MariadbAlertsSpec `json:"spec,omitempty"`
}

// MariadbAlertsSpec is the schema for kubedb-autoscaler chart values file
type MariadbAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         MariadbAlertsSpecForm `json:"form"`
}

type MariadbAlertsSpecForm struct {
	Alert MariaDBAlert `json:"alert"`
}

type MariaDBAlert struct {
	Enabled SeverityFlag      `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string  `json:"additionalRuleLabels"`
	Groups               MariaDBAlertGroups `json:"groups"`
}

type MariaDBAlertGroups struct {
	Database      MariaDBDatabaseAlert `json:"database"`
	Cluster       MariaDBClusterAlert  `json:"cluster"`
	Provisioner   ProvisionerAlert     `json:"provisioner"`
	OpsManager    OpsManagerAlert      `json:"opsManager"`
	Stash         StashAlert           `json:"stash"`
	SchemaManager SchemaManagerAlert   `json:"schemaManager"`
}

type MariaDBDatabaseAlert struct {
	Enabled SeverityFlag              `json:"enabled"`
	Rules   MariaDBDatabaseAlertRules `json:"rules"`
}

type MariaDBDatabaseAlertRules struct {
	MySQLInstanceDown       FixedAlert  `json:"mysqlInstanceDown"`
	MySQLServiceDown        FixedAlert  `json:"mysqlServiceDown"`
	MySQLTooManyConnections IntValAlert `json:"mysqlTooManyConnections"`
	MySQLHighThreadsRunning IntValAlert `json:"mysqlHighThreadsRunning"`
	MySQLSlowQueries        FixedAlert  `json:"mysqlSlowQueries"`
	MySQLInnoDBLogWaits     IntValAlert `json:"mysqlInnoDBLogWaits"`
	MySQLRestarted          IntValAlert `json:"mysqlRestarted"`
	MySQLHighQPS            IntValAlert `json:"mysqlHighQPS"`
	MySQLHighIncomingBytes  IntValAlert `json:"mysqlHighIncomingBytes"`
	MySQLHighOutgoingBytes  IntValAlert `json:"mysqlHighOutgoingBytes"`
	MySQLTooManyOpenFiles   IntValAlert `json:"mysqlTooManyOpenFiles"`
}

type MariaDBClusterAlert struct {
	Enabled SeverityFlag             `json:"enabled"`
	Rules   MariaDBClusterAlertRules `json:"rules"`
}

type MariaDBClusterAlertRules struct {
	GaleraReplicationLatencyTooLong FloatValAlertConfig `json:"galeraReplicationLatencyTooLong"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// MariadbAlertsList is a list of MariadbAlertss
type MariadbAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of MariadbAlerts CRD objects
	Items []MariadbAlerts `json:"items,omitempty"`
}
