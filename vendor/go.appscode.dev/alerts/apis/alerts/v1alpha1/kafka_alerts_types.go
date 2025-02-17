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
	ResourceKindKafkaAlerts = "KafkaAlerts"
	ResourceKafkaAlerts     = "Kafkaalerts"
	ResourceKafkaAlertss    = "kafkaalertss"
)

// KafkaAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kafkaalertss,singular=Kafkaalerts,categories={kubedb,appscode}
type KafkaAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KafkaAlertsSpec `json:"spec,omitempty"`
}

// KafkaAlertsSpec is the schema for kubedb-autoscaler chart values file
type KafkaAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         KafkaAlertsSpecForm `json:"form"`
	Grafana      Grafana             `json:"grafana"`
}

type KafkaAlertsSpecForm struct {
	Alert KafkaAlert `json:"alert"`
}

type KafkaAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               KafkaAlertGroups  `json:"groups"`
}

type KafkaAlertGroups struct {
	Database    KafkaDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert   `json:"provisioner"`
	OpsManager  OpsManagerAlert    `json:"opsManager"`
}

type KafkaDatabaseAlert struct {
	Enabled mona.SeverityFlag       `json:"enabled"`
	Rules   KafkaDatabaseAlertRules `json:"rules"`
}

type KafkaDatabaseAlertRules struct {
	KafkaUnderReplicatedPartitions   IntValAlert `json:"kafkaUnderReplicatedPartitions"`
	KafkaAbnormalControllerState     IntValAlert `json:"kafkaAbnormalControllerState"`
	KafkaOfflinePartitions           IntValAlert `json:"kafkaOfflinePartitions"`
	KafkaUnderMinIsrPartitionCount   IntValAlert `json:"kafkaUnderMinIsrPartitionCount"`
	KafkaOfflineLogDirectoryCount    IntValAlert `json:"kafkaOfflineLogDirectoryCount"`
	KafkaISRExpandRate               IntValAlert `json:"kafkaISRExpandRate"`
	KafkaISRShrinkRate               IntValAlert `json:"kafkaISRShrinkRate"`
	KafkaBrokerCount                 IntValAlert `json:"kafkaBrokerCount"`
	KafkaNetworkProcessorIdlePercent IntValAlert `json:"kafkaNetworkProcessorIdlePercent"`
	KafkaRequestHandlerIdlePercent   IntValAlert `json:"kafkaRequestHandlerIdlePercent"`
	KafkaReplicaFetcherManagerMaxLag IntValAlert `json:"kafkaReplicaFetcherManagerMaxLag"`
	KafkaTopicCount                  IntValAlert `json:"kafkaTopicCount"`
	KafkaPhaseCritical               FixedAlert  `json:"kafkaPhaseCritical"`
	KafkaDown                        FixedAlert  `json:"kafkaDown"`
	DiskUsageHigh                    IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                   IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KafkaAlertsList is a list of KafkaAlertss
type KafkaAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KafkaAlerts CRD objects
	Items []KafkaAlerts `json:"items,omitempty"`
}
