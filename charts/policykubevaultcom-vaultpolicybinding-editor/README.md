# VaultPolicyBinding Editor

[VaultPolicyBinding Editor by AppsCode](https://byte.builders) - VaultPolicyBinding Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install policykubevaultcom-vaultpolicybinding-editor bytebuilders-ui/policykubevaultcom-vaultpolicybinding-editor -n default
```

## Introduction

This chart deploys a VaultPolicyBinding Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `policykubevaultcom-vaultpolicybinding-editor`:

```console
$ helm install policykubevaultcom-vaultpolicybinding-editor bytebuilders-ui/policykubevaultcom-vaultpolicybinding-editor -n default
```

The command deploys a VaultPolicyBinding Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `policykubevaultcom-vaultpolicybinding-editor`:

```console
$ helm delete policykubevaultcom-vaultpolicybinding-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `policykubevaultcom-vaultpolicybinding-editor` chart and their default values.

|     Parameter      | Description |             Default             |
|--------------------|-------------|---------------------------------|
| apiVersion         |             | `policy.kubevault.com/v1alpha1` |
| kind               |             | `VaultPolicyBinding`            |
| metadata.name      |             | `vaultpolicybinding`            |
| metadata.namespace |             | `default`                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install policykubevaultcom-vaultpolicybinding-editor bytebuilders-ui/policykubevaultcom-vaultpolicybinding-editor -n default --set apiVersion=policy.kubevault.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install policykubevaultcom-vaultpolicybinding-editor bytebuilders-ui/policykubevaultcom-vaultpolicybinding-editor -n default --values values.yaml
```
