# IPAddressClaim Editor

[IPAddressClaim Editor by AppsCode](https://byte.builders) - IPAddressClaim Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/ipamclusterxk8sio-ipaddressclaim-editor --version=v0.4.17
$ helm upgrade -i ipamclusterxk8sio-ipaddressclaim-editor bytebuilders-ui/ipamclusterxk8sio-ipaddressclaim-editor -n default --create-namespace --version=v0.4.17
```

## Introduction

This chart deploys a IPAddressClaim Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `ipamclusterxk8sio-ipaddressclaim-editor`:

```bash
$ helm upgrade -i ipamclusterxk8sio-ipaddressclaim-editor bytebuilders-ui/ipamclusterxk8sio-ipaddressclaim-editor -n default --create-namespace --version=v0.4.17
```

The command deploys a IPAddressClaim Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `ipamclusterxk8sio-ipaddressclaim-editor`:

```bash
$ helm uninstall ipamclusterxk8sio-ipaddressclaim-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `ipamclusterxk8sio-ipaddressclaim-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>ipam.cluster.x-k8s.io/v1alpha1</code> |
| kind               |             | <code>IPAddressClaim</code>                 |
| metadata.name      |             | <code>ipaddressclaim</code>                 |
| metadata.namespace |             | <code>default</code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i ipamclusterxk8sio-ipaddressclaim-editor bytebuilders-ui/ipamclusterxk8sio-ipaddressclaim-editor -n default --create-namespace --version=v0.4.17 --set apiVersion=ipam.cluster.x-k8s.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i ipamclusterxk8sio-ipaddressclaim-editor bytebuilders-ui/ipamclusterxk8sio-ipaddressclaim-editor -n default --create-namespace --version=v0.4.17 --values values.yaml
```
