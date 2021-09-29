# VerticalPodAutoscalerCheckpoint Editor

[VerticalPodAutoscalerCheckpoint Editor by AppsCode](https://byte.builders) - VerticalPodAutoscalerCheckpoint Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install autoscalingk8sio-verticalpodautoscalercheckpoint-editor bytebuilders-ui/autoscalingk8sio-verticalpodautoscalercheckpoint-editor -n default
```

## Introduction

This chart deploys a VerticalPodAutoscalerCheckpoint Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `autoscalingk8sio-verticalpodautoscalercheckpoint-editor`:

```console
$ helm install autoscalingk8sio-verticalpodautoscalercheckpoint-editor bytebuilders-ui/autoscalingk8sio-verticalpodautoscalercheckpoint-editor -n default
```

The command deploys a VerticalPodAutoscalerCheckpoint Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `autoscalingk8sio-verticalpodautoscalercheckpoint-editor`:

```console
$ helm delete autoscalingk8sio-verticalpodautoscalercheckpoint-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscalingk8sio-verticalpodautoscalercheckpoint-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | `autoscaling.k8s.io/v1`           |
| kind               |             | `VerticalPodAutoscalerCheckpoint` |
| metadata.name      |             | `verticalpodautoscalercheckpoint` |
| metadata.namespace |             | `default`                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install autoscalingk8sio-verticalpodautoscalercheckpoint-editor bytebuilders-ui/autoscalingk8sio-verticalpodautoscalercheckpoint-editor -n default --set apiVersion=autoscaling.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install autoscalingk8sio-verticalpodautoscalercheckpoint-editor bytebuilders-ui/autoscalingk8sio-verticalpodautoscalercheckpoint-editor -n default --values values.yaml
```
