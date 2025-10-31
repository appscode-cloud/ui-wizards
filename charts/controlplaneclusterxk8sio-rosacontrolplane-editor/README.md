# ROSAControlPlane Editor

[ROSAControlPlane Editor by AppsCode](https://appscode.com) - ROSAControlPlane Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/controlplaneclusterxk8sio-rosacontrolplane-editor --version=v0.27.0
$ helm upgrade -i controlplaneclusterxk8sio-rosacontrolplane-editor appscode/controlplaneclusterxk8sio-rosacontrolplane-editor -n default --create-namespace --version=v0.27.0
```

## Introduction

This chart deploys a ROSAControlPlane Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `controlplaneclusterxk8sio-rosacontrolplane-editor`:

```bash
$ helm upgrade -i controlplaneclusterxk8sio-rosacontrolplane-editor appscode/controlplaneclusterxk8sio-rosacontrolplane-editor -n default --create-namespace --version=v0.27.0
```

The command deploys a ROSAControlPlane Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `controlplaneclusterxk8sio-rosacontrolplane-editor`:

```bash
$ helm uninstall controlplaneclusterxk8sio-rosacontrolplane-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `controlplaneclusterxk8sio-rosacontrolplane-editor` chart and their default values.

|     Parameter      | Description |                      Default                       |
|--------------------|-------------|----------------------------------------------------|
| apiVersion         |             | <code>controlplane.cluster.x-k8s.io/v1beta2</code> |
| kind               |             | <code>ROSAControlPlane</code>                      |
| metadata.name      |             | <code>rosacontrolplane</code>                      |
| metadata.namespace |             | <code>default</code>                               |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i controlplaneclusterxk8sio-rosacontrolplane-editor appscode/controlplaneclusterxk8sio-rosacontrolplane-editor -n default --create-namespace --version=v0.27.0 --set apiVersion=controlplane.cluster.x-k8s.io/v1beta2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i controlplaneclusterxk8sio-rosacontrolplane-editor appscode/controlplaneclusterxk8sio-rosacontrolplane-editor -n default --create-namespace --version=v0.27.0 --values values.yaml
```
