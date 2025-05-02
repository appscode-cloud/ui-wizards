# Redis Editor

[Redis Editor by AppsCode](https://appscode.com) - Redis Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/gitopskubedbcom-redis-editor --version=v0.17.0
$ helm upgrade -i gitopskubedbcom-redis-editor appscode/gitopskubedbcom-redis-editor -n default --create-namespace --version=v0.17.0
```

## Introduction

This chart deploys a Redis Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `gitopskubedbcom-redis-editor`:

```bash
$ helm upgrade -i gitopskubedbcom-redis-editor appscode/gitopskubedbcom-redis-editor -n default --create-namespace --version=v0.17.0
```

The command deploys a Redis Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `gitopskubedbcom-redis-editor`:

```bash
$ helm uninstall gitopskubedbcom-redis-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `gitopskubedbcom-redis-editor` chart and their default values.

|     Parameter      | Description |                 Default                 |
|--------------------|-------------|-----------------------------------------|
| apiVersion         |             | <code>gitops.kubedb.com/v1alpha1</code> |
| kind               |             | <code>Redis</code>                      |
| metadata.name      |             | <code>redis</code>                      |
| metadata.namespace |             | <code>default</code>                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i gitopskubedbcom-redis-editor appscode/gitopskubedbcom-redis-editor -n default --create-namespace --version=v0.17.0 --set apiVersion=gitops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i gitopskubedbcom-redis-editor appscode/gitopskubedbcom-redis-editor -n default --create-namespace --version=v0.17.0 --values values.yaml
```
