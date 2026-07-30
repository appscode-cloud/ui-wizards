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
	ResourceKindClickhouseAlerts = "ClickhouseAlerts"
	ResourceClickhouseAlerts     = "clickhousealerts"
	ResourceClickhouseAlertss    = "clickhousealertss"
)

// ClickhouseAlerts defines the schema for ClickHouse Alerting Rules

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=clickhousealertss,singular=clickhousealerts,categories={kubedb,appscode}
type ClickhouseAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              ClickhouseAlertsSpec `json:"spec,omitempty"`
}

// ClickhouseAlertsSpec is the schema for ClickHouse alerts chart values file
type ClickhouseAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         ClickhouseAlertsSpecForm `json:"form"`
	Grafana      Grafana                  `json:"grafana"`
}

type ClickhouseAlertsSpecForm struct {
	Alert ClickhouseAlert `json:"alert"`
}

type ClickhouseAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	// +optional
	AppSuffix string                `json:"appSuffix"`
	Groups    ClickhouseAlertGroups `json:"groups"`
}

type ClickhouseAlertGroups struct {
	Database    ClickhouseDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert        `json:"provisioner"`
	OpsManager  OpsManagerAlert         `json:"opsManager"`
	KubeStash   KubeStashAlert          `json:"kubeStash"`
}

type ClickhouseDatabaseAlert struct {
	Enabled mona.SeverityFlag            `json:"enabled"`
	Rules   ClickhouseDatabaseAlertRules `json:"rules"`
}

type ClickhouseDatabaseAlertRules struct {
	ClickhouseInstanceDown               FixedAlert  `json:"clickhouseInstanceDown"`
	ClickhouseTooManyConnections         IntValAlert `json:"clickhouseTooManyConnections"`
	ClickhouseTooManyActiveQueries       IntValAlert `json:"clickhouseTooManyActiveQueries"`
	ClickhouseReplicationPartFetchFailed FixedAlert  `json:"clickhouseReplicationPartFetchFailed"`
	ClickhouseBrokenPartsDetected        FixedAlert  `json:"clickhouseBrokenPartsDetected"`
	ClickhouseDataPartCorrupted          FixedAlert  `json:"clickhouseDataPartCorrupted"`
	DiskUsageHigh                        IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                       IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ClickhouseAlertsList is a list of ClickhouseAlertss
type ClickhouseAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of ClickhouseAlerts CRD objects
	Items []ClickhouseAlerts `json:"items,omitempty"`
}
