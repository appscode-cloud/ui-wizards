# WeaviateAutoscaler Editor

[WeaviateAutoscaler Editor by AppsCode](https://appscode.com) - WeaviateAutoscaler Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/autoscalingkubedbcom-weaviateautoscaler-editor --version=v0.36.0
$ helm upgrade -i autoscalingkubedbcom-weaviateautoscaler-editor appscode/autoscalingkubedbcom-weaviateautoscaler-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a WeaviateAutoscaler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `autoscalingkubedbcom-weaviateautoscaler-editor`:

```bash
$ helm upgrade -i autoscalingkubedbcom-weaviateautoscaler-editor appscode/autoscalingkubedbcom-weaviateautoscaler-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a WeaviateAutoscaler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `autoscalingkubedbcom-weaviateautoscaler-editor`:

```bash
$ helm uninstall autoscalingkubedbcom-weaviateautoscaler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscalingkubedbcom-weaviateautoscaler-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>autoscaling.kubedb.com/v1alpha1</code> |
| kind               |             | <code>WeaviateAutoscaler</code>              |
| metadata.name      |             | <code>weaviateautoscaler</code>              |
| metadata.namespace |             | <code>default</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i autoscalingkubedbcom-weaviateautoscaler-editor appscode/autoscalingkubedbcom-weaviateautoscaler-editor -n default --create-namespace --version=v0.36.0 --set apiVersion=autoscaling.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i autoscalingkubedbcom-weaviateautoscaler-editor appscode/autoscalingkubedbcom-weaviateautoscaler-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
