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
	ResourceKindNATSAlerts = "NATSAlerts"
	ResourceNATSAlerts     = "natsalerts"
	ResourceNATSAlertss    = "natsalertss"
)

// NATSAlerts defines the schema for NATS Alerting Rules

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=natsalertss,singular=natsalerts,categories={nats,appscode}
type NATSAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              NATSAlertsSpec `json:"spec,omitempty"`
}

// NATSAlertsSpec is the schema for NATS alerts chart values file
type NATSAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         NATSAlertsSpecForm `json:"form"`
	Grafana      Grafana            `json:"grafana"`
}

type NATSAlertsSpecForm struct {
	Alert NATSAlert `json:"alert"`
}

type NATSAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string `json:"additionalRuleLabels"`
	Groups               NATSAlertGroups   `json:"groups"`
}

type NATSAlertGroups struct {
	Core                NATSCoreAlert                `json:"core"`
	ResourceUtilization NATSResourceUtilizationAlert `json:"resourceUtilization"`
	ConsumerHealth      NATSConsumerHealthAlert      `json:"consumerHealth"`
	StreamPerformance   NATSStreamPerformanceAlert   `json:"streamPerformance"`
	Connectivity        NATSConnectivityAlert        `json:"connectivity"`
	ConsumerManagement  NATSConsumerManagementAlert  `json:"consumerManagement"`
}

type NATSCoreAlert struct {
	Enabled mona.SeverityFlag  `json:"enabled"`
	Rules   NATSCoreAlertRules `json:"rules"`
}

type NATSCoreAlertRules struct {
	NatsDown             FixedAlert `json:"natsDown"`
	NatsReplicasNotReady FixedAlert `json:"natsReplicasNotReady"`
}

type NATSResourceUtilizationAlert struct {
	Enabled mona.SeverityFlag                 `json:"enabled"`
	Rules   NATSResourceUtilizationAlertRules `json:"rules"`
}

type NATSResourceUtilizationAlertRules struct {
	NatsJetStreamHighMemoryUsage  IntValAlert `json:"natsJetStreamHighMemoryUsage"`
	NatsJetStreamHighStorageUsage IntValAlert `json:"natsJetStreamHighStorageUsage"`
}

type NATSConsumerHealthAlert struct {
	Enabled mona.SeverityFlag            `json:"enabled"`
	Rules   NATSConsumerHealthAlertRules `json:"rules"`
}

type NATSConsumerHealthAlertRules struct {
	NatsJetStreamHighPendingMessages        IntValAlert `json:"natsJetStreamHighPendingMessages"`
	NatsJetStreamHighPendingMessagesWarning IntValAlert `json:"natsJetStreamHighPendingMessagesWarning"`
	NatsJetStreamHighAckPending             IntValAlert `json:"natsJetStreamHighAckPending"`
	NatsJetStreamBacklogNoProgress          IntValAlert `json:"natsJetStreamBacklogNoProgress"`
}

type NATSStreamPerformanceAlert struct {
	Enabled mona.SeverityFlag               `json:"enabled"`
	Rules   NATSStreamPerformanceAlertRules `json:"rules"`
}

type NATSStreamPerformanceAlertRules struct {
	NatsJetStreamNearMessageLimit IntValAlert `json:"natsJetStreamNearMessageLimit"`
	NatsJetStreamNearByteLimit    IntValAlert `json:"natsJetStreamNearByteLimit"`
}

type NATSConnectivityAlert struct {
	Enabled mona.SeverityFlag          `json:"enabled"`
	Rules   NATSConnectivityAlertRules `json:"rules"`
}

type NATSConnectivityAlertRules struct {
	NatsJetStreamDisabled     FixedAlert  `json:"natsJetStreamDisabled"`
	NatsSlowConsumers         FixedAlert  `json:"natsSlowConsumers"`
	NatsStalledClients        FixedAlert  `json:"natsStalledClients"`
	NatsStaleConnections      FixedAlert  `json:"natsStaleConnections"`
	NatsSuddenConnectionDrop  IntValAlert `json:"natsSuddenConnectionDrop"`
	NatsHighActiveConnections IntValAlert `json:"natsHighActiveConnections"`
}

type NATSConsumerManagementAlert struct {
	Enabled mona.SeverityFlag                `json:"enabled"`
	Rules   NATSConsumerManagementAlertRules `json:"rules"`
}

type NATSConsumerManagementAlertRules struct {
	NatsSuddenConsumerDrop IntValAlert `json:"natsSuddenConsumerDrop"`
	NatsHighTotalConsumers IntValAlert `json:"natsHighTotalConsumers"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// NATSAlertsList is a list of NATSAlerts
type NATSAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of NATSAlerts CRD objects
	Items []NATSAlerts `json:"items,omitempty"`
}
