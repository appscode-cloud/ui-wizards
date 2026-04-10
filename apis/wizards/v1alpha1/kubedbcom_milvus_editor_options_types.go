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
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// KubedbcomMilvusEditorOptions defines the schama for Milvus Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubedbcommilvuseditoroptionss,singular=kubedbcommilvuseditoroptions
type KubedbcomMilvusEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubedbcomMilvusEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomMilvusEditorOptionsSpec is the schema for Milvus profile values file
type KubedbcomMilvusEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubedbcomMilvusEditorOptionsSpecSpec `json:"spec"`
}

type KubedbcomMilvusEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	Mode   MilvusMode        `json:"mode"`
	// +optional
	Replicas      int                 `json:"replicas,omitempty"`
	Persistence   Persistence         `json:"persistence"`
	PodResources  PodResources        `json:"podResources"`
	MetaStorage   MilvusMetaStorage   `json:"metaStorage"`
	ObjectStorage MilvusObjectStorage `json:"objectStorage"`
	// +optional
	Distributed     *MilvusDistributed `json:"distributed,omitempty"`
	DisableSecurity bool               `json:"disableSecurity"`
	Halted          bool               `json:"halted"`
	AuthSecret      MilvusAuthSecret   `json:"authSecret"`
	DeletionPolicy  DeletionPolicy     `json:"deletionPolicy"`
	Configuration   string             `json:"configuration"`
	// +optional
	ConfigurationSecretName string `json:"configurationSecretName,omitempty"`
	// +optional
	ConfigurationInline map[string]string  `json:"configurationInline,omitempty"`
	Admin               AdminOptions       `json:"admin"`
	Backup              BackupToolSpec     `json:"backup"`
	Monitoring          MonitoringOperator `json:"monitoring"`
	// +optional
	Openshift Openshift `json:"openshift"`
}

// +kubebuilder:validation:Enum=Standalone;Distributed
type MilvusMode string

type MilvusMetaStorage struct {
	ExternallyManaged bool     `json:"externallyManaged"`
	Endpoints         []string `json:"endpoints"`
	Size              int      `json:"size"`
}

type MilvusObjectStorage struct {
	ConfigSecretName string `json:"configSecretName"`
}

type MilvusDistributed struct {
	Mixcoord      MilvusDistributedNode `json:"mixcoord"`
	Proxy         MilvusDistributedNode `json:"proxy"`
	Streamingnode MilvusStreamingNode   `json:"streamingnode"`
	Datanode      MilvusDistributedNode `json:"datanode"`
	Querynode     MilvusDistributedNode `json:"querynode"`
}

type MilvusDistributedNode struct {
	Replicas     int          `json:"replicas"`
	PodResources PodResources `json:"podResources"`
}

type MilvusStreamingNode struct {
	Replicas     int          `json:"replicas"`
	Persistence  Persistence  `json:"persistence"`
	PodResources PodResources `json:"podResources"`
}

type MilvusAuthSecret struct {
	// +optional
	Name string `json:"name"`
	// +optional
	ExternallyManaged bool `json:"externallyManaged"`
	// +optional
	// +kubebuilder:validation:Format:=password
	Password string `json:"password"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubedbcomMilvusEditorOptionsList is a list of KubedbcomMilvusEditorOptionss
type KubedbcomMilvusEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubedbcomMilvusEditorOptions CRD objects
	Items []KubedbcomMilvusEditorOptions `json:"items,omitempty"`
}
