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
	ResourceKindOpenFGAAlerts = "OpenFGAAlerts"
	ResourceOpenFGAAlerts     = "openfgaalerts"
	ResourceOpenFGAAlertss    = "openfgaalertss"
)

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=openfgaalertss,singular=openfgaalerts,categories={openfga,appscode}
type OpenFGAAlerts struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              OpenFGAAlertsSpec `json:"spec,omitempty"`
}

type OpenFGAAlertsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Form         OpenFGAAlertsSpecForm `json:"form"`
	Grafana      Grafana               `json:"grafana"`
}

type OpenFGAAlertsSpecForm struct {
	Alert OpenFGAAlert `json:"alert"`
}

type OpenFGAAlert struct {
	Enabled mona.SeverityFlag `json:"enabled"`
	Labels  map[string]string `json:"labels"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	AdditionalRuleLabels map[string]string  `json:"additionalRuleLabels"`
	Groups               OpenFGAAlertGroups `json:"groups"`
}

type OpenFGAAlertGroups struct {
	Core OpenFGACoreAlert `json:"core"`
}

type OpenFGACoreAlert struct {
	Enabled mona.SeverityFlag     `json:"enabled"`
	Rules   OpenFGACoreAlertRules `json:"rules"`
}

type OpenFGACoreAlertRules struct {
	Down                  FixedAlert          `json:"down"`
	HighRequestLatency    FloatValAlertConfig `json:"highRequestLatency"`
	HighErrorRate         FloatValAlertConfig `json:"highErrorRate"`
	LowCheckCacheHitRatio FloatValAlertConfig `json:"lowCheckCacheHitRatio"`
	HighSQLConnections    FloatValAlertConfig `json:"highSQLConnections"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

type OpenFGAAlertsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []OpenFGAAlerts `json:"items,omitempty"`
}
