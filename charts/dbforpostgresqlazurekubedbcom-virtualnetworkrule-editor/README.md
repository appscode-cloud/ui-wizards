# VirtualNetworkRule Editor

[VirtualNetworkRule Editor by AppsCode](https://appscode.com) - VirtualNetworkRule Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor --version=v0.21.0
$ helm upgrade -i dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor appscode/dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor -n default --create-namespace --version=v0.21.0
```

## Introduction

This chart deploys a VirtualNetworkRule Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor`:

```bash
$ helm upgrade -i dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor appscode/dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor -n default --create-namespace --version=v0.21.0
```

The command deploys a VirtualNetworkRule Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor`:

```bash
$ helm uninstall dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor` chart and their default values.

|     Parameter      | Description |                        Default                         |
|--------------------|-------------|--------------------------------------------------------|
| apiVersion         |             | <code>dbforpostgresql.azure.kubedb.com/v1alpha1</code> |
| kind               |             | <code>VirtualNetworkRule</code>                        |
| metadata.name      |             | <code>virtualnetworkrule</code>                        |
| metadata.namespace |             | <code>""</code>                                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor appscode/dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor -n default --create-namespace --version=v0.21.0 --set apiVersion=dbforpostgresql.azure.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor appscode/dbforpostgresqlazurekubedbcom-virtualnetworkrule-editor -n default --create-namespace --version=v0.21.0 --values values.yaml
```
