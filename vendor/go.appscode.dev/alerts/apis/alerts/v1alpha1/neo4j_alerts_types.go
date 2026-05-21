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
	ResourceKindNeo4jAlerts = "Neo4jAlerts"
	ResourceNeo4jAlerts     = "neo4jalerts"
	ResourceNeo4jAlertss    = "neo4jalertss"
)

// Neo4jAlerts defines the schema for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=neo4jalertss,singular=neo4jalerts,categories={kubedb,appscode}
type Neo4jAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              Neo4jAlertsSpec `json:"spec,omitempty"`
}

// Neo4jAlertsSpec is the schema for kubedb-autoscaler chart values file
type Neo4jAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         Neo4jAlertsSpecForm `json:"form"`
	Grafana      Grafana             `json:"grafana"`
}

type Neo4jAlertsSpecForm struct {
	Alert Neo4jAlert `json:"alert"`
}

type Neo4jAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               Neo4jAlertGroups  `json:"groups"`
}

type Neo4jAlertGroups struct {
	Database    Neo4jDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert   `json:"provisioner"`
}

type Neo4jDatabaseAlert struct {
	Enabled mona.SeverityFlag       `json:"enabled"`
	Rules   Neo4jDatabaseAlertRules `json:"rules"`
}

type Neo4jDatabaseAlertRules struct {
	Neo4jHighCPUUsage             IntValAlert `json:"neo4jHighCPUUsage"`
	Neo4jHighMemoryUsage          IntValAlert `json:"neo4jHighMemoryUsage"`
	Neo4jPageCacheUsageRatioHigh  IntValAlert `json:"neo4jPageCacheUsageRatioHigh"`
	Neo4jPageCacheHitRatioLow     IntValAlert `json:"neo4jPageCacheHitRatioLow"`
	Neo4jPageFaultsHigh           IntValAlert `json:"neo4jPageFaultsHigh"`
	Neo4jPageEvictionsHigh        IntValAlert `json:"neo4jPageEvictionsHigh"`
	Neo4jCooperativeEvictionsHigh IntValAlert `json:"neo4jCooperativeEvictionsHigh"`
	Neo4jPageFaultFailuresHigh    IntValAlert `json:"neo4jPageFaultFailuresHigh"`
	DiskUsageHigh                 IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// Neo4jAlertsList is a list of Neo4jAlertss
type Neo4jAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of Neo4jAlerts CRD objects
	Items []Neo4jAlerts `json:"items,omitempty"`
}
