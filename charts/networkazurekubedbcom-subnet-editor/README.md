# Subnet Editor

[Subnet Editor by AppsCode](https://appscode.com) - Subnet Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/networkazurekubedbcom-subnet-editor --version=v0.25.0
$ helm upgrade -i networkazurekubedbcom-subnet-editor appscode/networkazurekubedbcom-subnet-editor -n default --create-namespace --version=v0.25.0
```

## Introduction

This chart deploys a Subnet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `networkazurekubedbcom-subnet-editor`:

```bash
$ helm upgrade -i networkazurekubedbcom-subnet-editor appscode/networkazurekubedbcom-subnet-editor -n default --create-namespace --version=v0.25.0
```

The command deploys a Subnet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `networkazurekubedbcom-subnet-editor`:

```bash
$ helm uninstall networkazurekubedbcom-subnet-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `networkazurekubedbcom-subnet-editor` chart and their default values.

|     Parameter      | Description |                    Default                     |
|--------------------|-------------|------------------------------------------------|
| apiVersion         |             | <code>network.azure.kubedb.com/v1alpha1</code> |
| kind               |             | <code>Subnet</code>                            |
| metadata.name      |             | <code>subnet</code>                            |
| metadata.namespace |             | <code>""</code>                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i networkazurekubedbcom-subnet-editor appscode/networkazurekubedbcom-subnet-editor -n default --create-namespace --version=v0.25.0 --set apiVersion=network.azure.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i networkazurekubedbcom-subnet-editor appscode/networkazurekubedbcom-subnet-editor -n default --create-namespace --version=v0.25.0 --values values.yaml
```
