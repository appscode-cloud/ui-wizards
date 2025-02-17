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
	ResourceKindSolrAlerts = "SolrAlerts"
	ResourceSolrAlerts     = "solralerts"
	ResourceSolrAlertss    = "solralertss"
)

// SolrAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=solralertss,singular=solralerts,categories={kubedb,appscode}
type SolrAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              SolrAlertsSpec `json:"spec,omitempty"`
}

// SolrAlertsSpec is the schema for kubedb-autoscaler chart values file
type SolrAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         SolrAlertsSpecForm `json:"form"`
	Grafana      Grafana            `json:"grafana"`
}

type SolrAlertsSpecForm struct {
	Alert SolrAlert `json:"alert"`
}

type SolrAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               SolrAlertGroups   `json:"groups"`
}

type SolrAlertGroups struct {
	Database    SolrDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert  `json:"provisioner"`
	OpsManager  OpsManagerAlert   `json:"opsManager"`
}

type SolrDatabaseAlert struct {
	Enabled mona.SeverityFlag      `json:"enabled"`
	Rules   SolrDatabaseAlertRules `json:"rules"`
}

type SolrDatabaseAlertRules struct {
	SolrDownShards           IntValAlert `json:"solrDownShards"`
	SolrRecoveryFailedShards FixedAlert  `json:"solrRecoveryFailedShards"`
	SolrHighThreadsRunning   IntValAlert `json:"solrHighThreadRunning"`
	SolrHighPoolSize         IntValAlert `json:"solrHighPoolSize"`
	SolrHighQPS              IntValAlert `json:"solrHighQPS"`
	SolrHighHeapSize         IntValAlert `json:"solrHighHeapSize"`
	SolrHighBufferSize       IntValAlert `json:"solrHighBufferSize"`
	DiskUsageHigh            IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull           IntValAlert `json:"diskAlmostFull"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// SolrAlertsList is a list of SolrAlertss
type SolrAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of SolrAlerts CRD objects
	Items []SolrAlerts `json:"items,omitempty"`
}
