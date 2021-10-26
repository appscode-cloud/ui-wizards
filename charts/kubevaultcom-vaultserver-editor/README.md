# VaultServer Editor

[VaultServer Editor by AppsCode](https://byte.builders) - VaultServer Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install kubevaultcom-vaultserver-editor bytebuilders-ui/kubevaultcom-vaultserver-editor -n default
```

## Introduction

This chart deploys a VaultServer Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `kubevaultcom-vaultserver-editor`:

```console
$ helm install kubevaultcom-vaultserver-editor bytebuilders-ui/kubevaultcom-vaultserver-editor -n default
```

The command deploys a VaultServer Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubevaultcom-vaultserver-editor`:

```console
$ helm delete kubevaultcom-vaultserver-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubevaultcom-vaultserver-editor` chart and their default values.

|             Parameter             | Description |                                                                                                                                                                                                                                                                         Default                                                                                                                                                                                                                                                                          |
|-----------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group           |             | `kubevault.com`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.version         |             | `v1alpha1`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.name            |             | `vaultservers`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.resource.kind            |             | `VaultServer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.resource.scope           |             | `Namespaced`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.release.name             |             | `RELEASE-NAME`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.release.namespace        |             | `default`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| resources.kubevaultComVaultServer |             | `{"apiVersion":"kubevault.com/v1alpha1","kind":"VaultServer","metadata":{"name":"vault","namespace":"demo"},"spec":{"backend":{"consul":{"aclTokenSecretName":"vault-backend-creds","address":"http://consul-server.default.svc:8500","path":"vault","tlsSecretName":"vault-backend-tls"}},"configSecret":{"name":"vault-config"},"replicas":1,"unsealer":{"mode":{"awsKmsSsm":{"credentialSecret":"vault-unsealer-creds","kmsKeyID":"\u003ckms-key-id\u003e","region":"\u003cregion\u003e"}},"secretShares":5,"secretThreshold":3},"version":"1.8.2"}}` |
| resources.secret_backend_creds    |             | `{"apiVersion":"v1","kind":"Secret","metadata":{"name":"vault-backend-creds","namespace":"demo"},"stringData":{"aclToken":"\u003cacl-token\u003e"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                                                                                                     |
| resources.secret_backend_tls      |             | `{"apiVersion":"v1","kind":"Secret","metadata":{"name":"vault-backend-tls","namespace":"demo"},"stringData":{"ca.crt":"\u003cca-cert\u003e","client.crt":"\u003cclient-cert\u003e","client.key":"\u003cclient-key\u003e"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                              |
| resources.secret_config           |             | `{"apiVersion":"v1","kind":"Secret","metadata":{"name":"vault-config","namespace":"demo"},"stringData":{"vault.hcl":"\u003cdata\u003e"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                                                                                                                |
| resources.secret_unsealer_creds   |             | `{"apiVersion":"v1","kind":"Secret","metadata":{"name":"vault-unsealer-creds","namespace":"demo"},"stringData":{"access_key":"\u003caccess_key\u003e","secret_key":"\u003csecret_key\u003e"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                                                           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubevaultcom-vaultserver-editor bytebuilders-ui/kubevaultcom-vaultserver-editor -n default --set metadata.resource.group=kubevault.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubevaultcom-vaultserver-editor bytebuilders-ui/kubevaultcom-vaultserver-editor -n default --values values.yaml
```
