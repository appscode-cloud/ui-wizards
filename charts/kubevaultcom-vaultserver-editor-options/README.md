# VaultServer Editor UI Options

[VaultServer Editor UI Options](https://byte.builders) - VaultServer Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubevaultcom-vaultserver-editor-options --version=v0.4.5
$ helm upgrade -i kubevaultcom-vaultserver-editor-options bytebuilders-ui/kubevaultcom-vaultserver-editor-options -n kube-system --create-namespace --version=v0.4.5
```

## Introduction

This chart deploys a VaultServer Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubevaultcom-vaultserver-editor-options`:

```bash
$ helm upgrade -i kubevaultcom-vaultserver-editor-options bytebuilders-ui/kubevaultcom-vaultserver-editor-options -n kube-system --create-namespace --version=v0.4.5
```

The command deploys a VaultServer Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubevaultcom-vaultserver-editor-options`:

```bash
$ helm uninstall kubevaultcom-vaultserver-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubevaultcom-vaultserver-editor-options` chart and their default values.

|                            Parameter                            |                                                                                Description                                                                                |                       Default                        |
|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| metadata.resource.group                                         |                                                                                                                                                                           | <code>kubevault.com</code>                           |
| metadata.resource.kind                                          |                                                                                                                                                                           | <code>VaultServer</code>                             |
| metadata.resource.name                                          |                                                                                                                                                                           | <code>vaultservers</code>                            |
| metadata.resource.scope                                         |                                                                                                                                                                           | <code>Namespaced</code>                              |
| metadata.resource.version                                       |                                                                                                                                                                           | <code>v1alpha1</code>                                |
| metadata.release.name                                           | Release name                                                                                                                                                              | <code>""</code>                                      |
| metadata.release.namespace                                      | Release namespace                                                                                                                                                         | <code>""</code>                                      |
| spec.version                                                    | List options                                                                                                                                                              | <code>1.8.2</code>                                   |
| spec.annotations                                                | Annotations to add to the database custom resource                                                                                                                        | <code>{}</code>                                      |
| spec.labels                                                     | Labels to add to all the template objects                                                                                                                                 | <code>{}</code>                                      |
| spec.replicas                                                   |                                                                                                                                                                           | <code>3</code>                                       |
| spec.terminationPolicy                                          |                                                                                                                                                                           | <code>WipeOut</code>                                 |
| spec.machine                                                    |                                                                                                                                                                           | <code>""</code>                                      |
| spec.resources.limits.cpu                                       |                                                                                                                                                                           | <code>500m</code>                                    |
| spec.resources.limits.memory                                    |                                                                                                                                                                           | <code>1Gi</code>                                     |
| spec.backend.tlsSecret.name                                     |                                                                                                                                                                           | <code>""</code>                                      |
| spec.backend.tlsSecret.consul.caCrt                             |                                                                                                                                                                           | <code><ca-cert></code>                               |
| spec.backend.tlsSecret.consul.clientCrt                         |                                                                                                                                                                           | <code><client-cert></code>                           |
| spec.backend.tlsSecret.consul.clientKey                         |                                                                                                                                                                           | <code><client-key></code>                            |
| spec.backend.tlsSecret.mysql.tlsCaFile                          |                                                                                                                                                                           | <code><tls-ca-file></code>                           |
| spec.backend.credentialSecret.name                              |                                                                                                                                                                           | <code>""</code>                                      |
| spec.backend.credentialSecret.azure.accountKey                  |                                                                                                                                                                           | <code><account_key></code>                           |
| spec.backend.credentialSecret.consul.aclToken                   |                                                                                                                                                                           | <code><acl-token></code>                             |
| spec.backend.credentialSecret.dynamodb.accessKey                |                                                                                                                                                                           | <code><access_key></code>                            |
| spec.backend.credentialSecret.dynamodb.secretKey                |                                                                                                                                                                           | <code><secret_key></code>                            |
| spec.backend.credentialSecret.dynamodb.sessionToken             |                                                                                                                                                                           | <code><session-token></code>                         |
| spec.backend.credentialSecret.etcd.username                     |                                                                                                                                                                           | <code><username></code>                              |
| spec.backend.credentialSecret.etcd.password                     |                                                                                                                                                                           | <code><password></code>                              |
| spec.backend.credentialSecret.gcs.saJson                        |                                                                                                                                                                           | <code><gcs-sa.json></code>                           |
| spec.backend.credentialSecret.mysql.username                    |                                                                                                                                                                           | <code><username></code>                              |
| spec.backend.credentialSecret.mysql.password                    |                                                                                                                                                                           | <code><password></code>                              |
| spec.backend.credentialSecret.postgresql.connectionURL          |                                                                                                                                                                           | <code><connection_url></code>                        |
| spec.backend.credentialSecret.s3.accessKey                      |                                                                                                                                                                           | <code><access_key></code>                            |
| spec.backend.credentialSecret.s3.secretKey                      |                                                                                                                                                                           | <code><secret_key></code>                            |
| spec.backend.credentialSecret.swift.username                    |                                                                                                                                                                           | <code><username></code>                              |
| spec.backend.credentialSecret.swift.password                    |                                                                                                                                                                           | <code><password></code>                              |
| spec.backend.credentialSecret.swift.authToken                   |                                                                                                                                                                           | <code><auth-token></code>                            |
| spec.backend.provider.type                                      |                                                                                                                                                                           | <code>raft</code>                                    |
| spec.backend.provider.azure.accountName                         |                                                                                                                                                                           | <code><account-name></code>                          |
| spec.backend.provider.consul.address                            |                                                                                                                                                                           | <code>"http://consul-server.default.svc:8500"</code> |
| spec.backend.provider.consul.path                               |                                                                                                                                                                           | <code>"vault"</code>                                 |
| spec.backend.provider.dynamodb                                  |                                                                                                                                                                           | <code>{}</code>                                      |
| spec.backend.provider.etcd.address                              |                                                                                                                                                                           | <code><etcd-server-address></code>                   |
| spec.backend.provider.gcs.bucket                                |                                                                                                                                                                           | <code><bucket-name></code>                           |
| spec.backend.provider.inmem                                     |                                                                                                                                                                           | <code>{}</code>                                      |
| spec.backend.provider.raft.storageClass.name                    |                                                                                                                                                                           | <code>standard</code>                                |
| spec.backend.provider.raft.persistence.size                     |                                                                                                                                                                           | <code>10Gi</code>                                    |
| spec.backend.provider.s3.bucket                                 |                                                                                                                                                                           | <code><bucket-name></code>                           |
| spec.backend.provider.s3.credentialSecret                       |                                                                                                                                                                           | <code>vault-backend-creds</code>                     |
| spec.backend.provider.swift                                     |                                                                                                                                                                           | <code>{}</code>                                      |
| spec.unsealer.credentialSecret.name                             |                                                                                                                                                                           | <code>""</code>                                      |
| spec.unsealer.credentialSecret.awsKmsSsm.accessKey              |                                                                                                                                                                           | <code><access_key></code>                            |
| spec.unsealer.credentialSecret.awsKmsSsm.secretKey              |                                                                                                                                                                           | <code><secret_key></code>                            |
| spec.unsealer.credentialSecret.azureKeyVault.clientId           |                                                                                                                                                                           | <code><client-cert></code>                           |
| spec.unsealer.credentialSecret.azureKeyVault.clientSecret       |                                                                                                                                                                           | <code><client-secret></code>                         |
| spec.unsealer.credentialSecret.azureKeyVault.clientCert         |                                                                                                                                                                           | <code><client-cert></code>                           |
| spec.unsealer.credentialSecret.azureKeyVault.clientCertPassword |                                                                                                                                                                           | <code><client-cert-password></code>                  |
| spec.unsealer.credentialSecret.googleKmsGcs.saJson              |                                                                                                                                                                           | <code>""</code>                                      |
| spec.unsealer.mode.type                                         |                                                                                                                                                                           | <code>kubernetesSecret</code>                        |
| spec.unsealer.mode.awsKmsSsm.kmsKeyID                           |                                                                                                                                                                           | <code><kms-key-id></code>                            |
| spec.unsealer.mode.awsKmsSsm.region                             |                                                                                                                                                                           | <code><region></code>                                |
| spec.unsealer.mode.azureKeyVault.vaultBaseURL                   |                                                                                                                                                                           | <code><vault-base-url></code>                        |
| spec.unsealer.mode.googleKmsGcs.kmsCryptoKey                    |                                                                                                                                                                           | <code><kms-key></code>                               |
| spec.unsealer.mode.googleKmsGcs.kmsKeyRing                      |                                                                                                                                                                           | <code><kms-ring></code>                              |
| spec.unsealer.mode.googleKmsGcs.kmsLocation                     |                                                                                                                                                                           | <code><kms-location></code>                          |
| spec.unsealer.mode.googleKmsGcs.kmsProject                      |                                                                                                                                                                           | <code><project-name></code>                          |
| spec.unsealer.mode.googleKmsGcs.bucket                          |                                                                                                                                                                           | <code><bucket-name></code>                           |
| spec.monitoring.agent                                           | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin")                                                                      | <code>prometheus.io/operator</code>                  |
| spec.monitoring.serviceMonitor.labels                           | Specify the labels for ServiceMonitor. Prometheus crd will select ServiceMonitor using these labels. Only usable when monitoring agent is `prometheus.io/webhook server`. | <code>{"release":"kube-prometheus-stack"}</code>     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubevaultcom-vaultserver-editor-options bytebuilders-ui/kubevaultcom-vaultserver-editor-options -n kube-system --create-namespace --version=v0.4.5 --set metadata.resource.group=kubevault.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubevaultcom-vaultserver-editor-options bytebuilders-ui/kubevaultcom-vaultserver-editor-options -n kube-system --create-namespace --version=v0.4.5 --values values.yaml
```
