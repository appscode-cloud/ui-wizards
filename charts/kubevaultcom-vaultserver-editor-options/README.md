# VaultServer Editor UI Options

[VaultServer Editor UI Options](https://byte.builders) - VaultServer Editor UI Options

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install kubevaultcom-vaultserver-editor-options bytebuilders-ui-dev/kubevaultcom-vaultserver-editor-options -n kube-system
```

## Introduction

This chart deploys a VaultServer Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `kubevaultcom-vaultserver-editor-options`:

```console
$ helm install kubevaultcom-vaultserver-editor-options bytebuilders-ui-dev/kubevaultcom-vaultserver-editor-options -n kube-system
```

The command deploys a VaultServer Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubevaultcom-vaultserver-editor-options`:

```console
$ helm delete kubevaultcom-vaultserver-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubevaultcom-vaultserver-editor-options` chart and their default values.

|                            Parameter                            |                    Description                     |                  Default                  |
|-----------------------------------------------------------------|----------------------------------------------------|-------------------------------------------|
| metadata.resource.group                                         |                                                    | `kubevault.com`                           |
| metadata.resource.kind                                          |                                                    | `VaultServer`                             |
| metadata.resource.name                                          |                                                    | `vaultservers`                            |
| metadata.resource.scope                                         |                                                    | `Namespaced`                              |
| metadata.resource.version                                       |                                                    | `v1alpha2`                                |
| metadata.release.name                                           | Release name                                       | `""`                                      |
| metadata.release.namespace                                      | Release namespace                                  | `""`                                      |
| spec.version                                                    | List options                                       | `1.8.2`                                   |
| spec.annotations                                                | Annotations to add to the database custom resource | `{}`                                      |
| spec.labels                                                     | Labels to add to all the template objects          | `{}`                                      |
| spec.replicas                                                   |                                                    | `3`                                       |
| spec.terminationPolicy                                          |                                                    | `WipeOut`                                 |
| spec.machine                                                    |                                                    | `""`                                      |
| spec.resources.limits.cpu                                       |                                                    | `".5"`                                    |
| spec.resources.limits.memory                                    |                                                    | `1024Mi`                                  |
| spec.backend.tlsSecret.name                                     |                                                    | `""`                                      |
| spec.backend.tlsSecret.consul.caCrt                             |                                                    | `<ca-cert>`                               |
| spec.backend.tlsSecret.consul.clientCrt                         |                                                    | `<client-cert>`                           |
| spec.backend.tlsSecret.consul.clientKey                         |                                                    | `<client-key>`                            |
| spec.backend.tlsSecret.mysql.tlsCaFile                          |                                                    | `<tls-ca-file>`                           |
| spec.backend.credentialSecret.name                              |                                                    | `""`                                      |
| spec.backend.credentialSecret.azure.accountKey                  |                                                    | `<account_key>`                           |
| spec.backend.credentialSecret.consul.aclToken                   |                                                    | `<acl-token>`                             |
| spec.backend.credentialSecret.dynamodb.accessKey                |                                                    | `<access_key>`                            |
| spec.backend.credentialSecret.dynamodb.secretKey                |                                                    | `<secret_key>`                            |
| spec.backend.credentialSecret.dynamodb.sessionToken             |                                                    | `<session-token>`                         |
| spec.backend.credentialSecret.gcs.saJson                        |                                                    | `<gcs-sa.json>`                           |
| spec.backend.credentialSecret.mysql.username                    |                                                    | `<username>`                              |
| spec.backend.credentialSecret.mysql.password                    |                                                    | `<password>`                              |
| spec.backend.credentialSecret.postgresql.connectionURL          |                                                    | `<connection_url>`                        |
| spec.backend.credentialSecret.s3.accessKey                      |                                                    | `<access_key>`                            |
| spec.backend.credentialSecret.s3.secretKey                      |                                                    | `<secret_key>`                            |
| spec.backend.credentialSecret.swift.username                    |                                                    | `<username>`                              |
| spec.backend.credentialSecret.swift.password                    |                                                    | `<password>`                              |
| spec.backend.credentialSecret.swift.authToken                   |                                                    | `<auth-token>`                            |
| spec.backend.provider.type                                      |                                                    | `""`                                      |
| spec.backend.provider.azure.accountName                         |                                                    | `<account-name>`                          |
| spec.backend.provider.consul.address                            |                                                    | `"http://consul-server.default.svc:8500"` |
| spec.backend.provider.consul.path                               |                                                    | `"vault"`                                 |
| spec.backend.provider.dynamodb                                  |                                                    | `{}`                                      |
| spec.backend.provider.gcs.bucket                                |                                                    | `<bucket-name>`                           |
| spec.backend.provider.inmem                                     |                                                    | `{}`                                      |
| spec.backend.provider.raft.storageClass.name                    |                                                    | `standard`                                |
| spec.backend.provider.raft.persistence.size                     |                                                    | `10Gi`                                    |
| spec.backend.provider.s3.bucket                                 |                                                    | `<bucket-name>`                           |
| spec.backend.provider.s3.credentialSecret                       |                                                    | `vault-backend-creds`                     |
| spec.backend.provider.swift                                     |                                                    | `{}`                                      |
| spec.unsealer.credentialSecret.name                             |                                                    | `""`                                      |
| spec.unsealer.credentialSecret.awsKmsSsm.accessKey              |                                                    | `<access_key>`                            |
| spec.unsealer.credentialSecret.awsKmsSsm.secretKey              |                                                    | `<secret_key>`                            |
| spec.unsealer.credentialSecret.azureKeyVault.clientId           |                                                    | `<client-cert>`                           |
| spec.unsealer.credentialSecret.azureKeyVault.clientSecret       |                                                    | `<client-secret>`                         |
| spec.unsealer.credentialSecret.azureKeyVault.clientCert         |                                                    | `<client-cert>`                           |
| spec.unsealer.credentialSecret.azureKeyVault.clientCertPassword |                                                    | `<client-cert-password>`                  |
| spec.unsealer.credentialSecret.googleKmsGcs.saJson              |                                                    | `""`                                      |
| spec.unsealer.mode.type                                         |                                                    | `kubernetesSecret`                        |
| spec.unsealer.mode.awsKmsSsm.credentialSecret                   |                                                    | `vault-unsealer-creds`                    |
| spec.unsealer.mode.awsKmsSsm.kmsKeyID                           |                                                    | `<kms-key-id>`                            |
| spec.unsealer.mode.awsKmsSsm.region                             |                                                    | `<region>`                                |
| spec.unsealer.mode.azureKeyVault.vaultBaseURL                   |                                                    | `<vault-base-url>`                        |
| spec.unsealer.mode.azureKeyVault.clientCertSecret               |                                                    | `vault-unsealer-creds`                    |
| spec.unsealer.mode.azureKeyVault.aadClientSecret                |                                                    | `vault-unsealer-creds`                    |
| spec.unsealer.mode.googleKmsGcs.kmsCryptoKey                    |                                                    | `<kms-key>`                               |
| spec.unsealer.mode.googleKmsGcs.kmsKeyRing                      |                                                    | `<kms-ring>`                              |
| spec.unsealer.mode.googleKmsGcs.kmsLocation                     |                                                    | `<kms-location>`                          |
| spec.unsealer.mode.googleKmsGcs.kmsProject                      |                                                    | `<project-name>`                          |
| spec.unsealer.mode.googleKmsGcs.bucket                          |                                                    | `<bucket-name>`                           |
| spec.unsealer.mode.googleKmsGcs.credentialSecret                |                                                    | `vault-unsealer-creds`                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubevaultcom-vaultserver-editor-options bytebuilders-ui-dev/kubevaultcom-vaultserver-editor-options -n kube-system --set metadata.resource.group=kubevault.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubevaultcom-vaultserver-editor-options bytebuilders-ui-dev/kubevaultcom-vaultserver-editor-options -n kube-system --values values.yaml
```
