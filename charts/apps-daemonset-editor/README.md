# DaemonSet Editor

[DaemonSet Editor by AppsCode](https://byte.builders) - DaemonSet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/apps-daemonset-editor --version=v0.4.21
$ helm upgrade -i apps-daemonset-editor appscode-charts-oci/apps-daemonset-editor -n default --create-namespace --version=v0.4.21
```

## Introduction

This chart deploys a DaemonSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `apps-daemonset-editor`:

```bash
$ helm upgrade -i apps-daemonset-editor appscode-charts-oci/apps-daemonset-editor -n default --create-namespace --version=v0.4.21
```

The command deploys a DaemonSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `apps-daemonset-editor`:

```bash
$ helm uninstall apps-daemonset-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `apps-daemonset-editor` chart and their default values.

|     Parameter      | Description |        Default         |
|--------------------|-------------|------------------------|
| apiVersion         |             | <code>apps/v1</code>   |
| kind               |             | <code>DaemonSet</code> |
| metadata.name      |             | <code>daemonset</code> |
| metadata.namespace |             | <code>default</code>   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i apps-daemonset-editor appscode-charts-oci/apps-daemonset-editor -n default --create-namespace --version=v0.4.21 --set apiVersion=apps/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i apps-daemonset-editor appscode-charts-oci/apps-daemonset-editor -n default --create-namespace --version=v0.4.21 --values values.yaml
```
