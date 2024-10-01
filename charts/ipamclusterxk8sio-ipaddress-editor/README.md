# IPAddress Editor

[IPAddress Editor by AppsCode](https://appscode.com) - IPAddress Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/ipamclusterxk8sio-ipaddress-editor --version=v0.6.0
$ helm upgrade -i ipamclusterxk8sio-ipaddress-editor appscode-charts-oci/ipamclusterxk8sio-ipaddress-editor -n default --create-namespace --version=v0.6.0
```

## Introduction

This chart deploys a IPAddress Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `ipamclusterxk8sio-ipaddress-editor`:

```bash
$ helm upgrade -i ipamclusterxk8sio-ipaddress-editor appscode-charts-oci/ipamclusterxk8sio-ipaddress-editor -n default --create-namespace --version=v0.6.0
```

The command deploys a IPAddress Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `ipamclusterxk8sio-ipaddress-editor`:

```bash
$ helm uninstall ipamclusterxk8sio-ipaddress-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `ipamclusterxk8sio-ipaddress-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>ipam.cluster.x-k8s.io/v1beta1</code> |
| kind               |             | <code>IPAddress</code>                     |
| metadata.name      |             | <code>ipaddress</code>                     |
| metadata.namespace |             | <code>default</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i ipamclusterxk8sio-ipaddress-editor appscode-charts-oci/ipamclusterxk8sio-ipaddress-editor -n default --create-namespace --version=v0.6.0 --set apiVersion=ipam.cluster.x-k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i ipamclusterxk8sio-ipaddress-editor appscode-charts-oci/ipamclusterxk8sio-ipaddress-editor -n default --create-namespace --version=v0.6.0 --values values.yaml
```
