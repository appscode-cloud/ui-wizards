# EtcdVersion Editor

[EtcdVersion Editor by AppsCode](https://byte.builders) - EtcdVersion Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install catalogkubedbcom-etcdversion-editor bytebuilders-ui-dev/catalogkubedbcom-etcdversion-editor -n default
```

## Introduction

This chart deploys a EtcdVersion Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `catalogkubedbcom-etcdversion-editor`:

```console
$ helm install catalogkubedbcom-etcdversion-editor bytebuilders-ui-dev/catalogkubedbcom-etcdversion-editor -n default
```

The command deploys a EtcdVersion Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `catalogkubedbcom-etcdversion-editor`:

```console
$ helm delete catalogkubedbcom-etcdversion-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogkubedbcom-etcdversion-editor` chart and their default values.

|   Parameter   | Description |            Default            |
|---------------|-------------|-------------------------------|
| apiVersion    |             | `catalog.kubedb.com/v1alpha1` |
| kind          |             | `EtcdVersion`                 |
| metadata.name |             | `etcdversion`                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install catalogkubedbcom-etcdversion-editor bytebuilders-ui-dev/catalogkubedbcom-etcdversion-editor -n default --set apiVersion=catalog.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install catalogkubedbcom-etcdversion-editor bytebuilders-ui-dev/catalogkubedbcom-etcdversion-editor -n default --values values.yaml
```
