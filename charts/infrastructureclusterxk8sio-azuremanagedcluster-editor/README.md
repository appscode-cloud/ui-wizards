# AzureManagedCluster Editor

[AzureManagedCluster Editor by AppsCode](https://byte.builders) - AzureManagedCluster Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/infrastructureclusterxk8sio-azuremanagedcluster-editor --version=v0.4.15
$ helm upgrade -i infrastructureclusterxk8sio-azuremanagedcluster-editor bytebuilders-ui/infrastructureclusterxk8sio-azuremanagedcluster-editor -n default --create-namespace --version=v0.4.15
```

## Introduction

This chart deploys a AzureManagedCluster Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `infrastructureclusterxk8sio-azuremanagedcluster-editor`:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-azuremanagedcluster-editor bytebuilders-ui/infrastructureclusterxk8sio-azuremanagedcluster-editor -n default --create-namespace --version=v0.4.15
```

The command deploys a AzureManagedCluster Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `infrastructureclusterxk8sio-azuremanagedcluster-editor`:

```bash
$ helm uninstall infrastructureclusterxk8sio-azuremanagedcluster-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `infrastructureclusterxk8sio-azuremanagedcluster-editor` chart and their default values.

|     Parameter      | Description |                       Default                        |
|--------------------|-------------|------------------------------------------------------|
| apiVersion         |             | <code>infrastructure.cluster.x-k8s.io/v1beta1</code> |
| kind               |             | <code>AzureManagedCluster</code>                     |
| metadata.name      |             | <code>azuremanagedcluster</code>                     |
| metadata.namespace |             | <code>default</code>                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-azuremanagedcluster-editor bytebuilders-ui/infrastructureclusterxk8sio-azuremanagedcluster-editor -n default --create-namespace --version=v0.4.15 --set apiVersion=infrastructure.cluster.x-k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-azuremanagedcluster-editor bytebuilders-ui/infrastructureclusterxk8sio-azuremanagedcluster-editor -n default --create-namespace --version=v0.4.15 --values values.yaml
```
