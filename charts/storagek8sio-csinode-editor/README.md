# CSINode Editor

[CSINode Editor by AppsCode](https://byte.builders) - CSINode Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install storagek8sio-csinode-editor bytebuilders-ui/storagek8sio-csinode-editor -n default
```

## Introduction

This chart deploys a CSINode Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `storagek8sio-csinode-editor`:

```console
$ helm install storagek8sio-csinode-editor bytebuilders-ui/storagek8sio-csinode-editor -n default
```

The command deploys a CSINode Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `storagek8sio-csinode-editor`:

```console
$ helm delete storagek8sio-csinode-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagek8sio-csinode-editor` chart and their default values.

|   Parameter   | Description |       Default       |
|---------------|-------------|---------------------|
| apiVersion    |             | `storage.k8s.io/v1` |
| kind          |             | `CSINode`           |
| metadata.name |             | `csinode`           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install storagek8sio-csinode-editor bytebuilders-ui/storagek8sio-csinode-editor -n default --set apiVersion=storage.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install storagek8sio-csinode-editor bytebuilders-ui/storagek8sio-csinode-editor -n default --values values.yaml
```
