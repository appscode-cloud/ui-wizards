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
	ResourceKindQdrantAlerts = "QdrantAlerts"
	ResourceQdrantAlerts     = "qdrantalerts"
	ResourceQdrantAlertss    = "qdrantalertss"
)

// QdrantAlerts defines the schema for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=qdrantalertss,singular=qdrantalerts,categories={kubedb,appscode}
type QdrantAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              QdrantAlertsSpec `json:"spec,omitempty"`
}

// QdrantAlertsSpec is the schema for kubedb-autoscaler chart values file
type QdrantAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         QdrantAlertsSpecForm `json:"form"`
	Grafana      Grafana              `json:"grafana"`
}

type QdrantAlertsSpecForm struct {
	Alert QdrantAlert `json:"alert"`
}

type QdrantAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               QdrantAlertGroups `json:"groups"`
}

type QdrantAlertGroups struct {
	Database    QdrantDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert    `json:"provisioner"`
}

type QdrantDatabaseAlert struct {
	Enabled mona.SeverityFlag        `json:"enabled"`
	Rules   QdrantDatabaseAlertRules `json:"rules"`
}

type QdrantDatabaseAlertRules struct {
	QdrantInstanceDown          FixedAlert  `json:"qdrantInstanceDown"`
	QdrantPhaseCritical         FixedAlert  `json:"qdrantPhaseCritical"`
	QdrantRestarted             IntValAlert `json:"qdrantRestarted"`
	QdrantHighCPUUsage          IntValAlert `json:"qdrantHighCPUUsage"`
	QdrantHighMemoryUsage       IntValAlert `json:"qdrantHighMemoryUsage"`
	QdrantHighPendingOperations IntValAlert `json:"qdrantHighPendingOperations"`
	QdrantGrpcResponsesFailHigh IntValAlert `json:"qdrantGrpcResponsesFailHigh"`
	QdrantRestResponsesFailHigh IntValAlert `json:"qdrantRestResponsesFailHigh"`
	DiskUsageHigh               IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull              IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// QdrantAlertsList is a list of QdrantAlertss
type QdrantAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of QdrantAlerts CRD objects
	Items []QdrantAlerts `json:"items,omitempty"`
}
