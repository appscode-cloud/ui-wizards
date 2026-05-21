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
	ResourceKindHanaDBAlerts = "HanaDBAlerts"
	ResourceHanaDBAlerts     = "hanadbalerts"
	ResourceHanaDBAlertss    = "hanadbalertss"
)

// HanaDBAlerts defines the schema for KubeDB Ops Manager Operator Installer.
//
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
//
// +kubebuilder:object:root=true
// +kubebuilder:resource:path=hanadbalertss,singular=hanadbalerts,categories={kubedb,appscode}
type HanaDBAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              HanadbAlertsSpec `json:"spec,omitempty"`
}

type HanadbAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         HanadbAlertsSpecForm `json:"form"`
	Grafana      Grafana              `json:"grafana"`
}

type HanadbAlertsSpecForm struct {
	Alert HanaDBAlert `json:"alert"`
}

type HanaDBAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               HanadbAlertGroups `json:"groups"`
}

type HanadbAlertGroups struct {
	Database    HanadbDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert    `json:"provisioner"`
}

type HanadbDatabaseAlert struct {
	Enabled mona.SeverityFlag        `json:"enabled"`
	Rules   HanadbDatabaseAlertRules `json:"rules"`
}

type HanadbDatabaseAlertRules struct {
	HanaDBInstanceDown         FixedAlert  `json:"hanadbInstanceDown"`
	HanaDBServiceDown          FixedAlert  `json:"hanadbServiceDown"`
	HanaDBRestarted            IntValAlert `json:"hanadbRestarted"`
	HanaDBHighCPUUsage         IntValAlert `json:"hanadbHighCPUUsage"`
	HanaDBHighMemoryUsage      IntValAlert `json:"hanadbHighMemoryUsage"`
	HanaDBReplicationNotActive FixedAlert  `json:"hanadbReplicationNotActive"`
	DiskUsageHigh              IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull             IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type HanaDBAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []HanaDBAlerts `json:"items,omitempty"`
}
