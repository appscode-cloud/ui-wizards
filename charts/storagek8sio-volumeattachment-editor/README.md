# VolumeAttachment Editor

[VolumeAttachment Editor by AppsCode](https://byte.builders) - VolumeAttachment Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install storagek8sio-volumeattachment-editor bytebuilders-ui/storagek8sio-volumeattachment-editor -n default
```

## Introduction

This chart deploys a VolumeAttachment Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `storagek8sio-volumeattachment-editor`:

```console
$ helm install storagek8sio-volumeattachment-editor bytebuilders-ui/storagek8sio-volumeattachment-editor -n default
```

The command deploys a VolumeAttachment Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `storagek8sio-volumeattachment-editor`:

```console
$ helm delete storagek8sio-volumeattachment-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagek8sio-volumeattachment-editor` chart and their default values.

|   Parameter   | Description |       Default       |
|---------------|-------------|---------------------|
| apiVersion    |             | `storage.k8s.io/v1` |
| kind          |             | `VolumeAttachment`  |
| metadata.name |             | `volumeattachment`  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install storagek8sio-volumeattachment-editor bytebuilders-ui/storagek8sio-volumeattachment-editor -n default --set apiVersion=storage.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install storagek8sio-volumeattachment-editor bytebuilders-ui/storagek8sio-volumeattachment-editor -n default --values values.yaml
```
