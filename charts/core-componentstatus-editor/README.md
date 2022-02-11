# ComponentStatus Editor

[ComponentStatus Editor by AppsCode](https://byte.builders) - ComponentStatus Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install core-componentstatus-editor bytebuilders-ui/core-componentstatus-editor -n default
```

## Introduction

This chart deploys a ComponentStatus Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `core-componentstatus-editor`:

```console
$ helm install core-componentstatus-editor bytebuilders-ui/core-componentstatus-editor -n default
```

The command deploys a ComponentStatus Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `core-componentstatus-editor`:

```console
$ helm delete core-componentstatus-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `core-componentstatus-editor` chart and their default values.

|   Parameter   | Description |           Default            |
|---------------|-------------|------------------------------|
| apiVersion    |             | <code>v1</code>              |
| kind          |             | <code>ComponentStatus</code> |
| metadata.name |             | <code>componentstatus</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install core-componentstatus-editor bytebuilders-ui/core-componentstatus-editor -n default --set apiVersion=v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install core-componentstatus-editor bytebuilders-ui/core-componentstatus-editor -n default --values values.yaml
```
