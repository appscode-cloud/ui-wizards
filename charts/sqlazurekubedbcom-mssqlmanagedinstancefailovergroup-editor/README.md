# MSSQLManagedInstanceFailoverGroup Editor

[MSSQLManagedInstanceFailoverGroup Editor by AppsCode](https://appscode.com) - MSSQLManagedInstanceFailoverGroup Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor --version=v0.30.0
$ helm upgrade -i sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor appscode/sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a MSSQLManagedInstanceFailoverGroup Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor`:

```bash
$ helm upgrade -i sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor appscode/sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a MSSQLManagedInstanceFailoverGroup Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor`:

```bash
$ helm uninstall sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor` chart and their default values.

|     Parameter      | Description |                    Default                     |
|--------------------|-------------|------------------------------------------------|
| apiVersion         |             | <code>sql.azure.kubedb.com/v1alpha1</code>     |
| kind               |             | <code>MSSQLManagedInstanceFailoverGroup</code> |
| metadata.name      |             | <code>mssqlmanagedinstancefailovergroup</code> |
| metadata.namespace |             | <code>""</code>                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor appscode/sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=sql.azure.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor appscode/sqlazurekubedbcom-mssqlmanagedinstancefailovergroup-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
