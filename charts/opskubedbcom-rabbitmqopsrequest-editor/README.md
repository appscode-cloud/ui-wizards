# RabbitMQOpsRequest Editor

[RabbitMQOpsRequest Editor by AppsCode](https://appscode.com) - RabbitMQOpsRequest Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/opskubedbcom-rabbitmqopsrequest-editor --version=v0.13.0
$ helm upgrade -i opskubedbcom-rabbitmqopsrequest-editor appscode-charts-oci/opskubedbcom-rabbitmqopsrequest-editor -n default --create-namespace --version=v0.13.0
```

## Introduction

This chart deploys a RabbitMQOpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `opskubedbcom-rabbitmqopsrequest-editor`:

```bash
$ helm upgrade -i opskubedbcom-rabbitmqopsrequest-editor appscode-charts-oci/opskubedbcom-rabbitmqopsrequest-editor -n default --create-namespace --version=v0.13.0
```

The command deploys a RabbitMQOpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `opskubedbcom-rabbitmqopsrequest-editor`:

```bash
$ helm uninstall opskubedbcom-rabbitmqopsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-rabbitmqopsrequest-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>ops.kubedb.com/v1alpha1</code> |
| kind               |             | <code>RabbitMQOpsRequest</code>      |
| metadata.name      |             | <code>rabbitmqopsrequest</code>      |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i opskubedbcom-rabbitmqopsrequest-editor appscode-charts-oci/opskubedbcom-rabbitmqopsrequest-editor -n default --create-namespace --version=v0.13.0 --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i opskubedbcom-rabbitmqopsrequest-editor appscode-charts-oci/opskubedbcom-rabbitmqopsrequest-editor -n default --create-namespace --version=v0.13.0 --values values.yaml
```
