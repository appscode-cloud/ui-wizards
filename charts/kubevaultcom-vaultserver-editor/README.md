# VaultServer Editor

[VaultServer Editor by AppsCode](https://byte.builders) - VaultServer Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubevaultcom-vaultserver-editor --version=v0.4.2
$ helm upgrade -i kubevaultcom-vaultserver-editor bytebuilders-ui/kubevaultcom-vaultserver-editor -n default --create-namespace --version=v0.4.2
```

## Introduction

This chart deploys a VaultServer Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `kubevaultcom-vaultserver-editor`:

```bash
$ helm upgrade -i kubevaultcom-vaultserver-editor bytebuilders-ui/kubevaultcom-vaultserver-editor -n default --create-namespace --version=v0.4.2
```

The command deploys a VaultServer Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubevaultcom-vaultserver-editor`:

```bash
$ helm uninstall kubevaultcom-vaultserver-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubevaultcom-vaultserver-editor` chart and their default values.

|             Parameter             | Description |                                                                                                                                                                                                                                                                               Default                                                                                                                                                                                                                                                                               |
|-----------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group           |             | <code>kubevault.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.version         |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.name            |             | <code>vaultservers</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.resource.kind            |             | <code>VaultServer</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.resource.scope           |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.release.name             |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.release.namespace        |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| resources.kubevaultComVaultServer |             | <code>{"apiVersion":"kubevault.com/v1alpha1","kind":"VaultServer","metadata":{"name":"vault","namespace":"demo"},"spec":{"backend":{"consul":{"aclTokenSecretName":"vault-backend-creds","address":"http://consul-server.default.svc:8500","path":"vault","tlsSecretName":"vault-backend-tls"}},"configSecret":{"name":"vault-config"},"replicas":1,"unsealer":{"mode":{"awsKmsSsm":{"credentialSecret":"vault-unsealer-creds","kmsKeyID":"\u003ckms-key-id\u003e","region":"\u003cregion\u003e"}},"secretShares":5,"secretThreshold":3},"version":"1.8.2"}}</code> |
| resources.secret_backend_creds    |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"vault-backend-creds","namespace":"demo"},"stringData":{"aclToken":"\u003cacl-token\u003e"},"type":"Opaque"}</code>                                                                                                                                                                                                                                                                                                                                                                                     |
| resources.secret_backend_tls      |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"vault-backend-tls","namespace":"demo"},"stringData":{"ca.crt":"\u003cca-cert\u003e","client.crt":"\u003cclient-cert\u003e","client.key":"\u003cclient-key\u003e"},"type":"Opaque"}</code>                                                                                                                                                                                                                                                                                                              |
| resources.secret_config           |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"vault-config","namespace":"demo"},"stringData":{"vault.hcl":"\u003cdata\u003e"},"type":"Opaque"}</code>                                                                                                                                                                                                                                                                                                                                                                                                |
| resources.secret_unsealer_creds   |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"vault-unsealer-creds","namespace":"demo"},"stringData":{"access_key":"\u003caccess_key\u003e","secret_key":"\u003csecret_key\u003e"},"type":"Opaque"}</code>                                                                                                                                                                                                                                                                                                                                           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubevaultcom-vaultserver-editor bytebuilders-ui/kubevaultcom-vaultserver-editor -n default --create-namespace --version=v0.4.2 --set metadata.resource.group=kubevault.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubevaultcom-vaultserver-editor bytebuilders-ui/kubevaultcom-vaultserver-editor -n default --create-namespace --version=v0.4.2 --values values.yaml
```
