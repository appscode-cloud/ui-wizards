# ClusterGateway Editor

[ClusterGateway Editor by AppsCode](https://appscode.com) - ClusterGateway Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/gatewayopenclustermanagementio-clustergateway-editor --version=v0.5.0
$ helm upgrade -i gatewayopenclustermanagementio-clustergateway-editor appscode-charts-oci/gatewayopenclustermanagementio-clustergateway-editor -n default --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys a ClusterGateway Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `gatewayopenclustermanagementio-clustergateway-editor`:

```bash
$ helm upgrade -i gatewayopenclustermanagementio-clustergateway-editor appscode-charts-oci/gatewayopenclustermanagementio-clustergateway-editor -n default --create-namespace --version=v0.5.0
```

The command deploys a ClusterGateway Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `gatewayopenclustermanagementio-clustergateway-editor`:

```bash
$ helm uninstall gatewayopenclustermanagementio-clustergateway-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `gatewayopenclustermanagementio-clustergateway-editor` chart and their default values.

|     Parameter      | Description |                         Default                          |
|--------------------|-------------|----------------------------------------------------------|
| apiVersion         |             | <code>gateway.open-cluster-management.io/v1alpha1</code> |
| kind               |             | <code>ClusterGateway</code>                              |
| metadata.name      |             | <code>clustergateway</code>                              |
| metadata.namespace |             | <code>default</code>                                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i gatewayopenclustermanagementio-clustergateway-editor appscode-charts-oci/gatewayopenclustermanagementio-clustergateway-editor -n default --create-namespace --version=v0.5.0 --set apiVersion=gateway.open-cluster-management.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i gatewayopenclustermanagementio-clustergateway-editor appscode-charts-oci/gatewayopenclustermanagementio-clustergateway-editor -n default --create-namespace --version=v0.5.0 --values values.yaml
```
