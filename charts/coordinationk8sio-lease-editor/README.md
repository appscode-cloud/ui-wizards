# Lease Editor

[Lease Editor by AppsCode](https://appscode.com) - Lease Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/coordinationk8sio-lease-editor --version=v0.7.0
$ helm upgrade -i coordinationk8sio-lease-editor appscode-charts-oci/coordinationk8sio-lease-editor -n default --create-namespace --version=v0.7.0
```

## Introduction

This chart deploys a Lease Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `coordinationk8sio-lease-editor`:

```bash
$ helm upgrade -i coordinationk8sio-lease-editor appscode-charts-oci/coordinationk8sio-lease-editor -n default --create-namespace --version=v0.7.0
```

The command deploys a Lease Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `coordinationk8sio-lease-editor`:

```bash
$ helm uninstall coordinationk8sio-lease-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `coordinationk8sio-lease-editor` chart and their default values.

|     Parameter      | Description |               Default               |
|--------------------|-------------|-------------------------------------|
| apiVersion         |             | <code>coordination.k8s.io/v1</code> |
| kind               |             | <code>Lease</code>                  |
| metadata.name      |             | <code>lease</code>                  |
| metadata.namespace |             | <code>default</code>                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i coordinationk8sio-lease-editor appscode-charts-oci/coordinationk8sio-lease-editor -n default --create-namespace --version=v0.7.0 --set apiVersion=coordination.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i coordinationk8sio-lease-editor appscode-charts-oci/coordinationk8sio-lease-editor -n default --create-namespace --version=v0.7.0 --values values.yaml
```
