# Memcached Editor

[Memcached Editor by AppsCode](https://byte.builders) - Memcached Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-memcached-editor --version=v0.4.10
$ helm upgrade -i kubedbcom-memcached-editor bytebuilders-ui/kubedbcom-memcached-editor -n default --create-namespace --version=v0.4.10
```

## Introduction

This chart deploys a Memcached Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-memcached-editor`:

```bash
$ helm upgrade -i kubedbcom-memcached-editor bytebuilders-ui/kubedbcom-memcached-editor -n default --create-namespace --version=v0.4.10
```

The command deploys a Memcached Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-memcached-editor`:

```bash
$ helm uninstall kubedbcom-memcached-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-memcached-editor` chart and their default values.

|     Parameter      | Description |             Default              |
|--------------------|-------------|----------------------------------|
| apiVersion         |             | <code>kubedb.com/v1alpha2</code> |
| kind               |             | <code>Memcached</code>           |
| metadata.name      |             | <code>memcached</code>           |
| metadata.namespace |             | <code>default</code>             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-memcached-editor bytebuilders-ui/kubedbcom-memcached-editor -n default --create-namespace --version=v0.4.10 --set apiVersion=kubedb.com/v1alpha2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-memcached-editor bytebuilders-ui/kubedbcom-memcached-editor -n default --create-namespace --version=v0.4.10 --values values.yaml
```
