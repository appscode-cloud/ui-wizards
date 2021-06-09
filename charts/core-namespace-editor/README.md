# Namespace Editor

[Namespace Editor by AppsCode](https://byte.builders) - Namespace Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install core-namespace-editor bytebuilders-ui-dev/core-namespace-editor -n default
```

## Introduction

This chart deploys a Namespace Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `core-namespace-editor`:

```console
$ helm install core-namespace-editor bytebuilders-ui-dev/core-namespace-editor -n default
```

The command deploys a Namespace Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `core-namespace-editor`:

```console
$ helm delete core-namespace-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `core-namespace-editor` chart and their default values.

|   Parameter   | Description |   Default   |
|---------------|-------------|-------------|
| apiVersion    |             | `/v1`       |
| kind          |             | `Namespace` |
| metadata.name |             | `namespace` |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install core-namespace-editor bytebuilders-ui-dev/core-namespace-editor -n default --set apiVersion=/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install core-namespace-editor bytebuilders-ui-dev/core-namespace-editor -n default --values values.yaml
```
