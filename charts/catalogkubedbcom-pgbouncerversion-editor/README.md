# PgBouncerVersion Editor

[PgBouncerVersion Editor by AppsCode](https://byte.builders) - PgBouncerVersion Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/catalogkubedbcom-pgbouncerversion-editor --version=v0.4.18
$ helm upgrade -i catalogkubedbcom-pgbouncerversion-editor appscode-charts-oci/catalogkubedbcom-pgbouncerversion-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a PgBouncerVersion Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `catalogkubedbcom-pgbouncerversion-editor`:

```bash
$ helm upgrade -i catalogkubedbcom-pgbouncerversion-editor appscode-charts-oci/catalogkubedbcom-pgbouncerversion-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a PgBouncerVersion Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `catalogkubedbcom-pgbouncerversion-editor`:

```bash
$ helm uninstall catalogkubedbcom-pgbouncerversion-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogkubedbcom-pgbouncerversion-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>catalog.kubedb.com/v1alpha1</code> |
| kind               |             | <code>PgBouncerVersion</code>            |
| metadata.name      |             | <code>pgbouncerversion</code>            |
| metadata.namespace |             | <code>""</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i catalogkubedbcom-pgbouncerversion-editor appscode-charts-oci/catalogkubedbcom-pgbouncerversion-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=catalog.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i catalogkubedbcom-pgbouncerversion-editor appscode-charts-oci/catalogkubedbcom-pgbouncerversion-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
