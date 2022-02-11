# PostgresVersion Editor

[PostgresVersion Editor by AppsCode](https://byte.builders) - PostgresVersion Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install catalogkubedbcom-postgresversion-editor bytebuilders-ui/catalogkubedbcom-postgresversion-editor -n default
```

## Introduction

This chart deploys a PostgresVersion Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `catalogkubedbcom-postgresversion-editor`:

```console
$ helm install catalogkubedbcom-postgresversion-editor bytebuilders-ui/catalogkubedbcom-postgresversion-editor -n default
```

The command deploys a PostgresVersion Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `catalogkubedbcom-postgresversion-editor`:

```console
$ helm delete catalogkubedbcom-postgresversion-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogkubedbcom-postgresversion-editor` chart and their default values.

|   Parameter   | Description |                 Default                  |
|---------------|-------------|------------------------------------------|
| apiVersion    |             | <code>catalog.kubedb.com/v1alpha1</code> |
| kind          |             | <code>PostgresVersion</code>             |
| metadata.name |             | <code>postgresversion</code>             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install catalogkubedbcom-postgresversion-editor bytebuilders-ui/catalogkubedbcom-postgresversion-editor -n default --set apiVersion=catalog.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install catalogkubedbcom-postgresversion-editor bytebuilders-ui/catalogkubedbcom-postgresversion-editor -n default --values values.yaml
```
