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
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

const (
	ResourceKindElasticsearchAlerts = "ElasticsearchAlerts"
	ResourceElasticsearchAlerts     = "elasticsearchalerts"
	ResourceElasticsearchAlertss    = "elasticsearchalertss"
)

// ElasticsearchAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=elasticsearchalertss,singular=elasticsearchalerts,categories={kubedb,appscode}
type ElasticsearchAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              ElasticsearchAlertsSpec `json:"spec,omitempty"`
}

// ElasticsearchAlertsSpec is the schema for kubedb-autoscaler chart values file
type ElasticsearchAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         ElasticsearchAlertsSpecForm `json:"form"`
}

type ElasticsearchAlertsSpecForm struct {
	Alert ElasticsearchAlert `json:"alert"`
}

type ElasticsearchAlert struct {
	Enabled SeverityFlag      `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string        `json:"additionalRuleLabels"`
	Groups               ElasticsearchAlertGroups `json:"groups"`
}

type ElasticsearchAlertGroups struct {
	Database    ElasticsearchDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert           `json:"provisioner"`
	OpsManager  OpsManagerAlert            `json:"opsManager"`
	Stash       StashAlert                 `json:"stash"`
}

type ElasticsearchDatabaseAlert struct {
	Enabled SeverityFlag                    `json:"enabled"`
	Rules   ElasticsearchDatabaseAlertRules `json:"rules"`
}

type ElasticsearchDatabaseAlertRules struct {
	ElasticsearchHeapUsageTooHigh   IntValAlert `json:"elasticsearchHeapUsageTooHigh"`
	ElasticsearchHeapUsageWarning   IntValAlert `json:"elasticsearchHeapUsageWarning"`
	ElasticsearchDiskOutOfSpace     IntValAlert `json:"elasticsearchDiskOutOfSpace"`
	ElasticsearchDiskSpaceLow       IntValAlert `json:"elasticsearchDiskSpaceLow"`
	ElasticsearchClusterRed         FixedAlert  `json:"elasticsearchClusterRed"`
	ElasticsearchClusterYellow      FixedAlert  `json:"elasticsearchClusterYellow"`
	ElasticsearchHealthyNodes       IntValAlert `json:"elasticsearchHealthyNodes"`
	ElasticsearchHealthyDataNodes   IntValAlert `json:"elasticsearchHealthyDataNodes"`
	ElasticsearchRelocatingShards   FixedAlert  `json:"elasticsearchRelocatingShards"`
	ElasticsearchInitializingShards FixedAlert  `json:"elasticsearchInitializingShards"`
	ElasticsearchUnassignedShards   FixedAlert  `json:"elasticsearchUnassignedShards"`
	ElasticsearchPendingTasks       FixedAlert  `json:"elasticsearchPendingTasks"`
	ElasticsearchNoNewDocuments10M  FixedAlert  `json:"elasticsearchNoNewDocuments10m"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ElasticsearchAlertsList is a list of ElasticsearchAlertss
type ElasticsearchAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of ElasticsearchAlerts CRD objects
	Items []ElasticsearchAlerts `json:"items,omitempty"`
}
