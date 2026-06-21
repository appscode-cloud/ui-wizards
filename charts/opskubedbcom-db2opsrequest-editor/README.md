# DB2OpsRequest Editor

[DB2OpsRequest Editor by AppsCode](https://appscode.com) - DB2OpsRequest Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/opskubedbcom-db2opsrequest-editor --version=v0.35.0
$ helm upgrade -i opskubedbcom-db2opsrequest-editor appscode/opskubedbcom-db2opsrequest-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a DB2OpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `opskubedbcom-db2opsrequest-editor`:

```bash
$ helm upgrade -i opskubedbcom-db2opsrequest-editor appscode/opskubedbcom-db2opsrequest-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a DB2OpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `opskubedbcom-db2opsrequest-editor`:

```bash
$ helm uninstall opskubedbcom-db2opsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-db2opsrequest-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>ops.kubedb.com/v1alpha1</code> |
| kind               |             | <code>DB2OpsRequest</code>           |
| metadata.name      |             | <code>db2opsrequest</code>           |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i opskubedbcom-db2opsrequest-editor appscode/opskubedbcom-db2opsrequest-editor -n default --create-namespace --version=v0.35.0 --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i opskubedbcom-db2opsrequest-editor appscode/opskubedbcom-db2opsrequest-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
