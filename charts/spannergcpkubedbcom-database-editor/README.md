# Database Editor

[Database Editor by AppsCode](https://byte.builders) - Database Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/spannergcpkubedbcom-database-editor --version=v0.5.0
$ helm upgrade -i spannergcpkubedbcom-database-editor appscode-charts-oci/spannergcpkubedbcom-database-editor -n default --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys a Database Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `spannergcpkubedbcom-database-editor`:

```bash
$ helm upgrade -i spannergcpkubedbcom-database-editor appscode-charts-oci/spannergcpkubedbcom-database-editor -n default --create-namespace --version=v0.5.0
```

The command deploys a Database Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `spannergcpkubedbcom-database-editor`:

```bash
$ helm uninstall spannergcpkubedbcom-database-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `spannergcpkubedbcom-database-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>spanner.gcp.kubedb.com/v1alpha1</code> |
| kind               |             | <code>Database</code>                        |
| metadata.name      |             | <code>database</code>                        |
| metadata.namespace |             | <code>""</code>                              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i spannergcpkubedbcom-database-editor appscode-charts-oci/spannergcpkubedbcom-database-editor -n default --create-namespace --version=v0.5.0 --set apiVersion=spanner.gcp.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i spannergcpkubedbcom-database-editor appscode-charts-oci/spannergcpkubedbcom-database-editor -n default --create-namespace --version=v0.5.0 --values values.yaml
```
