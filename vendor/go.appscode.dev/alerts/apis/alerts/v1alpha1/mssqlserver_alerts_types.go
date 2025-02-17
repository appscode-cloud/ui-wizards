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
	ResourceKindMSSQLServerAlerts = "MSSQLServerAlerts"
	ResourceMSSQLServerAlerts     = "mssqlserveralerts"
	ResourceMSSQLServerAlertss    = "mssqlserveralertss"
)

// MSSQLServerAlerts defines the schema for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=mssqlserveralertss,singular=mssqlserveralerts,categories={kubedb,appscode}
type MSSQLServerAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              MSSQLServerAlertsSpec `json:"spec,omitempty"`
}

// MSSQLServerAlertsSpec is the schema for kubedb-autoscaler chart values file
type MSSQLServerAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         MSSQLServerAlertsSpecForm `json:"form"`
	Grafana      Grafana                   `json:"grafana"`
}

type MSSQLServerAlertsSpecForm struct {
	Alert MSSQLServerAlert `json:"alert"`
}

type MSSQLServerAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string      `json:"additionalRuleLabels"`
	Groups               MSSQLServerAlertGroups `json:"groups"`
}

type MSSQLServerAlertGroups struct {
	Database    MSSQLServerDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert         `json:"provisioner"`
	OpsManager  OpsManagerAlert          `json:"opsManager"`
	KubeStash   KubeStashAlert           `json:"kubeStash"`
}

type MSSQLServerDatabaseAlert struct {
	Enabled mona.SeverityFlag             `json:"enabled"`
	Rules   MSSQLServerDatabaseAlertRules `json:"rules"`
}

type MSSQLServerDatabaseAlertRules struct {
	MSSQLServerInstanceDown FixedAlert  `json:"mssqlserverInstanceDown"`
	MSSSQLServerServiceDown FixedAlert  `json:"mssqlserverServiceDown"`
	MSSQLServerRestarted    IntValAlert `json:"mssqlserverRestarted"`
	DiskUsageHigh           IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull          IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// MSSQLServerAlertsList is a list of MSSQLServerAlertss
type MSSQLServerAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of MSSQLServerAlerts CRD objects
	Items []MSSQLServerAlerts `json:"items,omitempty"`
}
