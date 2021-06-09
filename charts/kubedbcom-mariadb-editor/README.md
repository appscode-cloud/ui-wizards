# MariaDB Editor

[MariaDB Editor by AppsCode](https://byte.builders) - MariaDB Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install kubedbcom-mariadb-editor bytebuilders-ui-dev/kubedbcom-mariadb-editor -n default
```

## Introduction

This chart deploys a MariaDB Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `kubedbcom-mariadb-editor`:

```console
$ helm install kubedbcom-mariadb-editor bytebuilders-ui-dev/kubedbcom-mariadb-editor -n default
```

The command deploys a MariaDB Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubedbcom-mariadb-editor`:

```console
$ helm delete kubedbcom-mariadb-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-mariadb-editor` chart and their default values.

|     Parameter      | Description |        Default        |
|--------------------|-------------|-----------------------|
| apiVersion         |             | `kubedb.com/v1alpha2` |
| kind               |             | `MariaDB`             |
| metadata.name      |             | `mariadb`             |
| metadata.namespace |             | `default`             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubedbcom-mariadb-editor bytebuilders-ui-dev/kubedbcom-mariadb-editor -n default --set apiVersion=kubedb.com/v1alpha2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubedbcom-mariadb-editor bytebuilders-ui-dev/kubedbcom-mariadb-editor -n default --values values.yaml
```
