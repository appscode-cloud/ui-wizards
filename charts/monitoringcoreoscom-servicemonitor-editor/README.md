# ServiceMonitor Editor

[ServiceMonitor Editor by AppsCode](https://byte.builders) - ServiceMonitor Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/monitoringcoreoscom-servicemonitor-editor --version=v0.4.7
$ helm upgrade -i monitoringcoreoscom-servicemonitor-editor bytebuilders-ui/monitoringcoreoscom-servicemonitor-editor -n default --create-namespace --version=v0.4.7
```

## Introduction

This chart deploys a ServiceMonitor Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `monitoringcoreoscom-servicemonitor-editor`:

```bash
$ helm upgrade -i monitoringcoreoscom-servicemonitor-editor bytebuilders-ui/monitoringcoreoscom-servicemonitor-editor -n default --create-namespace --version=v0.4.7
```

The command deploys a ServiceMonitor Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `monitoringcoreoscom-servicemonitor-editor`:

```bash
$ helm uninstall monitoringcoreoscom-servicemonitor-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `monitoringcoreoscom-servicemonitor-editor` chart and their default values.

|     Parameter      | Description |                Default                |
|--------------------|-------------|---------------------------------------|
| apiVersion         |             | <code>monitoring.coreos.com/v1</code> |
| kind               |             | <code>ServiceMonitor</code>           |
| metadata.name      |             | <code>servicemonitor</code>           |
| metadata.namespace |             | <code>default</code>                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i monitoringcoreoscom-servicemonitor-editor bytebuilders-ui/monitoringcoreoscom-servicemonitor-editor -n default --create-namespace --version=v0.4.7 --set apiVersion=monitoring.coreos.com/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i monitoringcoreoscom-servicemonitor-editor bytebuilders-ui/monitoringcoreoscom-servicemonitor-editor -n default --create-namespace --version=v0.4.7 --values values.yaml
```
