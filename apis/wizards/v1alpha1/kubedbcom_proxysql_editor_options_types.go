/*
Copyright AppsCode Inc. and Contributors

Licensed under the PolyForm Noncommercial License 1.0.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://github.com/appscode/licenses/raw/1.0.0/PolyForm-Noncommercial-1.0.0.md

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha1

import (
	alerts "go.appscode.dev/alerts/apis/alerts/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	mona "kmodules.xyz/monitoring-agent-api/api/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// KubedbcomProxysqlEditorOptions defines the schama for Proxysql Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomproxysqleditoroptionss,singular=kubedbcomproxysqleditoroptions
type KubedbcomProxysqlEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomProxysqlEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomProxysqlEditorOptionsSpec is the schema for Proxysql profile values file
type KubedbcomProxysqlEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomProxysqlEditorOptionsSpecSpec `json:"spec"`
	Form         ProxysqlAlertsSpecForm                 `json:"form"`
}

type KubedbcomProxysqlEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels         map[string]string `json:"labels"`
	Mode           GeneralMode       `json:"mode"`
	Replicas       int               `json:"replicas"`
	SyncUsers      bool              `json:"syncUsers"`
	Backend        string            `json:"backend"`
	PodResources   PodResources      `json:"podResources"`
	AuthSecret     AuthSecret        `json:"authSecret"`
	DeletionPolicy DeletionPolicy    `json:"deletionPolicy"`
	Configuration  string            `json:"configuration"`
	Admin          AdminOptions      `json:"admin"`
}

type KubedbcomProxysqlEditorMonitoring struct {
	Agent          mona.AgentType             `json:"agent"`
	ServiceMonitor *mona.ServiceMonitorLabels `json:"serviceMonitor"`
}

type ProxysqlAlertsSpecForm struct {
	Alert alerts.ProxySQLAlert `json:"alert"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomProxysqlEditorOptionsList is a list of KubedbcomProxysqlEditorOptionss
type KubedbcomProxysqlEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomProxysqlEditorOptions CRD objects
	Items []KubedbcomProxysqlEditorOptions `json:"items,omitempty"`
}
