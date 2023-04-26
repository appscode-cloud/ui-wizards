# ClusterResourceSetBinding Editor

[ClusterResourceSetBinding Editor by AppsCode](https://byte.builders) - ClusterResourceSetBinding Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/addonsclusterxk8sio-clusterresourcesetbinding-editor --version=v0.4.14
$ helm upgrade -i addonsclusterxk8sio-clusterresourcesetbinding-editor bytebuilders-ui/addonsclusterxk8sio-clusterresourcesetbinding-editor -n default --create-namespace --version=v0.4.14
```

## Introduction

This chart deploys a ClusterResourceSetBinding Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `addonsclusterxk8sio-clusterresourcesetbinding-editor`:

```bash
$ helm upgrade -i addonsclusterxk8sio-clusterresourcesetbinding-editor bytebuilders-ui/addonsclusterxk8sio-clusterresourcesetbinding-editor -n default --create-namespace --version=v0.4.14
```

The command deploys a ClusterResourceSetBinding Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `addonsclusterxk8sio-clusterresourcesetbinding-editor`:

```bash
$ helm uninstall addonsclusterxk8sio-clusterresourcesetbinding-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `addonsclusterxk8sio-clusterresourcesetbinding-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>addons.cluster.x-k8s.io/v1beta1</code> |
| kind               |             | <code>ClusterResourceSetBinding</code>       |
| metadata.name      |             | <code>clusterresourcesetbinding</code>       |
| metadata.namespace |             | <code>default</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i addonsclusterxk8sio-clusterresourcesetbinding-editor bytebuilders-ui/addonsclusterxk8sio-clusterresourcesetbinding-editor -n default --create-namespace --version=v0.4.14 --set apiVersion=addons.cluster.x-k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i addonsclusterxk8sio-clusterresourcesetbinding-editor bytebuilders-ui/addonsclusterxk8sio-clusterresourcesetbinding-editor -n default --create-namespace --version=v0.4.14 --values values.yaml
```
