# MySQLAutoscaler Editor

[MySQLAutoscaler Editor by AppsCode](https://byte.builders) - MySQLAutoscaler Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install autoscalingkubedbcom-mysqlautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-mysqlautoscaler-editor -n default
```

## Introduction

This chart deploys a MySQLAutoscaler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `autoscalingkubedbcom-mysqlautoscaler-editor`:

```console
$ helm install autoscalingkubedbcom-mysqlautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-mysqlautoscaler-editor -n default
```

The command deploys a MySQLAutoscaler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `autoscalingkubedbcom-mysqlautoscaler-editor`:

```console
$ helm delete autoscalingkubedbcom-mysqlautoscaler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscalingkubedbcom-mysqlautoscaler-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | `autoscaling.kubedb.com/v1alpha1` |
| kind               |             | `MySQLAutoscaler`                 |
| metadata.name      |             | `mysqlautoscaler`                 |
| metadata.namespace |             | `default`                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install autoscalingkubedbcom-mysqlautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-mysqlautoscaler-editor -n default --set apiVersion=autoscaling.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install autoscalingkubedbcom-mysqlautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-mysqlautoscaler-editor -n default --values values.yaml
```
