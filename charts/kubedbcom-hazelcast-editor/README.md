# Hazelcast Editor

[Hazelcast Editor by AppsCode](https://appscode.com) - Hazelcast Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-hazelcast-editor --version=v0.19.0
$ helm upgrade -i kubedbcom-hazelcast-editor appscode/kubedbcom-hazelcast-editor -n default --create-namespace --version=v0.19.0
```

## Introduction

This chart deploys a Hazelcast Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-hazelcast-editor`:

```bash
$ helm upgrade -i kubedbcom-hazelcast-editor appscode/kubedbcom-hazelcast-editor -n default --create-namespace --version=v0.19.0
```

The command deploys a Hazelcast Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-hazelcast-editor`:

```bash
$ helm uninstall kubedbcom-hazelcast-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-hazelcast-editor` chart and their default values.

|     Parameter      | Description |             Default              |
|--------------------|-------------|----------------------------------|
| apiVersion         |             | <code>kubedb.com/v1alpha2</code> |
| kind               |             | <code>Hazelcast</code>           |
| metadata.name      |             | <code>hazelcast</code>           |
| metadata.namespace |             | <code>default</code>             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-hazelcast-editor appscode/kubedbcom-hazelcast-editor -n default --create-namespace --version=v0.19.0 --set apiVersion=kubedb.com/v1alpha2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-hazelcast-editor appscode/kubedbcom-hazelcast-editor -n default --create-namespace --version=v0.19.0 --values values.yaml
```
