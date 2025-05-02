# CSIStorageCapacity Editor

[CSIStorageCapacity Editor by AppsCode](https://appscode.com) - CSIStorageCapacity Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/storagek8sio-csistoragecapacity-editor --version=v0.17.0
$ helm upgrade -i storagek8sio-csistoragecapacity-editor appscode/storagek8sio-csistoragecapacity-editor -n default --create-namespace --version=v0.17.0
```

## Introduction

This chart deploys a CSIStorageCapacity Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `storagek8sio-csistoragecapacity-editor`:

```bash
$ helm upgrade -i storagek8sio-csistoragecapacity-editor appscode/storagek8sio-csistoragecapacity-editor -n default --create-namespace --version=v0.17.0
```

The command deploys a CSIStorageCapacity Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `storagek8sio-csistoragecapacity-editor`:

```bash
$ helm uninstall storagek8sio-csistoragecapacity-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagek8sio-csistoragecapacity-editor` chart and their default values.

|     Parameter      | Description |               Default               |
|--------------------|-------------|-------------------------------------|
| apiVersion         |             | <code>storage.k8s.io/v1beta1</code> |
| kind               |             | <code>CSIStorageCapacity</code>     |
| metadata.name      |             | <code>csistoragecapacity</code>     |
| metadata.namespace |             | <code>default</code>                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i storagek8sio-csistoragecapacity-editor appscode/storagek8sio-csistoragecapacity-editor -n default --create-namespace --version=v0.17.0 --set apiVersion=storage.k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i storagek8sio-csistoragecapacity-editor appscode/storagek8sio-csistoragecapacity-editor -n default --create-namespace --version=v0.17.0 --values values.yaml
```
