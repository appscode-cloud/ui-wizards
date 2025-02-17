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
	ResourceKindCassandraAlerts = "CassandraAlerts"
	ResourceCassandraAlerts     = "cassandraalerts"
	ResourceCassandraAlertss    = "cassandraalertss"
)

// CassandraAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=cassandraalertss,singular=cassandraalerts,categories={kubedb,appscode}
type CassandraAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              CassandraAlertsSpec `json:"spec,omitempty"`
}

// CassandraAlertsSpec is the schema for kubedb-autoscaler chart values file
type CassandraAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         CassandraAlertsSpecForm `json:"form"`
	Grafana      Grafana                 `json:"grafana"`
}

type CassandraAlertsSpecForm struct {
	Alert CassandraAlert `json:"alert"`
}

type CassandraAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string    `json:"additionalRuleLabels"`
	Groups               CassandraAlertGroups `json:"groups"`
}
type CassandraAlertGroups struct {
	Database    CassandraDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert       `json:"provisioner"`
}
type CassandraDatabaseAlert struct {
	Enabled mona.SeverityFlag           `json:"enabled"`
	Rules   CassandraDatabaseAlertRules `json:"rules"`
}

type CassandraDatabaseAlertRules struct {
	CassandraDown               FixedAlert  `json:"cassandraDown"`
	CassandraServiceRespawn     IntValAlert `json:"cassandraServiceRespawn"`
	CassandraConnectionTimeouts IntValAlert `json:"cassandraConnectionTimeouts"`
	CassandraDroppedMessages    IntValAlert `json:"cassandraDroppedMessages"`
	CassandraHighReadLatency    IntValAlert `json:"cassandraHighReadLatency"`
	CassandraHighWriteLatency   IntValAlert `json:"cassandraHighWriteLatency"`
	CassandraMemoryLimit        IntValAlert `json:"cassandraMemoryLimit"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// CassandraAlertsList is a list of CassandraAlertss
type CassandraAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of CassandraAlerts CRD objects
	Items []CassandraAlerts `json:"items,omitempty"`
}
