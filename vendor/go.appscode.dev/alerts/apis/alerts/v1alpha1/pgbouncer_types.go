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
	ResourceKindPgbouncerAlerts = "PgbouncerAlerts"
	ResourcePgbouncerAlerts     = "pgbounceralerts"
	ResourcePgbouncerAlertss    = "pgbounceralertss"
)

// PgbouncerAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=pgbounceralertss,singular=pgbounceralerts,categories={kubedb,appscode}
type PgbouncerAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              PgbouncerAlertsSpec `json:"spec,omitempty"`
}

// PgbouncerAlertsSpec is the schema for kubedb-autoscaler chart values file
type PgbouncerAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         PgbouncerAlertsSpecForm `json:"form"`
	Grafana      Grafana                 `json:"grafana"`
}

type PgbouncerAlertsSpecForm struct {
	Alert PgbouncerAlert `json:"alert"`
}

type PgbouncerAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string    `json:"additionalRuleLabels"`
	Groups               PgbouncerAlertGroups `json:"groups"`
}

type PgbouncerAlertGroups struct {
	Database    PgbouncerDatabaseAlert `json:"database"`
	Provisioner ProvisionerAlert       `json:"provisioner"`
	OpsManager  OpsManagerAlert        `json:"opsManager"`
}

type PgbouncerDatabaseAlert struct {
	Enabled mona.SeverityFlag           `json:"enabled"`
	Rules   PgbouncerDatabaseAlertRules `json:"rules"`
}

type PgbouncerDatabaseAlertRules struct {
	PgbouncerTooManyConnections      IntValAlert `json:"pgbouncerTooManyConnections"`
	PgbouncerExporterLastScrapeError FixedAlert  `json:"pgbouncerExporterLastScrapeError"`
	PgbouncerDown                    FixedAlert  `json:"pgbouncerDown"`
	PgbouncerLogPoolerError          IntValAlert `json:"pgbouncerLogPoolerError"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// PgbouncerAlertsList is a list of PgbouncerAlertss
type PgbouncerAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of PgbouncerAlerts CRD objects
	Items []PgbouncerAlerts `json:"items,omitempty"`
}
