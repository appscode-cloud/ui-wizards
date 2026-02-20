# PgpoolVersion Editor

[PgpoolVersion Editor by AppsCode](https://appscode.com) - PgpoolVersion Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/catalogkubedbcom-pgpoolversion-editor --version=v0.30.0
$ helm upgrade -i catalogkubedbcom-pgpoolversion-editor appscode/catalogkubedbcom-pgpoolversion-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a PgpoolVersion Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `catalogkubedbcom-pgpoolversion-editor`:

```bash
$ helm upgrade -i catalogkubedbcom-pgpoolversion-editor appscode/catalogkubedbcom-pgpoolversion-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a PgpoolVersion Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `catalogkubedbcom-pgpoolversion-editor`:

```bash
$ helm uninstall catalogkubedbcom-pgpoolversion-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogkubedbcom-pgpoolversion-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>catalog.kubedb.com/v1alpha1</code> |
| kind               |             | <code>PgpoolVersion</code>               |
| metadata.name      |             | <code>pgpoolversion</code>               |
| metadata.namespace |             | <code>""</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i catalogkubedbcom-pgpoolversion-editor appscode/catalogkubedbcom-pgpoolversion-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=catalog.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i catalogkubedbcom-pgpoolversion-editor appscode/catalogkubedbcom-pgpoolversion-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
