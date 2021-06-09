# ProxySQLOpsRequest Editor

[ProxySQLOpsRequest Editor by AppsCode](https://byte.builders) - ProxySQLOpsRequest Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install opskubedbcom-proxysqlopsrequest-editor bytebuilders-ui-dev/opskubedbcom-proxysqlopsrequest-editor -n default
```

## Introduction

This chart deploys a ProxySQLOpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `opskubedbcom-proxysqlopsrequest-editor`:

```console
$ helm install opskubedbcom-proxysqlopsrequest-editor bytebuilders-ui-dev/opskubedbcom-proxysqlopsrequest-editor -n default
```

The command deploys a ProxySQLOpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `opskubedbcom-proxysqlopsrequest-editor`:

```console
$ helm delete opskubedbcom-proxysqlopsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-proxysqlopsrequest-editor` chart and their default values.

|     Parameter      | Description |          Default          |
|--------------------|-------------|---------------------------|
| apiVersion         |             | `ops.kubedb.com/v1alpha1` |
| kind               |             | `ProxySQLOpsRequest`      |
| metadata.name      |             | `proxysqlopsrequest`      |
| metadata.namespace |             | `default`                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install opskubedbcom-proxysqlopsrequest-editor bytebuilders-ui-dev/opskubedbcom-proxysqlopsrequest-editor -n default --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install opskubedbcom-proxysqlopsrequest-editor bytebuilders-ui-dev/opskubedbcom-proxysqlopsrequest-editor -n default --values values.yaml
```
