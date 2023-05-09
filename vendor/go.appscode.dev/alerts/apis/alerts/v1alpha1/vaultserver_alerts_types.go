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
	ResourceKindVaultserverAlerts = "VaultserverAlerts"
	ResourceVaultserverAlerts     = "vaultserveralerts"
	ResourceVaultserverAlertss    = "vaultserveralertss"
)

// VaultserverAlerts defines the schama for KubeVault Operator Installer.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=vaultserveralertss,singular=vaultserveralerts,categories={kubevault,appscode}
type VaultserverAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              VaultserverAlertsSpec `json:"spec,omitempty"`
}

// VaultserverAlertsSpec is the schema for kubedb-autoscaler chart values file
type VaultserverAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         VaultserverAlertsSpecForm `json:"form"`
}

type VaultserverAlertsSpecForm struct {
	Alert VaultserverAlertsAlert `json:"alert"`
}

type VaultserverAlertsAlert struct {
	Enabled SeverityFlag      `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string            `json:"additionalRuleLabels"`
	Groups               VaultserverAlertsAlertGroups `json:"groups"`
}

type VaultserverAlertsAlertGroups struct {
	Vault       VaultserverAlertsVaultAlert `json:"vault"`
	Provisioner ProvisionerAlert            `json:"operator"`
	OpsManager  OpsManagerAlert             `json:"opsManager"`
	Stash       StashAlert                  `json:"stash"`
}

type VaultserverAlertsVaultAlert struct {
	Enabled SeverityFlag                     `json:"enabled"`
	Rules   VaultserverAlertsVaultAlertRules `json:"rules"`
}

type VaultserverAlertsVaultAlertRules struct {
	VaultDown                    FixedAlert  `json:"vaultDown"`
	VaultSealed                  FixedAlert  `json:"vaultSealed"`
	VaultAutoPilotNodeUnhealthy  FixedAlert  `json:"vaultAutoPilotNodeUnhealthy"`
	VaultLeadershipLoss          IntValAlert `json:"vaultLeadershipLoss"`
	VaultLeadershipStepsDowns    IntValAlert `json:"vaultLeadershipStepsDowns"`
	VaultLeadershipSetupFailures IntValAlert `json:"vaultLeadershipSetupFailures"`
	VaultRequestFailures         FixedAlert  `json:"vaultRequestFailures"`
	VaultResponseFailures        FixedAlert  `json:"vaultResponseFailures"`
	VaultTooManyInfinityTokens   IntValAlert `json:"vaultTooManyInfinityTokens"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// VaultserverAlertsList is a list of Rediss
type VaultserverAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of Redis CRD objects
	Items []VaultserverAlerts `json:"items,omitempty"`
}
