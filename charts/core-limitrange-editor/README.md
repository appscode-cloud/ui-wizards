# LimitRange Editor

[LimitRange Editor by AppsCode](https://appscode.com) - LimitRange Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/core-limitrange-editor --version=v0.21.0
$ helm upgrade -i core-limitrange-editor appscode/core-limitrange-editor -n default --create-namespace --version=v0.21.0
```

## Introduction

This chart deploys a LimitRange Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `core-limitrange-editor`:

```bash
$ helm upgrade -i core-limitrange-editor appscode/core-limitrange-editor -n default --create-namespace --version=v0.21.0
```

The command deploys a LimitRange Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `core-limitrange-editor`:

```bash
$ helm uninstall core-limitrange-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `core-limitrange-editor` chart and their default values.

|     Parameter      | Description |         Default         |
|--------------------|-------------|-------------------------|
| apiVersion         |             | <code>v1</code>         |
| kind               |             | <code>LimitRange</code> |
| metadata.name      |             | <code>limitrange</code> |
| metadata.namespace |             | <code>default</code>    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i core-limitrange-editor appscode/core-limitrange-editor -n default --create-namespace --version=v0.21.0 --set apiVersion=v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i core-limitrange-editor appscode/core-limitrange-editor -n default --create-namespace --version=v0.21.0 --values values.yaml
```
