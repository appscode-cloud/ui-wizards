# PgBouncerPoolOverview Editor

[PgBouncerPoolOverview Editor by AppsCode](https://appscode.com) - PgBouncerPoolOverview Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/uikubedbcom-pgbouncerpooloverview-editor --version=v0.21.0
$ helm upgrade -i uikubedbcom-pgbouncerpooloverview-editor appscode/uikubedbcom-pgbouncerpooloverview-editor -n default --create-namespace --version=v0.21.0
```

## Introduction

This chart deploys a PgBouncerPoolOverview Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uikubedbcom-pgbouncerpooloverview-editor`:

```bash
$ helm upgrade -i uikubedbcom-pgbouncerpooloverview-editor appscode/uikubedbcom-pgbouncerpooloverview-editor -n default --create-namespace --version=v0.21.0
```

The command deploys a PgBouncerPoolOverview Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uikubedbcom-pgbouncerpooloverview-editor`:

```bash
$ helm uninstall uikubedbcom-pgbouncerpooloverview-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uikubedbcom-pgbouncerpooloverview-editor` chart and their default values.

|     Parameter      | Description |               Default               |
|--------------------|-------------|-------------------------------------|
| apiVersion         |             | <code>ui.kubedb.com/v1alpha1</code> |
| kind               |             | <code>PgBouncerPoolOverview</code>  |
| metadata.name      |             | <code>pgbouncerpooloverview</code>  |
| metadata.namespace |             | <code>default</code>                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uikubedbcom-pgbouncerpooloverview-editor appscode/uikubedbcom-pgbouncerpooloverview-editor -n default --create-namespace --version=v0.21.0 --set apiVersion=ui.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uikubedbcom-pgbouncerpooloverview-editor appscode/uikubedbcom-pgbouncerpooloverview-editor -n default --create-namespace --version=v0.21.0 --values values.yaml
```
