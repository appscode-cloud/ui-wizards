# MSSQLServer Editor

[MSSQLServer Editor by AppsCode](https://byte.builders) - MSSQLServer Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/kubedbcom-mssqlserver-editor --version=v0.4.18
$ helm upgrade -i kubedbcom-mssqlserver-editor appscode-charts-oci/kubedbcom-mssqlserver-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a MSSQLServer Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-mssqlserver-editor`:

```bash
$ helm upgrade -i kubedbcom-mssqlserver-editor appscode-charts-oci/kubedbcom-mssqlserver-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a MSSQLServer Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-mssqlserver-editor`:

```bash
$ helm uninstall kubedbcom-mssqlserver-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-mssqlserver-editor` chart and their default values.

|     Parameter      | Description |             Default              |
|--------------------|-------------|----------------------------------|
| apiVersion         |             | <code>kubedb.com/v1alpha2</code> |
| kind               |             | <code>MSSQLServer</code>         |
| metadata.name      |             | <code>mssqlserver</code>         |
| metadata.namespace |             | <code>default</code>             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-mssqlserver-editor appscode-charts-oci/kubedbcom-mssqlserver-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=kubedb.com/v1alpha2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-mssqlserver-editor appscode-charts-oci/kubedbcom-mssqlserver-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
