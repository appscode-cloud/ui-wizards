# MariaDBArchiver Editor

[MariaDBArchiver Editor by AppsCode](https://byte.builders) - MariaDBArchiver Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/archiverkubedbcom-mariadbarchiver-editor --version=v0.4.21
$ helm upgrade -i archiverkubedbcom-mariadbarchiver-editor appscode-charts-oci/archiverkubedbcom-mariadbarchiver-editor -n default --create-namespace --version=v0.4.21
```

## Introduction

This chart deploys a MariaDBArchiver Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `archiverkubedbcom-mariadbarchiver-editor`:

```bash
$ helm upgrade -i archiverkubedbcom-mariadbarchiver-editor appscode-charts-oci/archiverkubedbcom-mariadbarchiver-editor -n default --create-namespace --version=v0.4.21
```

The command deploys a MariaDBArchiver Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `archiverkubedbcom-mariadbarchiver-editor`:

```bash
$ helm uninstall archiverkubedbcom-mariadbarchiver-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `archiverkubedbcom-mariadbarchiver-editor` chart and their default values.

|     Parameter      | Description |                  Default                  |
|--------------------|-------------|-------------------------------------------|
| apiVersion         |             | <code>archiver.kubedb.com/v1alpha1</code> |
| kind               |             | <code>MariaDBArchiver</code>              |
| metadata.name      |             | <code>mariadbarchiver</code>              |
| metadata.namespace |             | <code>default</code>                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i archiverkubedbcom-mariadbarchiver-editor appscode-charts-oci/archiverkubedbcom-mariadbarchiver-editor -n default --create-namespace --version=v0.4.21 --set apiVersion=archiver.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i archiverkubedbcom-mariadbarchiver-editor appscode-charts-oci/archiverkubedbcom-mariadbarchiver-editor -n default --create-namespace --version=v0.4.21 --values values.yaml
```
