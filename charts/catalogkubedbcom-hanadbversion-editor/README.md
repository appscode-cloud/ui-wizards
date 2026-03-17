# HanaDBVersion Editor

[HanaDBVersion Editor by AppsCode](https://appscode.com) - HanaDBVersion Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/catalogkubedbcom-hanadbversion-editor --version=v0.31.0
$ helm upgrade -i catalogkubedbcom-hanadbversion-editor appscode/catalogkubedbcom-hanadbversion-editor -n default --create-namespace --version=v0.31.0
```

## Introduction

This chart deploys a HanaDBVersion Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `catalogkubedbcom-hanadbversion-editor`:

```bash
$ helm upgrade -i catalogkubedbcom-hanadbversion-editor appscode/catalogkubedbcom-hanadbversion-editor -n default --create-namespace --version=v0.31.0
```

The command deploys a HanaDBVersion Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `catalogkubedbcom-hanadbversion-editor`:

```bash
$ helm uninstall catalogkubedbcom-hanadbversion-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogkubedbcom-hanadbversion-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>catalog.kubedb.com/v1alpha1</code> |
| kind               |             | <code>HanaDBVersion</code>               |
| metadata.name      |             | <code>hanadbversion</code>               |
| metadata.namespace |             | <code>""</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i catalogkubedbcom-hanadbversion-editor appscode/catalogkubedbcom-hanadbversion-editor -n default --create-namespace --version=v0.31.0 --set apiVersion=catalog.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i catalogkubedbcom-hanadbversion-editor appscode/catalogkubedbcom-hanadbversion-editor -n default --create-namespace --version=v0.31.0 --values values.yaml
```
