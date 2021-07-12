# Ingress Editor

[Ingress Editor by AppsCode](https://byte.builders) - Ingress Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install networkingk8sio-ingress-editor bytebuilders-ui/networkingk8sio-ingress-editor -n default
```

## Introduction

This chart deploys a Ingress Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `networkingk8sio-ingress-editor`:

```console
$ helm install networkingk8sio-ingress-editor bytebuilders-ui/networkingk8sio-ingress-editor -n default
```

The command deploys a Ingress Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `networkingk8sio-ingress-editor`:

```console
$ helm delete networkingk8sio-ingress-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `networkingk8sio-ingress-editor` chart and their default values.

|     Parameter      | Description |        Default         |
|--------------------|-------------|------------------------|
| apiVersion         |             | `networking.k8s.io/v1` |
| kind               |             | `Ingress`              |
| metadata.name      |             | `ingress`              |
| metadata.namespace |             | `default`              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install networkingk8sio-ingress-editor bytebuilders-ui/networkingk8sio-ingress-editor -n default --set apiVersion=networking.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install networkingk8sio-ingress-editor bytebuilders-ui/networkingk8sio-ingress-editor -n default --values values.yaml
```
