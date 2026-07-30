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
	ResourceKindWeaviateAlerts = "WeaviateAlerts"
	ResourceWeaviateAlerts     = "weaviatealerts"
	ResourceWeaviateAlertss    = "weaviatealertss"
)

// WeaviateAlerts defines the schema for Weaviate Alerting Rules

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=weaviatealertss,singular=weaviatealerts,categories={kubedb,appscode}
type WeaviateAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              WeaviateAlertsSpec `json:"spec,omitempty"`
}

// WeaviateAlertsSpec is the schema for Weaviate alerts chart values file
type WeaviateAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         WeaviateAlertsSpecForm `json:"form"`
	Grafana      Grafana                `json:"grafana"`
}

type WeaviateAlertsSpecForm struct {
	Alert WeaviateAlert `json:"alert"`
}

type WeaviateAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string   `json:"additionalRuleLabels"`
	Groups               WeaviateAlertGroups `json:"groups"`
}

type WeaviateAlertGroups struct {
	Database    WeaviateDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert      `json:"provisioner"`
}

type WeaviateDatabaseAlert struct {
	Enabled mona.SeverityFlag          `json:"enabled"`
	Rules   WeaviateDatabaseAlertRules `json:"rules"`
}

type WeaviateDatabaseAlertRules struct {
	WeaviateInstanceDown            FixedAlert  `json:"weaviateInstanceDown"`
	WeaviateRestarted               IntValAlert `json:"weaviateRestarted"`
	WeaviateHighCPUUsage            IntValAlert `json:"weaviateHighCPUUsage"`
	WeaviateHighMemoryUsage         IntValAlert `json:"weaviateHighMemoryUsage"`
	WeaviateHighProcessMemoryUsage  IntValAlert `json:"weaviateHighProcessMemoryUsage"`
	WeaviateGoroutinesExplosion     IntValAlert `json:"weaviateGoroutinesExplosion"`
	WeaviateHighThreadPressure      IntValAlert `json:"weaviateHighThreadPressure"`
	WeaviateHighFDsUsage            IntValAlert `json:"weaviateHighFDsUsage"`
	DiskUsageHigh                   IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull                  IntValAlert `json:"diskAlmostFull"`
	WeaviateHTTPErrorRateHigh       IntValAlert `json:"weaviateHTTPErrorRateHigh"`
	WeaviateHTTPP95LatencyHigh      IntValAlert `json:"weaviateHTTPP95LatencyHigh"`
	WeaviateGRPCErrorRateHigh       IntValAlert `json:"weaviateGRPCErrorRateHigh"`
	WeaviateGRPCP95LatencyHigh      IntValAlert `json:"weaviateGRPCP95LatencyHigh"`
	WeaviateReplicationEngineDown   FixedAlert  `json:"weaviateReplicationEngineDown"`
	WeaviateReplicationQueueHigh    IntValAlert `json:"weaviateReplicationQueueHigh"`
	WeaviateReplicationFailuresHigh IntValAlert `json:"weaviateReplicationFailuresHigh"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// WeaviateAlertsList is a list of WeaviateAlertss
type WeaviateAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of WeaviateAlerts CRD objects
	Items []WeaviateAlerts `json:"items,omitempty"`
}
