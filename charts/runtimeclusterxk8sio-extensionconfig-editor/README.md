# ExtensionConfig Editor

[ExtensionConfig Editor by AppsCode](https://byte.builders) - ExtensionConfig Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/runtimeclusterxk8sio-extensionconfig-editor --version=v0.4.15
$ helm upgrade -i runtimeclusterxk8sio-extensionconfig-editor bytebuilders-ui/runtimeclusterxk8sio-extensionconfig-editor -n default --create-namespace --version=v0.4.15
```

## Introduction

This chart deploys a ExtensionConfig Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `runtimeclusterxk8sio-extensionconfig-editor`:

```bash
$ helm upgrade -i runtimeclusterxk8sio-extensionconfig-editor bytebuilders-ui/runtimeclusterxk8sio-extensionconfig-editor -n default --create-namespace --version=v0.4.15
```

The command deploys a ExtensionConfig Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `runtimeclusterxk8sio-extensionconfig-editor`:

```bash
$ helm uninstall runtimeclusterxk8sio-extensionconfig-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `runtimeclusterxk8sio-extensionconfig-editor` chart and their default values.

|     Parameter      | Description |                    Default                     |
|--------------------|-------------|------------------------------------------------|
| apiVersion         |             | <code>runtime.cluster.x-k8s.io/v1alpha1</code> |
| kind               |             | <code>ExtensionConfig</code>                   |
| metadata.name      |             | <code>extensionconfig</code>                   |
| metadata.namespace |             | <code>""</code>                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i runtimeclusterxk8sio-extensionconfig-editor bytebuilders-ui/runtimeclusterxk8sio-extensionconfig-editor -n default --create-namespace --version=v0.4.15 --set apiVersion=runtime.cluster.x-k8s.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i runtimeclusterxk8sio-extensionconfig-editor bytebuilders-ui/runtimeclusterxk8sio-extensionconfig-editor -n default --create-namespace --version=v0.4.15 --values values.yaml
```
