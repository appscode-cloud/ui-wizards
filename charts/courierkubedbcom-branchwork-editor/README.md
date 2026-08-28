# BranchWork Editor

[BranchWork Editor by AppsCode](https://appscode.com) - BranchWork Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/courierkubedbcom-branchwork-editor --version=v0.37.0
$ helm upgrade -i courierkubedbcom-branchwork-editor appscode/courierkubedbcom-branchwork-editor -n default --create-namespace --version=v0.37.0
```

## Introduction

This chart deploys a BranchWork Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `courierkubedbcom-branchwork-editor`:

```bash
$ helm upgrade -i courierkubedbcom-branchwork-editor appscode/courierkubedbcom-branchwork-editor -n default --create-namespace --version=v0.37.0
```

The command deploys a BranchWork Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `courierkubedbcom-branchwork-editor`:

```bash
$ helm uninstall courierkubedbcom-branchwork-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `courierkubedbcom-branchwork-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>courier.kubedb.com/v1alpha1</code> |
| kind               |             | <code>BranchWork</code>                  |
| metadata.name      |             | <code>branchwork</code>                  |
| metadata.namespace |             | <code>default</code>                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i courierkubedbcom-branchwork-editor appscode/courierkubedbcom-branchwork-editor -n default --create-namespace --version=v0.37.0 --set apiVersion=courier.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i courierkubedbcom-branchwork-editor appscode/courierkubedbcom-branchwork-editor -n default --create-namespace --version=v0.37.0 --values values.yaml
```
