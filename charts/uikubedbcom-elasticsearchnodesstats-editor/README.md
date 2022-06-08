# ElasticsearchNodesStats Editor

[ElasticsearchNodesStats Editor by AppsCode](https://byte.builders) - ElasticsearchNodesStats Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/uikubedbcom-elasticsearchnodesstats-editor --version=v0.4.5
$ helm upgrade -i uikubedbcom-elasticsearchnodesstats-editor bytebuilders-ui/uikubedbcom-elasticsearchnodesstats-editor -n default --create-namespace --version=v0.4.5
```

## Introduction

This chart deploys a ElasticsearchNodesStats Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `uikubedbcom-elasticsearchnodesstats-editor`:

```bash
$ helm upgrade -i uikubedbcom-elasticsearchnodesstats-editor bytebuilders-ui/uikubedbcom-elasticsearchnodesstats-editor -n default --create-namespace --version=v0.4.5
```

The command deploys a ElasticsearchNodesStats Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uikubedbcom-elasticsearchnodesstats-editor`:

```bash
$ helm uninstall uikubedbcom-elasticsearchnodesstats-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uikubedbcom-elasticsearchnodesstats-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>ui.kubedb.com/v1alpha1</code>  |
| kind               |             | <code>ElasticsearchNodesStats</code> |
| metadata.name      |             | <code>elasticsearchnodesstats</code> |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uikubedbcom-elasticsearchnodesstats-editor bytebuilders-ui/uikubedbcom-elasticsearchnodesstats-editor -n default --create-namespace --version=v0.4.5 --set apiVersion=ui.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uikubedbcom-elasticsearchnodesstats-editor bytebuilders-ui/uikubedbcom-elasticsearchnodesstats-editor -n default --create-namespace --version=v0.4.5 --values values.yaml
```
