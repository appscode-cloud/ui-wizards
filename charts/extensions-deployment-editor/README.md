# Deployment Editor

[Deployment Editor by AppsCode](https://byte.builders) - Deployment Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install extensions-deployment-editor bytebuilders-ui/extensions-deployment-editor -n default
```

## Introduction

This chart deploys a Deployment Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `extensions-deployment-editor`:

```console
$ helm install extensions-deployment-editor bytebuilders-ui/extensions-deployment-editor -n default
```

The command deploys a Deployment Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `extensions-deployment-editor`:

```console
$ helm delete extensions-deployment-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `extensions-deployment-editor` chart and their default values.

|     Parameter      | Description |       Default        |
|--------------------|-------------|----------------------|
| apiVersion         |             | `extensions/v1beta1` |
| kind               |             | `Deployment`         |
| metadata.name      |             | `deployment`         |
| metadata.namespace |             | `default`            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install extensions-deployment-editor bytebuilders-ui/extensions-deployment-editor -n default --set apiVersion=extensions/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install extensions-deployment-editor bytebuilders-ui/extensions-deployment-editor -n default --values values.yaml
```
