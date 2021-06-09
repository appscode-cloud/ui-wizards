# CSIStorageCapacity Editor

[CSIStorageCapacity Editor by AppsCode](https://byte.builders) - CSIStorageCapacity Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install storagek8sio-csistoragecapacity-editor bytebuilders-ui-dev/storagek8sio-csistoragecapacity-editor -n default
```

## Introduction

This chart deploys a CSIStorageCapacity Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `storagek8sio-csistoragecapacity-editor`:

```console
$ helm install storagek8sio-csistoragecapacity-editor bytebuilders-ui-dev/storagek8sio-csistoragecapacity-editor -n default
```

The command deploys a CSIStorageCapacity Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `storagek8sio-csistoragecapacity-editor`:

```console
$ helm delete storagek8sio-csistoragecapacity-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagek8sio-csistoragecapacity-editor` chart and their default values.

|     Parameter      | Description |         Default          |
|--------------------|-------------|--------------------------|
| apiVersion         |             | `storage.k8s.io/v1beta1` |
| kind               |             | `CSIStorageCapacity`     |
| metadata.name      |             | `csistoragecapacity`     |
| metadata.namespace |             | `default`                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install storagek8sio-csistoragecapacity-editor bytebuilders-ui-dev/storagek8sio-csistoragecapacity-editor -n default --set apiVersion=storage.k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install storagek8sio-csistoragecapacity-editor bytebuilders-ui-dev/storagek8sio-csistoragecapacity-editor -n default --values values.yaml
```
