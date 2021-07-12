# VaultPolicy Editor

[VaultPolicy Editor by AppsCode](https://byte.builders) - VaultPolicy Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install policykubevaultcom-vaultpolicy-editor bytebuilders-ui/policykubevaultcom-vaultpolicy-editor -n default
```

## Introduction

This chart deploys a VaultPolicy Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `policykubevaultcom-vaultpolicy-editor`:

```console
$ helm install policykubevaultcom-vaultpolicy-editor bytebuilders-ui/policykubevaultcom-vaultpolicy-editor -n default
```

The command deploys a VaultPolicy Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `policykubevaultcom-vaultpolicy-editor`:

```console
$ helm delete policykubevaultcom-vaultpolicy-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `policykubevaultcom-vaultpolicy-editor` chart and their default values.

|     Parameter      | Description |             Default             |
|--------------------|-------------|---------------------------------|
| apiVersion         |             | `policy.kubevault.com/v1alpha1` |
| kind               |             | `VaultPolicy`                   |
| metadata.name      |             | `vaultpolicy`                   |
| metadata.namespace |             | `default`                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install policykubevaultcom-vaultpolicy-editor bytebuilders-ui/policykubevaultcom-vaultpolicy-editor -n default --set apiVersion=policy.kubevault.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install policykubevaultcom-vaultpolicy-editor bytebuilders-ui/policykubevaultcom-vaultpolicy-editor -n default --values values.yaml
```
