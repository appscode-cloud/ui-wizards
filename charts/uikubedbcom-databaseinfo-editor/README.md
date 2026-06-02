# DatabaseConfiguration Editor

[DatabaseConfiguration Editor by AppsCode](https://appscode.com) - DatabaseConfiguration Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/uikubedbcom-databaseconfiguration-editor --version=v0.33.0
$ helm upgrade -i uikubedbcom-databaseconfiguration-editor appscode/uikubedbcom-databaseconfiguration-editor -n default --create-namespace --version=v0.33.0
```

## Introduction

This chart deploys a DatabaseConfiguration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uikubedbcom-databaseconfiguration-editor`:

```bash
$ helm upgrade -i uikubedbcom-databaseconfiguration-editor appscode/uikubedbcom-databaseconfiguration-editor -n default --create-namespace --version=v0.33.0
```

The command deploys a DatabaseConfiguration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uikubedbcom-databaseconfiguration-editor`:

```bash
$ helm uninstall uikubedbcom-databaseconfiguration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uikubedbcom-databaseconfiguration-editor` chart and their default values.

|     Parameter      | Description |               Default               |
|--------------------|-------------|-------------------------------------|
| apiVersion         |             | <code>ui.kubedb.com/v1alpha1</code> |
| kind               |             | <code>DatabaseConfiguration</code>  |
| metadata.name      |             | <code>databaseconfiguration</code>  |
| metadata.namespace |             | <code>default</code>                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uikubedbcom-databaseconfiguration-editor appscode/uikubedbcom-databaseconfiguration-editor -n default --create-namespace --version=v0.33.0 --set apiVersion=ui.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uikubedbcom-databaseconfiguration-editor appscode/uikubedbcom-databaseconfiguration-editor -n default --create-namespace --version=v0.33.0 --values values.yaml
```
