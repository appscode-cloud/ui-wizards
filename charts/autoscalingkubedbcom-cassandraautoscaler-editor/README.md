# CassandraAutoscaler Editor

[CassandraAutoscaler Editor by AppsCode](https://appscode.com) - CassandraAutoscaler Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/autoscalingkubedbcom-cassandraautoscaler-editor --version=v0.6.0
$ helm upgrade -i autoscalingkubedbcom-cassandraautoscaler-editor appscode-charts-oci/autoscalingkubedbcom-cassandraautoscaler-editor -n default --create-namespace --version=v0.6.0
```

## Introduction

This chart deploys a CassandraAutoscaler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `autoscalingkubedbcom-cassandraautoscaler-editor`:

```bash
$ helm upgrade -i autoscalingkubedbcom-cassandraautoscaler-editor appscode-charts-oci/autoscalingkubedbcom-cassandraautoscaler-editor -n default --create-namespace --version=v0.6.0
```

The command deploys a CassandraAutoscaler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `autoscalingkubedbcom-cassandraautoscaler-editor`:

```bash
$ helm uninstall autoscalingkubedbcom-cassandraautoscaler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscalingkubedbcom-cassandraautoscaler-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>autoscaling.kubedb.com/v1alpha1</code> |
| kind               |             | <code>CassandraAutoscaler</code>             |
| metadata.name      |             | <code>cassandraautoscaler</code>             |
| metadata.namespace |             | <code>default</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i autoscalingkubedbcom-cassandraautoscaler-editor appscode-charts-oci/autoscalingkubedbcom-cassandraautoscaler-editor -n default --create-namespace --version=v0.6.0 --set apiVersion=autoscaling.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i autoscalingkubedbcom-cassandraautoscaler-editor appscode-charts-oci/autoscalingkubedbcom-cassandraautoscaler-editor -n default --create-namespace --version=v0.6.0 --values values.yaml
```