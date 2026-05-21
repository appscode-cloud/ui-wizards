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
	ResourceKindIgniteAlerts = "IgniteAlerts"
	ResourceIgniteAlerts     = "ignitealerts"
	ResourceIgniteAlertss    = "ignitealertss"
)

// IgniteAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=ignitealertss,singular=ignitealerts,categories={kubedb,appscode}
type IgniteAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              IgniteAlertsSpec `json:"spec,omitempty"`
}

// IgniteAlertsSpec is the schema for kubedb-autoscaler chart values file
type IgniteAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         IgniteAlertsSpecForm `json:"form"`
	Grafana      Grafana              `json:"grafana"`
}

type IgniteAlertsSpecForm struct {
	Alert IgniteAlert `json:"alert"`
}

type IgniteAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               IgniteAlertGroups `json:"groups"`
}

type IgniteAlertGroups struct {
	Database    IgniteDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert    `json:"provisioner"`
	OpsManager  OpsManagerAlert     `json:"opsManager"`
}

type IgniteDatabaseAlert struct {
	Enabled mona.SeverityFlag        `json:"enabled"`
	Rules   IgniteDatabaseAlertRules `json:"rules"`
}

type IgniteDatabaseAlertRules struct {
	IgniteDown                      FixedAlert  `json:"igniteDown"`
	IgnitePhaseCritical             FixedAlert  `json:"ignitePhaseCritical"`
	IgniteClusterNoBaselineNode     FixedAlert  `json:"igniteClusterNoBaselineNode"`
	IgniteRestarted                 IntValAlert `json:"igniteRestarted"`
	IgniteHighCPULoad               FixedAlert  `json:"igniteHighCPULoad"`
	IgniteHighHeapMemoryUsed        FixedAlert  `json:"igniteHighHeapMemoryUsed"`
	IgniteHighDataregionOffHeapUsed FixedAlert  `json:"igniteHighDataregionOffHeapUsed"`
	IgniteJVMPausesTotalDuration    FixedAlert  `json:"igniteJVMPausesTotalDuration"`
	DiskUsageHigh                   IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                  IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// IgniteAlertsList is a list of IgniteAlertss
type IgniteAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of IgniteAlerts CRD objects
	Items []IgniteAlerts `json:"items,omitempty"`
}
