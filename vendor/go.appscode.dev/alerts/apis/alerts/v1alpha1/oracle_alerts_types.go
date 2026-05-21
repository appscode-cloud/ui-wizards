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
	mona "kmodules.xyz/monitoring-agent-api/api/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

const (
	ResourceKindOracleAlerts = "OracleAlerts"
	ResourceOracleAlerts     = "oraclealerts"
	ResourceOracleAlertss    = "oraclealertss"
)

// OracleAlerts defines the schema for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=oraclealertss,singular=oraclealerts,categories={kubedb,appscode}
type OracleAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              OracleAlertsSpec `json:"spec,omitempty"`
}

// OracleAlertsSpec is the schema for kubedb-autoscaler chart values file
type OracleAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         OracleAlertsSpecForm `json:"form"`
	Grafana      Grafana              `json:"grafana"`
}

type OracleAlertsSpecForm struct {
	Alert OracleAlert `json:"alert"`
}

type OracleAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               OracleAlertGroups `json:"groups"`
}

type OracleAlertGroups struct {
	Database    OracleDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert    `json:"provisioner"`
	KubeStash   KubeStashAlert      `json:"kubeStash"`
}

type OracleDatabaseAlert struct {
	Enabled mona.SeverityFlag        `json:"enabled"`
	Rules   OracleDatabaseAlertRules `json:"rules"`
}

type OracleDatabaseAlertRules struct {
	OracleInstanceDown       FixedAlert  `json:"oracleInstanceDown"`
	OracleServiceDown        FixedAlert  `json:"oracleServiceDown"`
	OracleRestarted          IntValAlert `json:"oracleRestarted"`
	OracleTooManyConnections IntValAlert `json:"oracleTooManyConnections"`
	DiskUsageHigh            IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull           IntValAlert `json:"diskAlmostFull"`
}

type OracleGrafana struct {
	Enabled bool   `json:"enabled"`
	Version string `json:"version"`
	JobName string `json:"jobName"`
	URL     string `json:"url"`
	ApiKey  string `json:"apikey"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// OracleAlertsList is a list of OracleAlertss
type OracleAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of OracleAlerts CRD objects
	Items []OracleAlerts `json:"items,omitempty"`
}
