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
	ResourceKindMilvusAlerts = "MilvusAlerts"
	ResourceMilvusAlerts     = "milvusalerts"
	ResourceMilvusAlertss    = "milvusalertss"
)

// MilvusAlerts defines the schema for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=milvusalertss,singular=milvusalerts,categories={kubedb,appscode}
type MilvusAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              MilvusAlertsSpec `json:"spec,omitempty"`
}

// MilvusAlertsSpec is the schema for kubedb-autoscaler chart values file
type MilvusAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         MilvusAlertsSpecForm `json:"form"`
	Grafana      Grafana              `json:"grafana"`
}

type MilvusAlertsSpecForm struct {
	Alert MilvusAlert `json:"alert"`
}

type MilvusAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               MilvusAlertGroups `json:"groups"`
}

type MilvusAlertGroups struct {
	Database    MilvusDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert    `json:"provisioner"`
}

type MilvusDatabaseAlert struct {
	Enabled mona.SeverityFlag        `json:"enabled"`
	Rules   MilvusDatabaseAlertRules `json:"rules"`
}

type MilvusDatabaseAlertRules struct {
	MilvusHighCPUUsage           IntValAlert `json:"milvusHighCPUUsage"`
	MilvusHighMemoryUsage        IntValAlert `json:"milvusHighMemoryUsage"`
	DiskUsageHigh                IntValAlert `json:"diskUsageHigh"`
	DiskAlmostFull               IntValAlert `json:"diskAlmostFull"`
	MilvusInstanceDown           IntValAlert `json:"milvusInstanceDown"`
	MilvusRestarted              IntValAlert `json:"milvusRestarted"`
	MilvusHighProcessMemoryUsage IntValAlert `json:"milvusHighProcessMemoryUsage"`
	MilvusGoroutinesExplosion    IntValAlert `json:"milvusGoroutinesExplosion"`
	MilvusHighThreadPressure     IntValAlert `json:"milvusHighThreadPressure"`
	MilvusHighFDsUsage           IntValAlert `json:"milvusHighFDsUsage"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// MilvusAlertsList is a list of MilvusAlertss
type MilvusAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of MilvusAlerts CRD objects
	Items []MilvusAlerts `json:"items,omitempty"`
}
