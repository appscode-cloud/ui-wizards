# ReferenceGrant Editor

[ReferenceGrant Editor by AppsCode](https://byte.builders) - ReferenceGrant Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/gatewaynetworkingk8sio-referencegrant-editor --version=v0.4.16
$ helm upgrade -i gatewaynetworkingk8sio-referencegrant-editor bytebuilders-ui/gatewaynetworkingk8sio-referencegrant-editor -n default --create-namespace --version=v0.4.16
```

## Introduction

This chart deploys a ReferenceGrant Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `gatewaynetworkingk8sio-referencegrant-editor`:

```bash
$ helm upgrade -i gatewaynetworkingk8sio-referencegrant-editor bytebuilders-ui/gatewaynetworkingk8sio-referencegrant-editor -n default --create-namespace --version=v0.4.16
```

The command deploys a ReferenceGrant Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `gatewaynetworkingk8sio-referencegrant-editor`:

```bash
$ helm uninstall gatewaynetworkingk8sio-referencegrant-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `gatewaynetworkingk8sio-referencegrant-editor` chart and their default values.

|     Parameter      | Description |                    Default                     |
|--------------------|-------------|------------------------------------------------|
| apiVersion         |             | <code>gateway.networking.k8s.io/v1beta1</code> |
| kind               |             | <code>ReferenceGrant</code>                    |
| metadata.name      |             | <code>referencegrant</code>                    |
| metadata.namespace |             | <code>default</code>                           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i gatewaynetworkingk8sio-referencegrant-editor bytebuilders-ui/gatewaynetworkingk8sio-referencegrant-editor -n default --create-namespace --version=v0.4.16 --set apiVersion=gateway.networking.k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i gatewaynetworkingk8sio-referencegrant-editor bytebuilders-ui/gatewaynetworkingk8sio-referencegrant-editor -n default --create-namespace --version=v0.4.16 --values values.yaml
```