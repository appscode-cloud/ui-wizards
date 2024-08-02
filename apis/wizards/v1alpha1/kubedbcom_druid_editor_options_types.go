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
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// KubedbcomDruidEditorOptions defines the schama for Druid Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcomdruideditoroptionss,singular=kubedbcomdruideditoroptions
type KubedbcomDruidEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomDruidEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomDruidEditorOptionsSpec is the schema for Druid profile values file
type KubedbcomDruidEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomDruidEditorOptionsSpecSpec `json:"spec"`
	Form         DruidAlertsSpecForm                 `json:"form"`
}

type KubedbcomDruidEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels          map[string]string    `json:"labels"`
	Topology        DruidTopology        `json:"topology"`
	DeepStorage     DruidDeepStorage     `json:"deepStorage"`
	MetadataStorage DruidMetadataStorage `json:"metadataStorage"`
	ZookeeperRef    DruidZooKeeperRef    `json:"zookeeperRef"`
	AuthSecret      AuthSecret           `json:"authSecret"`
	DeletionPolicy  DeletionPolicy       `json:"deletionPolicy"`
	Configuration   string               `json:"configuration"`
	Admin           AdminOptions         `json:"admin"`
}

type DruidNode struct {
	Replicas     int          `json:"replicas"`
	PodResources PodResources `json:"podResources"`
}

type DruidDataNode struct {
	DruidNode   `json:",inline"`
	Persistence Persistence `json:"persistence"`
}

type DruidTopology struct {
	Coordinators   *DruidNode     `json:"coordinators"`
	MiddleManagers *DruidDataNode `json:"middleManagers"`
	Historicals    *DruidDataNode `json:"historicals"`
	Brokers        *DruidNode     `json:"brokers"`
}

type DruidDeepStorage struct {
	Type         DruidDeepStorageType `json:"type"`
	ConfigSecret string               `json:"configSecret"`
}

// +kubebuilder:validation:Enum=s3;google;azure;hdfs
type DruidDeepStorageType string

// +kubebuilder:validation:Enum=MySQL;Postgres
type DruidMetadataStorageType string

type DruidMetadataStorage struct {
	Type              DruidMetadataStorageType `json:"type"`
	ObjectReference   `json:",inline"`
	ExternallyManaged bool `json:"externallyManaged"`
}

type DruidZooKeeperRef struct {
	ObjectReference   `json:",inline"`
	ExternallyManaged bool `json:"externallyManaged"`
}

type DruidAlertsSpecForm struct {
	Alert alerts.DruidAlert `json:"alert"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomDruidEditorOptionsList is a list of KubedbcomDruidEditorOptionss
type KubedbcomDruidEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomDruidEditorOptions CRD objects
	Items []KubedbcomDruidEditorOptions `json:"items,omitempty"`
}
