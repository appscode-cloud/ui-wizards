# GCPManagedControlPlane Editor

[GCPManagedControlPlane Editor by AppsCode](https://appscode.com) - GCPManagedControlPlane Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor --version=v0.21.0
$ helm upgrade -i infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor appscode/infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor -n default --create-namespace --version=v0.21.0
```

## Introduction

This chart deploys a GCPManagedControlPlane Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor`:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor appscode/infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor -n default --create-namespace --version=v0.21.0
```

The command deploys a GCPManagedControlPlane Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor`:

```bash
$ helm uninstall infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor` chart and their default values.

|     Parameter      | Description |                       Default                        |
|--------------------|-------------|------------------------------------------------------|
| apiVersion         |             | <code>infrastructure.cluster.x-k8s.io/v1beta1</code> |
| kind               |             | <code>GCPManagedControlPlane</code>                  |
| metadata.name      |             | <code>gcpmanagedcontrolplane</code>                  |
| metadata.namespace |             | <code>default</code>                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor appscode/infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor -n default --create-namespace --version=v0.21.0 --set apiVersion=infrastructure.cluster.x-k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor appscode/infrastructureclusterxk8sio-gcpmanagedcontrolplane-editor -n default --create-namespace --version=v0.21.0 --values values.yaml
```
