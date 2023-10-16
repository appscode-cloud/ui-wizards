# Metric Editor

[Metric Editor by AppsCode](https://byte.builders) - Metric Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/logginggcpupboundio-metric-editor --version=v0.4.18
$ helm upgrade -i logginggcpupboundio-metric-editor bytebuilders-ui/logginggcpupboundio-metric-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a Metric Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `logginggcpupboundio-metric-editor`:

```bash
$ helm upgrade -i logginggcpupboundio-metric-editor bytebuilders-ui/logginggcpupboundio-metric-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a Metric Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `logginggcpupboundio-metric-editor`:

```bash
$ helm uninstall logginggcpupboundio-metric-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `logginggcpupboundio-metric-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>logging.gcp.upbound.io/v1beta1</code> |
| kind               |             | <code>Metric</code>                         |
| metadata.name      |             | <code>metric</code>                         |
| metadata.namespace |             | <code>""</code>                             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i logginggcpupboundio-metric-editor bytebuilders-ui/logginggcpupboundio-metric-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=logging.gcp.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i logginggcpupboundio-metric-editor bytebuilders-ui/logginggcpupboundio-metric-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
