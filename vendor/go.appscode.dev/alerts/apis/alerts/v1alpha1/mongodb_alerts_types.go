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
	ResourceKindMongodbAlerts = "MongodbAlerts"
	ResourceMongodbAlerts     = "mongodbalerts"
	ResourceMongodbAlertss    = "mongodbalertss"
)

// MongodbAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=mongodbalertss,singular=mongodbalerts,categories={kubedb,appscode}
type MongodbAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              MongodbAlertsSpec `json:"spec,omitempty"`
}

// MongodbAlertsSpec is the schema for kubedb-autoscaler chart values file
type MongodbAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         MongodbAlertsSpecForm `json:"form"`
	Grafana      Grafana               `json:"grafana"`
}

type MongodbAlertsSpecForm struct {
	Alert MongoDBAlert `json:"alert"`
}

type MongoDBAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string  `json:"additionalRuleLabels"`
	Groups               MongoDBAlertGroups `json:"groups"`
}

type MongoDBAlertGroups struct {
	Database      MongoDBDatabaseAlert `json:"database"`
	Provisioner   ProvisionerAlert     `json:"provisioner"`
	OpsManager    OpsManagerAlert      `json:"opsManager"`
	Stash         StashAlert           `json:"stash"`
	KubeStash     KubeStashAlert       `json:"kubeStash"`
	SchemaManager SchemaManagerAlert   `json:"schemaManager"`
}

type MongoDBDatabaseAlert struct {
	Enabled mona.SeverityFlag         `json:"enabled"`
	Rules   MongoDBDatabaseAlertRules `json:"rules"`
}

type MongoDBDatabaseAlertRules struct {
	MongodbVirtualMemoryUsage        IntValAlert `json:"mongodbVirtualMemoryUsage"`
	MongodbReplicationLag            IntValAlert `json:"mongodbReplicationLag"`
	MongodbNumberCursorsOpen         IntValAlert `json:"mongodbNumberCursorsOpen"`
	MongodbCursorsTimeouts           IntValAlert `json:"mongodbCursorsTimeouts"`
	MongodbTooManyConnections        IntValAlert `json:"mongodbTooManyConnections"`
	MongoDBPhaseCritical             FixedAlert  `json:"mongoDBPhaseCritical"`
	MongoDBDown                      FixedAlert  `json:"mongoDBDown"`
	MongodbHighLatency               IntValAlert `json:"mongodbHighLatency"`
	MongodbHighTicketUtilization     IntValAlert `json:"mongodbHighTicketUtilization"`
	MongodbRecurrentCursorTimeout    IntValAlert `json:"mongodbRecurrentCursorTimeout"`
	MongodbRecurrentMemoryPageFaults IntValAlert `json:"mongodbRecurrentMemoryPageFaults"`
	DiskUsageHigh                    IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                   IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// MongodbAlertsList is a list of MongodbAlertss
type MongodbAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of MongodbAlerts CRD objects
	Items []MongodbAlerts `json:"items,omitempty"`
}
