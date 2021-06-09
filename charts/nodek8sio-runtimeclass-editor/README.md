# RuntimeClass Editor

[RuntimeClass Editor by AppsCode](https://byte.builders) - RuntimeClass Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install nodek8sio-runtimeclass-editor bytebuilders-ui-dev/nodek8sio-runtimeclass-editor -n default
```

## Introduction

This chart deploys a RuntimeClass Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `nodek8sio-runtimeclass-editor`:

```console
$ helm install nodek8sio-runtimeclass-editor bytebuilders-ui-dev/nodek8sio-runtimeclass-editor -n default
```

The command deploys a RuntimeClass Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `nodek8sio-runtimeclass-editor`:

```console
$ helm delete nodek8sio-runtimeclass-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `nodek8sio-runtimeclass-editor` chart and their default values.

|     Parameter      | Description |     Default      |
|--------------------|-------------|------------------|
| apiVersion         |             | `node.k8s.io/v1` |
| kind               |             | `RuntimeClass`   |
| metadata.name      |             | `runtimeclass`   |
| metadata.namespace |             | `default`        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install nodek8sio-runtimeclass-editor bytebuilders-ui-dev/nodek8sio-runtimeclass-editor -n default --set apiVersion=node.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install nodek8sio-runtimeclass-editor bytebuilders-ui-dev/nodek8sio-runtimeclass-editor -n default --values values.yaml
```
