# ResourceDashboard Editor

[ResourceDashboard Editor by AppsCode](https://byte.builders) - ResourceDashboard Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/metak8sappscodecom-resourcedashboard-editor --version=v0.21.0
$ helm upgrade -i metak8sappscodecom-resourcedashboard-editor appscode/metak8sappscodecom-resourcedashboard-editor -n default --create-namespace --version=v0.21.0
```

## Introduction

This chart deploys a ResourceDashboard Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `metak8sappscodecom-resourcedashboard-editor`:

```bash
$ helm upgrade -i metak8sappscodecom-resourcedashboard-editor appscode/metak8sappscodecom-resourcedashboard-editor -n default --create-namespace --version=v0.21.0
```

The command deploys a ResourceDashboard Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `metak8sappscodecom-resourcedashboard-editor`:

```bash
$ helm uninstall metak8sappscodecom-resourcedashboard-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `metak8sappscodecom-resourcedashboard-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>meta.k8s.appscode.com/v1alpha1</code> |
| kind               |             | <code>ResourceDashboard</code>              |
| metadata.name      |             | <code>resourcedashboard</code>              |
| metadata.namespace |             | <code>default</code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i metak8sappscodecom-resourcedashboard-editor appscode/metak8sappscodecom-resourcedashboard-editor -n default --create-namespace --version=v0.21.0 --set apiVersion=meta.k8s.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i metak8sappscodecom-resourcedashboard-editor appscode/metak8sappscodecom-resourcedashboard-editor -n default --create-namespace --version=v0.21.0 --values values.yaml
```
