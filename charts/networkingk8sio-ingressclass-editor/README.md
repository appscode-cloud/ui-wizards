# IngressClass Editor

[IngressClass Editor by AppsCode](https://appscode.com) - IngressClass Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/networkingk8sio-ingressclass-editor --version=v0.21.0
$ helm upgrade -i networkingk8sio-ingressclass-editor appscode/networkingk8sio-ingressclass-editor -n default --create-namespace --version=v0.21.0
```

## Introduction

This chart deploys a IngressClass Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `networkingk8sio-ingressclass-editor`:

```bash
$ helm upgrade -i networkingk8sio-ingressclass-editor appscode/networkingk8sio-ingressclass-editor -n default --create-namespace --version=v0.21.0
```

The command deploys a IngressClass Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `networkingk8sio-ingressclass-editor`:

```bash
$ helm uninstall networkingk8sio-ingressclass-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `networkingk8sio-ingressclass-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | <code>networking.k8s.io/v1</code> |
| kind               |             | <code>IngressClass</code>         |
| metadata.name      |             | <code>ingressclass</code>         |
| metadata.namespace |             | <code>default</code>              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i networkingk8sio-ingressclass-editor appscode/networkingk8sio-ingressclass-editor -n default --create-namespace --version=v0.21.0 --set apiVersion=networking.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i networkingk8sio-ingressclass-editor appscode/networkingk8sio-ingressclass-editor -n default --create-namespace --version=v0.21.0 --values values.yaml
```
