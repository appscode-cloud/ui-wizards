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
	store "kmodules.xyz/objectstore-api/api/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// StashappscodecomRepositoryEditorOptions defines the schama for Stash Repository Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=stashappscodecomrepositoryeditoroptionss,singular=stashappscodecomrepositoryeditoroptions
type StashappscodecomRepositoryEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              StashappscodecomRepositoryEditorOptionsSpec `json:"spec,omitempty"`
}

// StashappscodecomRepositoryEditorOptionsSpec is the schema for Stash Repository profile values file
type StashappscodecomRepositoryEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         StashappscodecomRepositoryEditorOptionsSpecSpec `json:"spec"`
}

type StashappscodecomRepositoryEditorOptionsSpecSpec struct {
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels     map[string]string `json:"labels"`
	AuthSecret AuthSecret        `json:"authSecret"`
	Backend    RepositoryBackend `json:"backend"`
}

type RepositoryBackend struct {
	Provider string `json:"provider"`
	// +optional
	S3 S3 `json:"s3"`
	// +optional
	Azure Azure `json:"azure"`
	// +optional
	GCS GCS `json:"gcs"`
	// +optional
	Swift Swift `json:"swift"`
	// +optional
	B2 B2 `json:"b2"`
}

type S3 struct {
	Spec store.S3Spec `json:"spec"`
	// +optional
	Auth *S3Auth `json:"auth,omitempty"`
}

type S3Auth struct {
	AwsAccessKeyID     string `json:"AWS_ACCESS_KEY_ID"`
	AwsSecretAccessKey string `json:"AWS_SECRET_ACCESS_KEY"`
	CaCertData         string `json:"CA_CERT_DATA"`
}

type Azure struct {
	Spec store.AzureSpec `json:"spec"`
	// +optional
	Auth *AzureAuth `json:"auth,omitempty"`
}

type AzureAuth struct {
	AzureAccountName string `json:"AZURE_ACCOUNT_NAME"`
	AzureAccountKey  string `json:"AZURE_ACCOUNT_KEY"`
}

type GCS struct {
	Spec store.GCSSpec `json:"spec"`
	// +optional
	Auth *GCSAuth `json:"auth,omitempty"`
}

type GCSAuth struct {
	GoogleProjectID             string `json:"GOOGLE_PROJECT_ID"`
	GoogleServiceAccountJSONKey string `json:"GOOGLE_SERVICE_ACCOUNT_JSON_KEY"`
}

type Swift struct {
	Spec store.SwiftSpec `json:"spec"`
	// +optional
	Auth *SwiftAuth `json:"auth,omitempty"`
}

type SwiftAuth struct {
	OsUsername          string `json:"OS_USERNAME"`
	OsPassword          string `json:"OS_PASSWORD"`
	OsRegionName        string `json:"OS_REGION_NAME"`
	OsAuthURL           string `json:"OS_AUTH_URL"`
	OsUserDomainName    string `json:"OS_USER_DOMAIN_NAME"`
	OsProjectName       string `json:"OS_PROJECT_NAME"`
	OsProjectDomainName string `json:"OS_PROJECT_DOMAIN_NAME"`
	OsTenantID          string `json:"OS_TENANT_ID"`
	OsTenantName        string `json:"OS_TENANT_NAME"`
	StAuth              string `json:"ST_AUTH"`
	StUser              string `json:"ST_USER"`
	StKey               string `json:"ST_KEY"`
	OsStorageURL        string `json:"OS_STORAGE_URL"`
	OsAuthToken         string `json:"OS_AUTH_TOKEN"`
}

type B2 struct {
	Spec store.B2Spec `json:"spec"`
	// +optional
	Auth *B2Auth `json:"auth,omitempty"`
}

type B2Auth struct {
	B2AccountID  string `json:"B2_ACCOUNT_ID"`
	B2AccountKey string `json:"B2_ACCOUNT_KEY"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// StashappscodecomRepositoryEditorOptionsList is a list of StashappscodecomRepositoryEditorOptionss
type StashappscodecomRepositoryEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of StashappscodecomRepositoryEditorOptions CRD objects
	Items []StashappscodecomRepositoryEditorOptions `json:"items,omitempty"`
}
