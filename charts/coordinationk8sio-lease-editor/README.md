# Lease Editor

[Lease Editor by AppsCode](https://byte.builders) - Lease Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install coordinationk8sio-lease-editor bytebuilders-ui-dev/coordinationk8sio-lease-editor -n default
```

## Introduction

This chart deploys a Lease Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `coordinationk8sio-lease-editor`:

```console
$ helm install coordinationk8sio-lease-editor bytebuilders-ui-dev/coordinationk8sio-lease-editor -n default
```

The command deploys a Lease Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `coordinationk8sio-lease-editor`:

```console
$ helm delete coordinationk8sio-lease-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `coordinationk8sio-lease-editor` chart and their default values.

|     Parameter      | Description |         Default          |
|--------------------|-------------|--------------------------|
| apiVersion         |             | `coordination.k8s.io/v1` |
| kind               |             | `Lease`                  |
| metadata.name      |             | `lease`                  |
| metadata.namespace |             | `default`                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install coordinationk8sio-lease-editor bytebuilders-ui-dev/coordinationk8sio-lease-editor -n default --set apiVersion=coordination.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install coordinationk8sio-lease-editor bytebuilders-ui-dev/coordinationk8sio-lease-editor -n default --values values.yaml
```
