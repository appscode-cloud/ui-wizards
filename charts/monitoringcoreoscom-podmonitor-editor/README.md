# PodMonitor Editor

[PodMonitor Editor by AppsCode](https://byte.builders) - PodMonitor Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/monitoringcoreoscom-podmonitor-editor --version=v0.4.10
$ helm upgrade -i monitoringcoreoscom-podmonitor-editor bytebuilders-ui/monitoringcoreoscom-podmonitor-editor -n default --create-namespace --version=v0.4.10
```

## Introduction

This chart deploys a PodMonitor Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `monitoringcoreoscom-podmonitor-editor`:

```bash
$ helm upgrade -i monitoringcoreoscom-podmonitor-editor bytebuilders-ui/monitoringcoreoscom-podmonitor-editor -n default --create-namespace --version=v0.4.10
```

The command deploys a PodMonitor Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `monitoringcoreoscom-podmonitor-editor`:

```bash
$ helm uninstall monitoringcoreoscom-podmonitor-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `monitoringcoreoscom-podmonitor-editor` chart and their default values.

|     Parameter      | Description |                Default                |
|--------------------|-------------|---------------------------------------|
| apiVersion         |             | <code>monitoring.coreos.com/v1</code> |
| kind               |             | <code>PodMonitor</code>               |
| metadata.name      |             | <code>podmonitor</code>               |
| metadata.namespace |             | <code>default</code>                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i monitoringcoreoscom-podmonitor-editor bytebuilders-ui/monitoringcoreoscom-podmonitor-editor -n default --create-namespace --version=v0.4.10 --set apiVersion=monitoring.coreos.com/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i monitoringcoreoscom-podmonitor-editor bytebuilders-ui/monitoringcoreoscom-podmonitor-editor -n default --create-namespace --version=v0.4.10 --values values.yaml
```
