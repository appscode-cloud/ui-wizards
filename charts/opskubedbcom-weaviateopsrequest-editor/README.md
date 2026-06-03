# WeaviateOpsRequest Editor

[WeaviateOpsRequest Editor by AppsCode](https://appscode.com) - WeaviateOpsRequest Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/opskubedbcom-weaviateopsrequest-editor --version=v0.34.0
$ helm upgrade -i opskubedbcom-weaviateopsrequest-editor appscode/opskubedbcom-weaviateopsrequest-editor -n default --create-namespace --version=v0.34.0
```

## Introduction

This chart deploys a WeaviateOpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `opskubedbcom-weaviateopsrequest-editor`:

```bash
$ helm upgrade -i opskubedbcom-weaviateopsrequest-editor appscode/opskubedbcom-weaviateopsrequest-editor -n default --create-namespace --version=v0.34.0
```

The command deploys a WeaviateOpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `opskubedbcom-weaviateopsrequest-editor`:

```bash
$ helm uninstall opskubedbcom-weaviateopsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-weaviateopsrequest-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>ops.kubedb.com/v1alpha1</code> |
| kind               |             | <code>WeaviateOpsRequest</code>      |
| metadata.name      |             | <code>weaviateopsrequest</code>      |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i opskubedbcom-weaviateopsrequest-editor appscode/opskubedbcom-weaviateopsrequest-editor -n default --create-namespace --version=v0.34.0 --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i opskubedbcom-weaviateopsrequest-editor appscode/opskubedbcom-weaviateopsrequest-editor -n default --create-namespace --version=v0.34.0 --values values.yaml
```
