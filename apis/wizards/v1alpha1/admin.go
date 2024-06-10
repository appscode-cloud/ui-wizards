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

// +kubebuilder:validation:Enum=Shared;Dedicated
type DeploymentMode string

const (
	DeploymentModeShared    DeploymentMode = "Shared"
	DeploymentModeDedicated DeploymentMode = "Dedicated"
)

type AdminOptions struct {
	Deployment DeploymentProfile `json:"deployment"`

	Versions              ClusterScopedProfile `json:"versions"`
	StorageClasses        ClusterScopedProfile `json:"storageClasses"`
	VolumeSnapshotClasses ClusterScopedProfile `json:"volumeSnapshotClasses"`

	TLS            SimpleToggleProfile  `json:"tls"`
	ClusterIssuers ClusterScopedProfile `json:"clusterIssuers"`

	WebUI    SimpleToggleProfile    `json:"webUI"`
	Gateways NamespaceScopedProfile `json:"gateways"`

	Monitoring SimpleToggleProfile `json:"monitoring"`
	Alert      AlertsProfile       `json:"alert"`
	Backup     SimpleToggleProfile `json:"backup"`
}

type DeploymentProfile struct {
	Default DeploymentMode `json:"default"`
	Toggle  bool           `json:"toggle"`
}

type ClusterScopedProfile struct {
	Available []string `json:"available"`
	Default   string   `json:"default"`
	Toggle    bool     `json:"toggle"`
}

type NamespaceScopedProfile struct {
	Available []ObjectReference `json:"available"`
	Default   ObjectReference   `json:"default"`
	Toggle    bool              `json:"toggle"`
}

type SimpleToggleProfile struct {
	Default bool `json:"default"`
	Toggle  bool `json:"toggle"`
}

type AlertsProfile struct {
	Default string `json:"default"`
	Toggle  bool   `json:"toggle"`
}

// DefaultVersion, DefaultStorageClass, DefaultVolumeSnapshotClass, DefaultIssuer, DefaultClusterIssuer, DefaultGateway
// All these default values like will be found through annotation.
