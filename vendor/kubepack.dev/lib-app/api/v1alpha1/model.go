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
	Metadata `json:"metadata,omitempty"`
	Resources *unstructured.Unstructured `json:"resources"`
}