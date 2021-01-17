/*
Copyright AppsCode Inc. and Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha1

import (
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	metaapi "kmodules.xyz/resource-metadata/apis/meta/v1alpha1"
)

type Metadata struct {
	Resource metaapi.ResourceID `json:"resource"`
	Release  ObjectMeta         `json:"release"`
}

type ObjectMeta struct {
	Name      string `json:"name"`
	Namespace string `json:"namespace"`
}

type ModelMetadata struct {
	Metadata `json:"metadata,omitempty"`
}

type Model struct {
	Metadata  `json:"metadata,omitempty"`
	Resources *unstructured.Unstructured `json:"resources"`
}
