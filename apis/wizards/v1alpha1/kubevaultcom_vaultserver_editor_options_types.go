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
	core "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	api "x-helm.dev/apimachinery/apis/releases/v1alpha1"
)

// KubevaultcomVaultserverEditorOptions defines the schama for Vaultserver Editor UI Options.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// +kubebuilder:object:root=true
// +kubebuilder:resource:path=kubevaultcomvaultservereditoroptionss,singular=kubevaultcomvaultservereditoroptions
type KubevaultcomVaultserverEditorOptions struct {
	metav1.TypeMeta   `json:",inline,omitempty"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              KubevaultcomVaultserverEditorOptionsSpec `json:"spec,omitempty"`
}

// KubevaultcomVaultserverEditorOptionsSpec is the schema for Vaultserver profile values file
type KubevaultcomVaultserverEditorOptionsSpec struct {
	api.Metadata `json:"metadata,omitempty"`
	Spec         KubevaultcomVaultserverEditorOptionsSpecSpec `json:"spec"`
	Form         VaultserverAlertsSpecForm                    `json:"form"`
}

type KubevaultcomVaultserverEditorOptionsSpecSpec struct {
	Version string `json:"version"`
	// +optional
	Annotations map[string]string `json:"annotations"`
	// +optional
	Labels map[string]string `json:"labels"`
	// +optional
	Replicas          int                       `json:"replicas,omitempty"`
	TerminationPolicy DeletionPolicy            `json:"terminationPolicy"`
	Machine           MachineType               `json:"machine"`
	Resources         core.ResourceRequirements `json:"resources"`
	Backend           VaultserverBackend        `json:"backend"`
	Unsealer          VaultserverUnsealer       `json:"unsealer"`
	Monitoring        Monitoring                `json:"monitoring"`
	Backup            BackupToolSpec            `json:"backup"`
}

type VaultserverBackend struct {
	TLSSecret        VaultserverBackendTLSSecret        `json:"tlsSecret"`
	CredentialSecret VaultserverBackendCredentialSecret `json:"credentialSecret"`
	Provider         VaultserverBackendProvider         `json:"provider"`
}

type VaultserverBackendTLSSecret struct {
	// +optional
	Name string `json:"name"`
	// +optional
	Consul VaultserverBackendTLSConsul `json:"consul"`
	// +optional
	Mysql VaultserverBackendTLSMysql `json:"mysql"`
}

type VaultserverBackendTLSConsul struct {
	CaCrt     string `json:"caCrt"`
	ClientCrt string `json:"clientCrt"`
	ClientKey string `json:"clientKey"`
}

type VaultserverBackendTLSMysql struct {
	TLSCaFile string `json:"tlsCaFile"`
}

type VaultserverBackendCredentialSecret struct {
	// +optional
	Name string `json:"name"`
	// +optional
	Azure VaultserverBackendCredentialAzure `json:"azure"`
	// +optional
	Consul VaultserverBackendCredentialConsul `json:"consul"`
	// +optional
	Dynamodb VaultserverBackendCredentialDynamodb `json:"dynamodb"`
	// +optional
	Etcd VaultserverBackendCredentialEtcd `json:"etcd"`
	// +optional
	Gcs VaultserverBackendCredentialGcs `json:"gcs"`
	// +optional
	Mysql VaultserverBackendCredentialMysql `json:"mysql"`
	// +optional
	Postgresql VaultserverBackendCredentialPostgresql `json:"postgresql"`
	// +optional
	S3 VaultserverBackendCredentialSecretS3 `json:"s3"`
	// +optional
	Swift VaultserverBackendCredentialSecretSwift `json:"swift"`
}

type VaultserverBackendCredentialAzure struct {
	AccountKey string `json:"accountKey"`
}

type VaultserverBackendCredentialConsul struct {
	ACLToken string `json:"aclToken"`
}

type VaultserverBackendCredentialDynamodb struct {
	AccessKey string `json:"accessKey"`
	SecretKey string `json:"secretKey"`
	// +optional
	SessionToken string `json:"sessionToken"`
}

type VaultserverBackendCredentialEtcd struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type VaultserverBackendCredentialGcs struct {
	SaJSON string `json:"saJson"`
}

type VaultserverBackendCredentialMysql struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type VaultserverBackendCredentialPostgresql struct {
	ConnectionURL string `json:"connectionURL"`
}

type VaultserverBackendCredentialSecretS3 struct {
	AccessKey string `json:"accessKey"`
	SecretKey string `json:"secretKey"`
}

type VaultserverBackendCredentialSecretSwift struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	AuthToken string `json:"authToken"`
}

// +kubebuilder:validation:Enum=azure;consul;dynamodb;etcd;gcs;inmem;mysql;postgresql;raft;s3;swift
type VaultserverBackendProviderType string

type VaultserverBackendProvider struct {
	Type VaultserverBackendProviderType `json:"type"`
	// +optional
	Azure VaultserverBackendProviderAzure `json:"azure"`
	// +optional
	Consul VaultserverBackendProviderConsul `json:"consul"`
	// +optional
	Dynamodb VaultserverBackendProviderDynamodb `json:"dynamodb"`
	// +optional
	Etcd VaultserverBackendProviderEtcd `json:"etcd"`
	// +optional
	Gcs VaultserverBackendProviderGcs `json:"gcs"`
	// +optional
	Inmem VaultserverBackendProviderInmem `json:"inmem"`
	// +optional
	Raft VaultserverBackendProviderRaft `json:"raft"`
	// +optional
	S3 VaultserverBackendProviderS3 `json:"s3"`
	// +optional
	Swift VaultserverBackendProviderSwift `json:"swift"`
}

type VaultserverBackendProviderAzure struct {
	AccountName string `json:"accountName"`
}

type VaultserverBackendProviderConsul struct {
	Address string `json:"address"`
	Path    string `json:"path"`
}

type VaultserverBackendProviderDynamodb struct{}

type VaultserverBackendProviderEtcd struct {
	Address string `json:"address"`
}

type VaultserverBackendProviderGcs struct {
	Bucket string `json:"bucket"`
}

type VaultserverBackendProviderInmem struct{}

type VaultserverBackendProviderRaft struct {
	StorageClass StorageClass `json:"storageClass"`
	Persistence  Persistence  `json:"persistence"`
}

type VaultserverBackendProviderS3 struct {
	Region           string `json:"region"`
	Bucket           string `json:"bucket"`
	CredentialSecret string `json:"credentialSecret"`
}

type VaultserverBackendProviderSwift struct{}

type VaultserverUnsealer struct {
	CredentialSecret UnsealerCredentialSecret `json:"credentialSecret"`
	Mode             VaultserverUnsealerMode  `json:"mode"`
}

type UnsealerCredentialSecret struct {
	// +optional
	Name string `json:"name"`
	// +optional
	AwsKmsSsm VaultserverCredentialAwsKmsSsm `json:"awsKmsSsm"`
	// +optional
	AzureKeyVault VaultserverCredentialAzureKeyVault `json:"azureKeyVault"`
	// +optional
	GoogleKmsGcs VaultserverCredentialSecretGoogleKmsGcs `json:"googleKmsGcs"`
}

// +kubebuilder:validation:Enum=awsKmsSsm;azureKeyVault;googleKmsGcs;kubernetesSecret
type VaultserverUnsealerModeType string

type VaultserverUnsealerMode struct {
	Type VaultserverUnsealerModeType `json:"type"`
	// +optional
	AwsKmsSsm VaultserverUnsealerModeAwsKmsSsm `json:"awsKmsSsm"`
	// +optional
	AzureKeyVault VaultserverUnsealerModeAzureKeyVault `json:"azureKeyVault"`
	// +optional
	GoogleKmsGcs VaultserverUnsealerModeGoogleKmsGcs `json:"googleKmsGcs"`
}

type VaultserverUnsealerModeAwsKmsSsm struct {
	KmsKeyID string `json:"kmsKeyID"`
	Region   string `json:"region"`
}

type VaultserverCredentialAwsKmsSsm struct {
	AccessKey string `json:"accessKey"`
	SecretKey string `json:"secretKey"`
}

type VaultserverUnsealerModeAzureKeyVault struct {
	VaultBaseURL string `json:"vaultBaseURL"`
}

type VaultserverCredentialAzureKeyVault struct {
	ClientID           string `json:"clientId"`
	ClientSecret       string `json:"clientSecret"`
	ClientCert         string `json:"clientCert"`
	ClientCertPassword string `json:"clientCertPassword"`
}

type VaultserverUnsealerModeGoogleKmsGcs struct {
	KmsCryptoKey string `json:"kmsCryptoKey"`
	KmsKeyRing   string `json:"kmsKeyRing"`
	KmsLocation  string `json:"kmsLocation"`
	KmsProject   string `json:"kmsProject"`
	Bucket       string `json:"bucket"`
}

type VaultserverCredentialSecretGoogleKmsGcs struct {
	SaJSON string `json:"saJson"`
}

// +kubebuilder:validation:Enum=Standalone;Cluster;Sentinel
type VaultserverMode string

type VaultserverAlertsSpecForm struct {
	Alert alerts.VaultserverAlertsAlert `json:"alert"`
	CAPI  CAPIFormSpec                  `json:"capi"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// KubevaultcomVaultserverEditorOptionsList is a list of KubevaultcomVaultserverEditorOptionss
type KubevaultcomVaultserverEditorOptionsList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	// Items is a list of KubevaultcomVaultserverEditorOptions CRD objects
	Items []KubevaultcomVaultserverEditorOptions `json:"items,omitempty"`
}
