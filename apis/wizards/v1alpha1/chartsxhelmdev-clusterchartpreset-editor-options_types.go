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

// ChartsxhelmdevClusterChartPresetEditorOptions defines the schama for ClusterChartPreset Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=chartsxhelmdevclusterchartpreseteditoroptionss,singular=chartsxhelmdevclusterchartpreseteditoroptions
type ChartsxhelmdevClusterChartPresetEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              ChartsxhelmdevClusterChartPresetEditorOptionsSpec `json:"spec,omitempty"`
}

// KubedbcomMongodbEditorOptionsSpec is the schema for MongoDB profile values file
type ChartsxhelmdevClusterChartPresetEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         ChartsxhelmdevClusterChartPresetEditorOptionsSpecSpec `json:"spec"`
}

type ChartsxhelmdevClusterChartPresetEditorOptionsSpecSpec struct {
	Admin AdminOptions `json:"admin"`
}

type BackupOptions struct {
	Kubestash KubeStashInfo `json:"kubestash"`
	// +kubebuilder:default=KubeStash
	Tool BackupTool `json:"tool"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// ChartsxhelmdevClusterChartPresetEditorOptionsList is a list of ChartsxhelmdevClusterChartPresetEditorOptions
type ChartsxhelmdevClusterChartPresetEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of ChartsxhelmdevClusterChartPresetEditorOptions CRD objects
	Items []ChartsxhelmdevClusterChartPresetEditorOptions `json:"items,omitempty"`
}
