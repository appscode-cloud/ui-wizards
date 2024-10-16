# ActiveDirectoryAdministrator Editor

[ActiveDirectoryAdministrator Editor by AppsCode](https://appscode.com) - ActiveDirectoryAdministrator Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor --version=v0.8.0
$ helm upgrade -i dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor appscode-charts-oci/dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor -n default --create-namespace --version=v0.8.0
```

## Introduction

This chart deploys a ActiveDirectoryAdministrator Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor`:

```bash
$ helm upgrade -i dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor appscode-charts-oci/dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor -n default --create-namespace --version=v0.8.0
```

The command deploys a ActiveDirectoryAdministrator Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor`:

```bash
$ helm uninstall dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor` chart and their default values.

|     Parameter      | Description |                        Default                         |
|--------------------|-------------|--------------------------------------------------------|
| apiVersion         |             | <code>dbforpostgresql.azure.kubedb.com/v1alpha1</code> |
| kind               |             | <code>ActiveDirectoryAdministrator</code>              |
| metadata.name      |             | <code>activedirectoryadministrator</code>              |
| metadata.namespace |             | <code>""</code>                                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor appscode-charts-oci/dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor -n default --create-namespace --version=v0.8.0 --set apiVersion=dbforpostgresql.azure.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor appscode-charts-oci/dbforpostgresqlazurekubedbcom-activedirectoryadministrator-editor -n default --create-namespace --version=v0.8.0 --values values.yaml
```
