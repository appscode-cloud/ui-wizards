/*
Copyright AppsCode Inc. and Contributors

Licensed under the AppsCode Free Trial License 1.0.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://github.com/appscode/licenses/raw/1.0.0/AppsCode-Free-Trial-1.0.0.md

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha1

type CAPIFormSpec struct {
	// +optional
	Provider    CAPIProvider `json:"provider"`
	Namespace   string       `json:"namespace"`
	ClusterName string       `json:"clusterName"`
	Dedicated   bool         `json:"dedicated"`
	Nodes       int          `json:"nodes"`
	SKU         string       `json:"sku"`
	Zones       []string     `json:"zones"`
}

// +kubebuilder:validation:Enum=capa;capg;capz
type CAPIProvider string

const (
	CAPIProviderDisabled CAPIProvider = ""
	CAPIProviderCAPA     CAPIProvider = "capa"
	CAPIProviderCAPG     CAPIProvider = "capg"
	CAPIProviderCAPZ     CAPIProvider = "capz"
)
