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
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

const (
	ResourceKindPostgresAlerts = "PostgresAlerts"
	ResourcePostgresAlerts     = "postgresalerts"
	ResourcePostgresAlertss    = "postgresalertss"
)

// PostgresAlerts defines the schama for KubeDB Ops Manager Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=postgresalertss,singular=postgresalerts,categories={kubedb,appscode}
type PostgresAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              PostgresAlertsSpec `json:"spec,omitempty"`
}

// PostgresAlertsSpec is the schema for kubedb-autoscaler chart values file
type PostgresAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         PostgresAlertsSpecForm `json:"form"`
}

type PostgresAlertsSpecForm struct {
	Alert PostgresAlert `json:"alert"`
}

type PostgresAlert struct {
	Enabled SeverityFlag      `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string   `json:"additionalRuleLabels"`
	Groups               PostgresAlertGroups `json:"groups"`
}

type PostgresAlertGroups struct {
	Database      PostgresDatabaseAlert `json:"database"`
	Provisioner   ProvisionerAlert      `json:"provisioner"`
	OpsManager    OpsManagerAlert       `json:"opsManager"`
	Stash         StashAlert            `json:"stash"`
	SchemaManager SchemaManagerAlert    `json:"schemaManager"`
}

type PostgresDatabaseAlert struct {
	Enabled SeverityFlag               `json:"enabled"`
	Rules   PostgresDatabaseAlertRules `json:"rules"`
}

type PostgresDatabaseAlertRules struct {
	PostgresInstanceDown         FixedAlert          `json:"postgresInstanceDown"`
	PostgresRestarted            IntValAlert         `json:"postgresRestarted"`
	PostgresExporterError        FixedAlert          `json:"postgresExporterError"`
	PostgresTooManyConnections   IntValAlert         `json:"postgresTooManyConnections"`
	PostgresNotEnoughConnections IntValAlert         `json:"postgresNotEnoughConnections"`
	PostgresSlowQueries          FixedAlert          `json:"postgresSlowQueries"`
	PostgresReplicationLag       StringValAlert      `json:"postgresReplicationLag"`
	PostgresHighRollbackRate     FloatValAlertConfig `json:"postgresHighRollbackRate"`
	PostgresSplitBrain           FixedAlert          `json:"postgresSplitBrain"`
	PostgresTooManyLocksAcquired FloatValAlertConfig `json:"postgresTooManyLocksAcquired"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// PostgresAlertsList is a list of PostgresAlertss
type PostgresAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of PostgresAlerts CRD objects
	Items []PostgresAlerts `json:"items,omitempty"`
}
