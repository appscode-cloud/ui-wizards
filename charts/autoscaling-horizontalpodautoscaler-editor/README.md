# HorizontalPodAutoscaler Editor

[HorizontalPodAutoscaler Editor by AppsCode](https://byte.builders) - HorizontalPodAutoscaler Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install autoscaling-horizontalpodautoscaler-editor bytebuilders-ui-dev/autoscaling-horizontalpodautoscaler-editor -n default
```

## Introduction

This chart deploys a HorizontalPodAutoscaler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `autoscaling-horizontalpodautoscaler-editor`:

```console
$ helm install autoscaling-horizontalpodautoscaler-editor bytebuilders-ui-dev/autoscaling-horizontalpodautoscaler-editor -n default
```

The command deploys a HorizontalPodAutoscaler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `autoscaling-horizontalpodautoscaler-editor`:

```console
$ helm delete autoscaling-horizontalpodautoscaler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscaling-horizontalpodautoscaler-editor` chart and their default values.

|     Parameter      | Description |          Default          |
|--------------------|-------------|---------------------------|
| apiVersion         |             | `autoscaling/v2beta2`     |
| kind               |             | `HorizontalPodAutoscaler` |
| metadata.name      |             | `horizontalpodautoscaler` |
| metadata.namespace |             | `default`                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install autoscaling-horizontalpodautoscaler-editor bytebuilders-ui-dev/autoscaling-horizontalpodautoscaler-editor -n default --set apiVersion=autoscaling/v2beta2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install autoscaling-horizontalpodautoscaler-editor bytebuilders-ui-dev/autoscaling-horizontalpodautoscaler-editor -n default --values values.yaml
```
