# MachineSet Editor

[MachineSet Editor by AppsCode](https://byte.builders) - MachineSet Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/clusterxk8sio-machineset-editor --version=v0.3.1
$ helm upgrade -i clusterxk8sio-machineset-editor bytebuilders-ui/clusterxk8sio-machineset-editor -n default --create-namespace --version=v0.3.1
```

## Introduction

This chart deploys a MachineSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `clusterxk8sio-machineset-editor`:

```bash
$ helm upgrade -i clusterxk8sio-machineset-editor bytebuilders-ui/clusterxk8sio-machineset-editor -n default --create-namespace --version=v0.3.1
```

The command deploys a MachineSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `clusterxk8sio-machineset-editor`:

```bash
$ helm uninstall clusterxk8sio-machineset-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `clusterxk8sio-machineset-editor` chart and their default values.

|     Parameter      | Description |                Default                 |
|--------------------|-------------|----------------------------------------|
| apiVersion         |             | <code>cluster.x-k8s.io/v1alpha3</code> |
| kind               |             | <code>MachineSet</code>                |
| metadata.name      |             | <code>machineset</code>                |
| metadata.namespace |             | <code>default</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i clusterxk8sio-machineset-editor bytebuilders-ui/clusterxk8sio-machineset-editor -n default --create-namespace --version=v0.3.1 --set apiVersion=cluster.x-k8s.io/v1alpha3
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i clusterxk8sio-machineset-editor bytebuilders-ui/clusterxk8sio-machineset-editor -n default --create-namespace --version=v0.3.1 --values values.yaml
```
