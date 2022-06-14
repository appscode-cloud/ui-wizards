# ComponentStatus Editor

[ComponentStatus Editor by AppsCode](https://byte.builders) - ComponentStatus Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/core-componentstatus-editor --version=v0.4.8
$ helm upgrade -i core-componentstatus-editor bytebuilders-ui/core-componentstatus-editor -n default --create-namespace --version=v0.4.8
```

## Introduction

This chart deploys a ComponentStatus Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `core-componentstatus-editor`:

```bash
$ helm upgrade -i core-componentstatus-editor bytebuilders-ui/core-componentstatus-editor -n default --create-namespace --version=v0.4.8
```

The command deploys a ComponentStatus Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `core-componentstatus-editor`:

```bash
$ helm uninstall core-componentstatus-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `core-componentstatus-editor` chart and their default values.

|     Parameter      | Description |           Default            |
|--------------------|-------------|------------------------------|
| apiVersion         |             | <code>v1</code>              |
| kind               |             | <code>ComponentStatus</code> |
| metadata.name      |             | <code>componentstatus</code> |
| metadata.namespace |             | <code>""</code>              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i core-componentstatus-editor bytebuilders-ui/core-componentstatus-editor -n default --create-namespace --version=v0.4.8 --set apiVersion=v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i core-componentstatus-editor bytebuilders-ui/core-componentstatus-editor -n default --create-namespace --version=v0.4.8 --values values.yaml
```
