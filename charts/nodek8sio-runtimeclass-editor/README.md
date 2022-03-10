# RuntimeClass Editor

[RuntimeClass Editor by AppsCode](https://byte.builders) - RuntimeClass Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/nodek8sio-runtimeclass-editor --version=v0.4.0
$ helm upgrade -i nodek8sio-runtimeclass-editor bytebuilders-ui/nodek8sio-runtimeclass-editor -n default --create-namespace --version=v0.4.0
```

## Introduction

This chart deploys a RuntimeClass Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `nodek8sio-runtimeclass-editor`:

```bash
$ helm upgrade -i nodek8sio-runtimeclass-editor bytebuilders-ui/nodek8sio-runtimeclass-editor -n default --create-namespace --version=v0.4.0
```

The command deploys a RuntimeClass Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `nodek8sio-runtimeclass-editor`:

```bash
$ helm uninstall nodek8sio-runtimeclass-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `nodek8sio-runtimeclass-editor` chart and their default values.

|     Parameter      | Description |           Default           |
|--------------------|-------------|-----------------------------|
| apiVersion         |             | <code>node.k8s.io/v1</code> |
| kind               |             | <code>RuntimeClass</code>   |
| metadata.name      |             | <code>runtimeclass</code>   |
| metadata.namespace |             | <code>default</code>        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i nodek8sio-runtimeclass-editor bytebuilders-ui/nodek8sio-runtimeclass-editor -n default --create-namespace --version=v0.4.0 --set apiVersion=node.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i nodek8sio-runtimeclass-editor bytebuilders-ui/nodek8sio-runtimeclass-editor -n default --create-namespace --version=v0.4.0 --values values.yaml
```
