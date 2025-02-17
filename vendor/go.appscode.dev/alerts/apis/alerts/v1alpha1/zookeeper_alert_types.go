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
	ResourceKindZookeeperAlerts = "ZookeeperAlerts"
	ResourceZookeeperAlerts     = "zookeeperalerts"
	ResourceZookeeperAlertss    = "zookeeperalertss"
)

// ZookeeperAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=zookeeperalertss,singular=zookeeperalerts,categories={kubedb,appscode}
type ZookeeperAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              ZookeeperAlertsSpec `json:"spec,omitempty"`
}

// ZookeeperAlertsSpec is the schema for kubedb-autoscaler chart values file
type ZookeeperAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         ZookeeperAlertsSpecForm `json:"form"`
	Grafana      Grafana                 `json:"grafana"`
}

type ZookeeperAlertsSpecForm struct {
	Alert ZookeeperAlert `json:"alert"`
}

type ZookeeperAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string    `json:"additionalRuleLabels"`
	Groups               ZookeeperAlertGroups `json:"groups"`
}

type ZookeeperAlertGroups struct {
	Database    ZookeeperDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert       `json:"provisioner"`
	OpsManager  OpsManagerAlert        `json:"opsManager"`
}

type ZookeeperDatabaseAlert struct {
	Enabled mona.SeverityFlag           `json:"enabled"`
	Rules   ZookeeperDatabaseAlertRules `json:"rules"`
}

type ZookeeperDatabaseAlertRules struct {
	ZookeeperDown                FixedAlert          `json:"zookeeperDown"`
	ZookeeperTooManyNodes        IntValAlert         `json:"zookeeperTooManyNodes"`
	ZookeeperTooBigMemory        IntValAlert         `json:"zookeeperTooBigMemory"`
	ZookeeperTooManyWatch        IntValAlert         `json:"zookeeperTooManyWatch"`
	ZookeeperTooManyConnections  IntValAlert         `json:"zookeeperTooManyConnections"`
	ZookeeperLeaderElection      FixedAlert          `json:"zookeeperLeaderElection"`
	ZookeeperTooManyOpenFiles    IntValAlert         `json:"zookeeperTooManyOpenFiles"`
	ZookeeperTooLongFsyncTime    IntValAlert         `json:"zookeeperTooLongFsyncTime"`
	ZookeeperTooLongSnapshotTime IntValAlert         `json:"zookeeperTooLongSnapshotTime"`
	ZookeeperTooHighAvgLatency   IntValAlert         `json:"zookeeperTooHighAvgLatency"`
	ZookeeperJvmMemoryFilingUp   FloatValAlertConfig `json:"zookeeperJvmMemoryFilingUp"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ZookeeperAlertsList is a list of ZookeeperAlertss
type ZookeeperAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of ZookeeperAlerts CRD objects
	Items []ZookeeperAlerts `json:"items,omitempty"`
}
