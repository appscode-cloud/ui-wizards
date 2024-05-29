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
	ResourceKindSinglestoreAlerts = "SinglestoreAlerts"
	ResourceSinglestoreAlerts     = "singlestorealerts"
	ResourceSinglestoreAlertss    = "singlestorealertss"
)

// SinglestoreAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=singlestorealertss,singular=singlestorealerts,categories={kubedb,appscode}
type SinglestoreAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              SinglestoreAlertsSpec `json:"spec,omitempty"`
}

// SinglestoreAlertsSpec is the schema for kubedb-autoscaler chart values file
type SinglestoreAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         SinglestoreAlertsSpecForm `json:"form"`
	Grafana      SinglestoreGrafana        `json:"grafana"`
}

type SinglestoreAlertsSpecForm struct {
	Alert SinglestoreAlert `json:"alert"`
}

type SinglestoreAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string      `json:"additionalRuleLabels"`
	Groups               SinglestoreAlertGroups `json:"groups"`
}
type SinglestoreAlertGroups struct {
	Database    SinglestoreDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert         `json:"provisioner"`
	KubeStash   KubeStashAlert           `json:"kubeStash"`
}
type SinglestoreDatabaseAlert struct {
	Enabled mona.SeverityFlag             `json:"enabled"`
	Rules   SinglestoreDatabaseAlertRules `json:"rules"`
}

type SinglestoreDatabaseAlertRules struct {
	SinglestoreInstanceDown       FixedAlert  `json:"singlestoreInstanceDown"`
	SinglestoreServiceDown        FixedAlert  `json:"singlestoreServiceDown"`
	SinglestoreTooManyConnections IntValAlert `json:"singlestoreTooManyConnections"`
	SinglestoreHighThreadsRunning IntValAlert `json:"singlestoreHighThreadsRunning"`
	SinglestoreRestarted          IntValAlert `json:"singlestoreRestarted"`
	SinglestoreHighQPS            IntValAlert `json:"singlestoreHighQPS"`
	SinglestoreHighIncomingBytes  IntValAlert `json:"singlestoreHighIncomingBytes"`
	SinglestoreHighOutgoingBytes  IntValAlert `json:"singlestoreHighOutgoingBytes"`
	DiskUsageHigh                 IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                IntValAlert `json:"diskAlmostFull"`
}

type SinglestoreGrafana struct {
	Enabled bool   `json:"enabled"`
	Version string `json:"version"`
	JobName string `json:"jobName"`
	URL     string `json:"url"`
	ApiKey  string `json:"apikey"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// SinglestoreAlertsList is a list of SinglestoreAlertss
type SinglestoreAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of SinglestoreAlerts CRD objects
	Items []SinglestoreAlerts `json:"items,omitempty"`
}
