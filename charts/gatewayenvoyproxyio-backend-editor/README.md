# Backend Editor

[Backend Editor by AppsCode](https://byte.builders) - Backend Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/gatewayenvoyproxyio-backend-editor --version=v0.5.0
$ helm upgrade -i gatewayenvoyproxyio-backend-editor appscode-charts-oci/gatewayenvoyproxyio-backend-editor -n default --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys a Backend Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `gatewayenvoyproxyio-backend-editor`:

```bash
$ helm upgrade -i gatewayenvoyproxyio-backend-editor appscode-charts-oci/gatewayenvoyproxyio-backend-editor -n default --create-namespace --version=v0.5.0
```

The command deploys a Backend Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `gatewayenvoyproxyio-backend-editor`:

```bash
$ helm uninstall gatewayenvoyproxyio-backend-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `gatewayenvoyproxyio-backend-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>gateway.envoyproxy.io/v1alpha1</code> |
| kind               |             | <code>Backend</code>                        |
| metadata.name      |             | <code>backend</code>                        |
| metadata.namespace |             | <code>default</code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i gatewayenvoyproxyio-backend-editor appscode-charts-oci/gatewayenvoyproxyio-backend-editor -n default --create-namespace --version=v0.5.0 --set apiVersion=gateway.envoyproxy.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i gatewayenvoyproxyio-backend-editor appscode-charts-oci/gatewayenvoyproxyio-backend-editor -n default --create-namespace --version=v0.5.0 --values values.yaml
```