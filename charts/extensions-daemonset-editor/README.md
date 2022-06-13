# DaemonSet Editor

[DaemonSet Editor by AppsCode](https://byte.builders) - DaemonSet Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/extensions-daemonset-editor --version=v0.4.6
$ helm upgrade -i extensions-daemonset-editor bytebuilders-ui/extensions-daemonset-editor -n default --create-namespace --version=v0.4.6
```

## Introduction

This chart deploys a DaemonSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `extensions-daemonset-editor`:

```bash
$ helm upgrade -i extensions-daemonset-editor bytebuilders-ui/extensions-daemonset-editor -n default --create-namespace --version=v0.4.6
```

The command deploys a DaemonSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `extensions-daemonset-editor`:

```bash
$ helm uninstall extensions-daemonset-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `extensions-daemonset-editor` chart and their default values.

|     Parameter      | Description |             Default             |
|--------------------|-------------|---------------------------------|
| apiVersion         |             | <code>extensions/v1beta1</code> |
| kind               |             | <code>DaemonSet</code>          |
| metadata.name      |             | <code>daemonset</code>          |
| metadata.namespace |             | <code>default</code>            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i extensions-daemonset-editor bytebuilders-ui/extensions-daemonset-editor -n default --create-namespace --version=v0.4.6 --set apiVersion=extensions/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i extensions-daemonset-editor bytebuilders-ui/extensions-daemonset-editor -n default --create-namespace --version=v0.4.6 --values values.yaml
```
