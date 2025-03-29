# MariaDBOpsRequest Editor

[MariaDBOpsRequest Editor by AppsCode](https://appscode.com) - MariaDBOpsRequest Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/opskubedbcom-mariadbopsrequest-editor --version=v0.15.0
$ helm upgrade -i opskubedbcom-mariadbopsrequest-editor appscode/opskubedbcom-mariadbopsrequest-editor -n default --create-namespace --version=v0.15.0
```

## Introduction

This chart deploys a MariaDBOpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `opskubedbcom-mariadbopsrequest-editor`:

```bash
$ helm upgrade -i opskubedbcom-mariadbopsrequest-editor appscode/opskubedbcom-mariadbopsrequest-editor -n default --create-namespace --version=v0.15.0
```

The command deploys a MariaDBOpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `opskubedbcom-mariadbopsrequest-editor`:

```bash
$ helm uninstall opskubedbcom-mariadbopsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-mariadbopsrequest-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>ops.kubedb.com/v1alpha1</code> |
| kind               |             | <code>MariaDBOpsRequest</code>       |
| metadata.name      |             | <code>mariadbopsrequest</code>       |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i opskubedbcom-mariadbopsrequest-editor appscode/opskubedbcom-mariadbopsrequest-editor -n default --create-namespace --version=v0.15.0 --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i opskubedbcom-mariadbopsrequest-editor appscode/opskubedbcom-mariadbopsrequest-editor -n default --create-namespace --version=v0.15.0 --values values.yaml
```
