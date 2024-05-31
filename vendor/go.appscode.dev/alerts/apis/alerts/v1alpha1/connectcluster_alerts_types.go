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
	ResourceKindConnectClusterAlerts = "ConnectClusterAlerts"
	ResourceConnectClusterAlerts     = "connectclusteralerts"
	ResourceConnectClusterAlertss    = "connectclusteralertss"
)

// ConnectClusterAlerts defines the schema for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=connectclusteralertss,singular=connectclusteralerts,categories={kubedb,appscode}
type ConnectClusterAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              ConnectClusterAlertsSpec `json:"spec,omitempty"`
}

// ConnectClusterAlertsSpec is the schema for kubedb-autoscaler chart values file
type ConnectClusterAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         ConnectClusterAlertsSpecForm `json:"form"`
	Grafana      ConnectClusterGrafana        `json:"grafana"`
}

type ConnectClusterAlertsSpecForm struct {
	Alert ConnectClusterAlert `json:"alert"`
}

type ConnectClusterAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string         `json:"additionalRuleLabels"`
	Groups               ConnectClusterAlertGroups `json:"groups"`
}

type ConnectClusterAlertGroups struct {
	Connect     ConnectClusterConnectAlert `json:"connect"`
	Task        ConnectClusterTaskAlert    `json:"task"`
	Provisioner ProvisionerAlert           `json:"provisioner"`
}

type ConnectClusterConnectAlert struct {
	Enabled mona.SeverityFlag               `json:"enabled"`
	Rules   ConnectClusterConnectAlertRules `json:"rules"`
}

type ConnectClusterConnectAlertRules struct {
	ConnectClusterWorkerDown                 FixedAlert  `json:"connectClusterWorkerDown"`
	ConnectClusterTooManyConnections         IntValAlert `json:"connectClusterTooManyConnections"`
	ConnectClusterConnectorCount             IntValAlert `json:"connectClusterConnectorCount"`
	ConnectClusterCoordinatorRebalanceFailed IntValAlert `json:"connectClusterCoordinatorRebalanceFailed"`
	DiskUsageHigh                            IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                           IntValAlert `json:"diskAlmostFull"`
}

type ConnectClusterTaskAlert struct {
	Enabled mona.SeverityFlag       `json:"enabled"`
	Rules   ConnectClusterTaskRules `json:"rules"`
}

type ConnectClusterTaskRules struct {
	ConnectClusterTaskErrorTotalRetries IntValAlert `json:"connectClusterTaskErrorTotalRetries"`
	ConnectClusterTaskTotal             IntValAlert `json:"connectClusterTaskTotal"`
	ConnectClusterTaskTotalFailed       FixedAlert  `json:"connectClusterTaskTotalFailed"`
	ConnectClusterTaskTotalDestroyed    FixedAlert  `json:"connectClusterTaskTotalDestroyed"`
}

type ConnectClusterGrafana struct {
	Enabled bool   `json:"enabled"`
	Version string `json:"version"`
	JobName string `json:"jobName"`
	URL     string `json:"url"`
	ApiKey  string `json:"apikey"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ConnectClusterAlertsList is a list of ConnectClusterAlertss
type ConnectClusterAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of ConnectClusterAlerts CRD objects
	Items []ConnectClusterAlerts `json:"items,omitempty"`
}
