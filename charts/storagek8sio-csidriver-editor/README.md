# CSIDriver Editor

[CSIDriver Editor by AppsCode](https://byte.builders) - CSIDriver Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm search repo bytebuilders-ui-dev/storagek8sio-csidriver-editor --version=v0.4.17
$ helm upgrade -i storagek8sio-csidriver-editor bytebuilders-ui-dev/storagek8sio-csidriver-editor -n default --create-namespace --version=v0.4.17
```

## Introduction

This chart deploys a CSIDriver Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `storagek8sio-csidriver-editor`:

```bash
$ helm upgrade -i storagek8sio-csidriver-editor bytebuilders-ui-dev/storagek8sio-csidriver-editor -n default --create-namespace --version=v0.4.17
```

The command deploys a CSIDriver Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `storagek8sio-csidriver-editor`:

```bash
$ helm uninstall storagek8sio-csidriver-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagek8sio-csidriver-editor` chart and their default values.

|     Parameter      | Description |            Default             |
|--------------------|-------------|--------------------------------|
| apiVersion         |             | <code>storage.k8s.io/v1</code> |
| kind               |             | <code>CSIDriver</code>         |
| metadata.name      |             | <code>csidriver</code>         |
| metadata.namespace |             | <code>default</code>           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i storagek8sio-csidriver-editor bytebuilders-ui-dev/storagek8sio-csidriver-editor -n default --create-namespace --version=v0.4.17 --set apiVersion=storage.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i storagek8sio-csidriver-editor bytebuilders-ui-dev/storagek8sio-csidriver-editor -n default --create-namespace --version=v0.4.17 --values values.yaml
```
