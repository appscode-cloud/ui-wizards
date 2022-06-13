# Etcd Editor

[Etcd Editor by AppsCode](https://byte.builders) - Etcd Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-etcd-editor --version=v0.4.6
$ helm upgrade -i kubedbcom-etcd-editor bytebuilders-ui/kubedbcom-etcd-editor -n default --create-namespace --version=v0.4.6
```

## Introduction

This chart deploys a Etcd Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-etcd-editor`:

```bash
$ helm upgrade -i kubedbcom-etcd-editor bytebuilders-ui/kubedbcom-etcd-editor -n default --create-namespace --version=v0.4.6
```

The command deploys a Etcd Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-etcd-editor`:

```bash
$ helm uninstall kubedbcom-etcd-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-etcd-editor` chart and their default values.

|     Parameter      | Description |             Default              |
|--------------------|-------------|----------------------------------|
| apiVersion         |             | <code>kubedb.com/v1alpha2</code> |
| kind               |             | <code>Etcd</code>                |
| metadata.name      |             | <code>etcd</code>                |
| metadata.namespace |             | <code>default</code>             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-etcd-editor bytebuilders-ui/kubedbcom-etcd-editor -n default --create-namespace --version=v0.4.6 --set apiVersion=kubedb.com/v1alpha2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-etcd-editor bytebuilders-ui/kubedbcom-etcd-editor -n default --create-namespace --version=v0.4.6 --values values.yaml
```
