# ImageReview Editor

[ImageReview Editor by AppsCode](https://byte.builders) - ImageReview Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install imagepolicyk8sio-imagereview-editor bytebuilders-ui/imagepolicyk8sio-imagereview-editor -n default
```

## Introduction

This chart deploys a ImageReview Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `imagepolicyk8sio-imagereview-editor`:

```console
$ helm install imagepolicyk8sio-imagereview-editor bytebuilders-ui/imagepolicyk8sio-imagereview-editor -n default
```

The command deploys a ImageReview Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `imagepolicyk8sio-imagereview-editor`:

```console
$ helm delete imagepolicyk8sio-imagereview-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `imagepolicyk8sio-imagereview-editor` chart and their default values.

|     Parameter      | Description |            Default            |
|--------------------|-------------|-------------------------------|
| apiVersion         |             | `imagepolicy.k8s.io/v1alpha1` |
| kind               |             | `ImageReview`                 |
| metadata.name      |             | `imagereview`                 |
| metadata.namespace |             | `default`                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install imagepolicyk8sio-imagereview-editor bytebuilders-ui/imagepolicyk8sio-imagereview-editor -n default --set apiVersion=imagepolicy.k8s.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install imagepolicyk8sio-imagereview-editor bytebuilders-ui/imagepolicyk8sio-imagereview-editor -n default --values values.yaml
```
