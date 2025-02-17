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
	ResourceKindPgpoolAlerts = "PgpoolAlerts"
	ResourcePgpoolAlerts     = "pgpoolalerts"
	ResourcePgpoolAlertss    = "pgpoolalertss"
)

// PgpoolAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=pgpoolalertss,singular=pgpoolalerts,categories={kubedb,appscode}
type PgpoolAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              PgpoolAlertsSpec `json:"spec,omitempty"`
}

// PgpoolAlertsSpec is the schema for kubedb-autoscaler chart values file
type PgpoolAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         PgpoolAlertsSpecForm `json:"form"`
	Grafana      Grafana              `json:"grafana"`
}
type PgpoolAlertsSpecForm struct {
	Alert PgpoolAlert `json:"alert"`
}

type PgpoolAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               PgpoolAlertGroups `json:"groups"`
}

type PgpoolAlertGroups struct {
	Database    PgpoolDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert    `json:"provisioner"`
	OpsManager  OpsManagerAlert     `json:"opsManager"`
}

type PgpoolDatabaseAlert struct {
	Enabled mona.SeverityFlag        `json:"enabled"`
	Rules   PgpoolDatabaseAlertRules `json:"rules"`
}

type PgpoolDatabaseAlertRules struct {
	PgpoolTooManyConnections         FloatValAlertConfig `json:"pgpoolTooManyConnections"`
	PgpoolExporterLastScrapeError    FixedAlert          `json:"pgpoolExporterLastScrapeError"`
	PgpoolDown                       FixedAlert          `json:"pgpoolDown"`
	PgpoolPostgresHealthCheckFailure IntValAlert         `json:"pgpoolPostgresHealthCheckFailure"`
	PgpoolBackendPanicMessageCount   IntValAlert         `json:"pgpoolBackendPanicMessageCount"`
	PgpoolBackendFatalMessageCount   IntValAlert         `json:"pgpoolBackendFatalMessageCount"`
	PgpoolBackendErrorMessageCount   IntValAlert         `json:"pgpoolBackendErrorMessageCount"`
	PgpoolLowCacheMemory             FloatValAlertConfig `json:"pgpoolLowCacheMemory"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// PgpoolAlertsList is a list of PgpoolAlertss
type PgpoolAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of PgpoolAlerts CRD objects
	Items []PgpoolAlerts `json:"items,omitempty"`
}
