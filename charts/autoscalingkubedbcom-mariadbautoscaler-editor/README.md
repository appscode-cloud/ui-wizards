# MariaDBAutoscaler Editor

[MariaDBAutoscaler Editor by AppsCode](https://byte.builders) - MariaDBAutoscaler Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install autoscalingkubedbcom-mariadbautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-mariadbautoscaler-editor -n default
```

## Introduction

This chart deploys a MariaDBAutoscaler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `autoscalingkubedbcom-mariadbautoscaler-editor`:

```console
$ helm install autoscalingkubedbcom-mariadbautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-mariadbautoscaler-editor -n default
```

The command deploys a MariaDBAutoscaler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `autoscalingkubedbcom-mariadbautoscaler-editor`:

```console
$ helm delete autoscalingkubedbcom-mariadbautoscaler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscalingkubedbcom-mariadbautoscaler-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | `autoscaling.kubedb.com/v1alpha1` |
| kind               |             | `MariaDBAutoscaler`               |
| metadata.name      |             | `mariadbautoscaler`               |
| metadata.namespace |             | `default`                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install autoscalingkubedbcom-mariadbautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-mariadbautoscaler-editor -n default --set apiVersion=autoscaling.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install autoscalingkubedbcom-mariadbautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-mariadbautoscaler-editor -n default --values values.yaml
```
