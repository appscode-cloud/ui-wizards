# ElasticsearchAutoscaler Editor

[ElasticsearchAutoscaler Editor by AppsCode](https://byte.builders) - ElasticsearchAutoscaler Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install autoscalingkubedbcom-elasticsearchautoscaler-editor bytebuilders-ui-dev/autoscalingkubedbcom-elasticsearchautoscaler-editor -n default
```

## Introduction

This chart deploys a ElasticsearchAutoscaler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `autoscalingkubedbcom-elasticsearchautoscaler-editor`:

```console
$ helm install autoscalingkubedbcom-elasticsearchautoscaler-editor bytebuilders-ui-dev/autoscalingkubedbcom-elasticsearchautoscaler-editor -n default
```

The command deploys a ElasticsearchAutoscaler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `autoscalingkubedbcom-elasticsearchautoscaler-editor`:

```console
$ helm delete autoscalingkubedbcom-elasticsearchautoscaler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscalingkubedbcom-elasticsearchautoscaler-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | `autoscaling.kubedb.com/v1alpha1` |
| kind               |             | `ElasticsearchAutoscaler`         |
| metadata.name      |             | `elasticsearchautoscaler`         |
| metadata.namespace |             | `default`                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install autoscalingkubedbcom-elasticsearchautoscaler-editor bytebuilders-ui-dev/autoscalingkubedbcom-elasticsearchautoscaler-editor -n default --set apiVersion=autoscaling.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install autoscalingkubedbcom-elasticsearchautoscaler-editor bytebuilders-ui-dev/autoscalingkubedbcom-elasticsearchautoscaler-editor -n default --values values.yaml
```
