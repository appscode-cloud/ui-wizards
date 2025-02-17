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
	ResourceKindRabbitmqAlerts = "RabbitmqAlerts"
	ResourceRabbitmqAlerts     = "rabbitmqalerts"
	ResourceRabbitmqAlertss    = "rabbitmqalertss"
)

// RabbitmqAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=rabbitmqalertss,singular=rabbitmqalerts,categories={kubedb,appscode}
type RabbitmqAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              RabbitmqAlertsSpec `json:"spec,omitempty"`
}

// RabbitmqAlertsSpec is the schema for kubedb-autoscaler chart values file
type RabbitmqAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         RabbitmqAlertsSpecForm `json:"form"`
	Grafana      Grafana                `json:"grafana"`
}

type RabbitmqAlertsSpecForm struct {
	Alert RabbitmqAlert `json:"alert"`
}

type RabbitmqAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string   `json:"additionalRuleLabels"`
	Groups               RabbitmqAlertGroups `json:"groups"`
}

type RabbitmqAlertGroups struct {
	Database    RabbitmqDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert      `json:"provisioner"`
	OpsManager  OpsManagerAlert       `json:"opsManager"`
}

type RabbitmqDatabaseAlert struct {
	Enabled mona.SeverityFlag          `json:"enabled"`
	Rules   RabbitmqDatabaseAlertRules `json:"rules"`
}

type RabbitmqDatabaseAlertRules struct {
	RabbitmqFileDescriptorsNearLimit                       FixedAlert  `json:"rabbitmqFileDescriptorsNearLimit"`
	RabbitmqQueueIsGrowing                                 FixedAlert  `json:"rabbitmqQueueIsGrowing"`
	RabbitmqUnroutableMessages                             FixedAlert  `json:"rabbitmqUnroutableMessages"`
	RabbitmqTCPSocketsNearLimit                            FixedAlert  `json:"rabbitmqTCPSocketsNearLimit"`
	RabbitmqLowDiskWatermarkPredicted                      FixedAlert  `json:"rabbitmqLowDiskWatermarkPredicted"`
	RabbitmqInsufficientEstablishedErlangDistributionLinks FixedAlert  `json:"rabbitmqInsufficientEstablishedErlangDistributionLinks"`
	RabbitmqHighConnectionChurn                            FixedAlert  `json:"rabbitmqHighConnectionChurn"`
	RabbitmqPhaseCritical                                  FixedAlert  `json:"rabbitmqPhaseCritical"`
	RabbitmqDown                                           FixedAlert  `json:"rabbitmqDown"`
	DiskUsageHigh                                          IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                                         IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// RabbitmqAlertsList is a list of RabbitmqAlertss
type RabbitmqAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of RabbitmqAlerts CRD objects
	Items []RabbitmqAlerts `json:"items,omitempty"`
}
