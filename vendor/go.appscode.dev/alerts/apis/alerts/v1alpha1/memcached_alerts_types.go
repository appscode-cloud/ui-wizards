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
	ResourceKindMemcachedAlerts = "MemcachedAlerts"
	ResourceMemcachedAlerts     = "memcachedalerts"
	ResourceMemcachedAlertss    = "memcachedalertss"
)

// MemcachedAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=memcachedalertss,singular=memcachedalerts,categories={kubedb,appscode}
type MemcachedAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              MemcachedAlertsSpec `json:"spec,omitempty"`
}

// MemcachedAlertsSpec is the schema for kubedb-autoscaler chart values file
type MemcachedAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         MemcachedAlertsSpecForm `json:"form"`
	Grafana      MemcachedGrafana        `json:"grafana"`
}

type MemcachedAlertsSpecForm struct {
	Alert MemcachedAlert `json:"alert"`
}

type MemcachedAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string    `json:"additionalRuleLabels"`
	Groups               MemcachedAlertGroups `json:"groups"`
}
type MemcachedAlertGroups struct {
	Database    MemcachedDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert       `json:"provisioner"`
	KubeStash   KubeStashAlert         `json:"kubeStash"`
}
type MemcachedDatabaseAlert struct {
	Enabled mona.SeverityFlag           `json:"enabled"`
	Rules   MemcachedDatabaseAlertRules `json:"rules"`
}

type MemcachedDatabaseAlertRules struct {
	MemcachedDown                 FixedAlert  `json:"memcachedDown"`
	MemcachedServiceRespawn       IntValAlert `json:"memcachedServiceRespawn"`
	MemcachedConnectionThrottled  IntValAlert `json:"memcachedConnectionThrottled"`
	MemcachedConnectionsNoneMinor FixedAlert  `json:"memcachedConnectionsNoneMinor"`
	MemcachedItemsNoneMinor       FixedAlert  `json:"memcachedItemsNoneMinor"`
	MemcachedEvictionsLimit       IntValAlert `json:"memcachedEvictionsLimit"`
}

type MemcachedGrafana struct {
	Enabled bool   `json:"enabled"`
	Version string `json:"version"`
	JobName string `json:"jobName"`
	URL     string `json:"url"`
	ApiKey  string `json:"apikey"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// MemcachedAlertsList is a list of MemcachedAlertss
type MemcachedAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of MemcachedAlerts CRD objects
	Items []MemcachedAlerts `json:"items,omitempty"`
}
