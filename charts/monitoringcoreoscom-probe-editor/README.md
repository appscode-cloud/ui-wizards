# Probe Editor

[Probe Editor by AppsCode](https://byte.builders) - Probe Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/monitoringcoreoscom-probe-editor --version=v0.4.11
$ helm upgrade -i monitoringcoreoscom-probe-editor bytebuilders-ui/monitoringcoreoscom-probe-editor -n default --create-namespace --version=v0.4.11
```

## Introduction

This chart deploys a Probe Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `monitoringcoreoscom-probe-editor`:

```bash
$ helm upgrade -i monitoringcoreoscom-probe-editor bytebuilders-ui/monitoringcoreoscom-probe-editor -n default --create-namespace --version=v0.4.11
```

The command deploys a Probe Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `monitoringcoreoscom-probe-editor`:

```bash
$ helm uninstall monitoringcoreoscom-probe-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `monitoringcoreoscom-probe-editor` chart and their default values.

|     Parameter      | Description |                Default                |
|--------------------|-------------|---------------------------------------|
| apiVersion         |             | <code>monitoring.coreos.com/v1</code> |
| kind               |             | <code>Probe</code>                    |
| metadata.name      |             | <code>probe</code>                    |
| metadata.namespace |             | <code>default</code>                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i monitoringcoreoscom-probe-editor bytebuilders-ui/monitoringcoreoscom-probe-editor -n default --create-namespace --version=v0.4.11 --set apiVersion=monitoring.coreos.com/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i monitoringcoreoscom-probe-editor bytebuilders-ui/monitoringcoreoscom-probe-editor -n default --create-namespace --version=v0.4.11 --values values.yaml
```
