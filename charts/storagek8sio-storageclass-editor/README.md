# StorageClass Editor

[StorageClass Editor by AppsCode](https://byte.builders) - StorageClass Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/storagek8sio-storageclass-editor --version=v0.4.13
$ helm upgrade -i storagek8sio-storageclass-editor bytebuilders-ui/storagek8sio-storageclass-editor -n default --create-namespace --version=v0.4.13
```

## Introduction

This chart deploys a StorageClass Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `storagek8sio-storageclass-editor`:

```bash
$ helm upgrade -i storagek8sio-storageclass-editor bytebuilders-ui/storagek8sio-storageclass-editor -n default --create-namespace --version=v0.4.13
```

The command deploys a StorageClass Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `storagek8sio-storageclass-editor`:

```bash
$ helm uninstall storagek8sio-storageclass-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagek8sio-storageclass-editor` chart and their default values.

|     Parameter      | Description |            Default             |
|--------------------|-------------|--------------------------------|
| apiVersion         |             | <code>storage.k8s.io/v1</code> |
| kind               |             | <code>StorageClass</code>      |
| metadata.name      |             | <code>storageclass</code>      |
| metadata.namespace |             | <code>""</code>                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i storagek8sio-storageclass-editor bytebuilders-ui/storagek8sio-storageclass-editor -n default --create-namespace --version=v0.4.13 --set apiVersion=storage.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i storagek8sio-storageclass-editor bytebuilders-ui/storagek8sio-storageclass-editor -n default --create-namespace --version=v0.4.13 --values values.yaml
```
