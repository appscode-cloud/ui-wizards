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
	ResourceKindDruidAlerts = "DruidAlerts"
	ResourceDruidAlerts     = "druidalerts"
	ResourceDruidAlertss    = "druidalertss"
)

// DruidAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=druidalertss,singular=druidalerts,categories={kubedb,appscode}
type DruidAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              DruidAlertsSpec `json:"spec,omitempty"`
}

// DruidAlertsSpec is the schema for kubedb-autoscaler chart values file
type DruidAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         DruidAlertsSpecForm `json:"form"`
	Grafana      Grafana             `json:"grafana"`
}

type DruidAlertsSpecForm struct {
	Alert DruidAlert `json:"alert"`
}

type DruidAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               DruidAlertGroups  `json:"groups"`
}

type DruidAlertGroups struct {
	Database    DruidDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert   `json:"provisioner"`
	OpsManager  OpsManagerAlert    `json:"opsManager"`
}

type DruidDatabaseAlert struct {
	Enabled mona.SeverityFlag       `json:"enabled"`
	Rules   DruidDatabaseAlertRules `json:"rules"`
}

type DruidDatabaseAlertRules struct {
	DruidDown              FixedAlert          `json:"druidDown"`
	ZKDisconnected         FixedAlert          `json:"zkDisconnected"`
	HighQueryTime          FixedAlert          `json:"highQueryTime"`
	HighQueryWaitTime      FixedAlert          `json:"highQueryWaitTime"`
	HighSegmentScanPending IntValAlert         `json:"highSegmentScanPending"`
	HighSegmentUsage       FloatValAlertConfig `json:"highSegmentUsage"`
	HighJVMPoolUsage       FloatValAlertConfig `json:"highJVMPoolUsage"`
	HighJVMMemoryUsage     FloatValAlertConfig `json:"highJVMMemoryUsage"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// DruidAlertsList is a list of DruidAlertss
type DruidAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of DruidAlerts CRD objects
	Items []DruidAlerts `json:"items,omitempty"`
}
