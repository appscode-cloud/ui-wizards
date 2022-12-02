# ProxySQLAutoscaler Editor

[ProxySQLAutoscaler Editor by AppsCode](https://byte.builders) - ProxySQLAutoscaler Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/autoscalingkubedbcom-proxysqlautoscaler-editor --version=v0.4.13
$ helm upgrade -i autoscalingkubedbcom-proxysqlautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-proxysqlautoscaler-editor -n default --create-namespace --version=v0.4.13
```

## Introduction

This chart deploys a ProxySQLAutoscaler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `autoscalingkubedbcom-proxysqlautoscaler-editor`:

```bash
$ helm upgrade -i autoscalingkubedbcom-proxysqlautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-proxysqlautoscaler-editor -n default --create-namespace --version=v0.4.13
```

The command deploys a ProxySQLAutoscaler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `autoscalingkubedbcom-proxysqlautoscaler-editor`:

```bash
$ helm uninstall autoscalingkubedbcom-proxysqlautoscaler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscalingkubedbcom-proxysqlautoscaler-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>autoscaling.kubedb.com/v1alpha1</code> |
| kind               |             | <code>ProxySQLAutoscaler</code>              |
| metadata.name      |             | <code>proxysqlautoscaler</code>              |
| metadata.namespace |             | <code>default</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i autoscalingkubedbcom-proxysqlautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-proxysqlautoscaler-editor -n default --create-namespace --version=v0.4.13 --set apiVersion=autoscaling.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i autoscalingkubedbcom-proxysqlautoscaler-editor bytebuilders-ui/autoscalingkubedbcom-proxysqlautoscaler-editor -n default --create-namespace --version=v0.4.13 --values values.yaml
```
