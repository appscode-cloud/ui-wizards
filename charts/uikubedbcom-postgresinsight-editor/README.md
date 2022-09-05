# PostgresInsight Editor

[PostgresInsight Editor by AppsCode](https://byte.builders) - PostgresInsight Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/uikubedbcom-postgresinsight-editor --version=v0.4.10
$ helm upgrade -i uikubedbcom-postgresinsight-editor bytebuilders-ui/uikubedbcom-postgresinsight-editor -n default --create-namespace --version=v0.4.10
```

## Introduction

This chart deploys a PostgresInsight Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `uikubedbcom-postgresinsight-editor`:

```bash
$ helm upgrade -i uikubedbcom-postgresinsight-editor bytebuilders-ui/uikubedbcom-postgresinsight-editor -n default --create-namespace --version=v0.4.10
```

The command deploys a PostgresInsight Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uikubedbcom-postgresinsight-editor`:

```bash
$ helm uninstall uikubedbcom-postgresinsight-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uikubedbcom-postgresinsight-editor` chart and their default values.

|     Parameter      | Description |               Default               |
|--------------------|-------------|-------------------------------------|
| apiVersion         |             | <code>ui.kubedb.com/v1alpha1</code> |
| kind               |             | <code>PostgresInsight</code>        |
| metadata.name      |             | <code>postgresinsight</code>        |
| metadata.namespace |             | <code>default</code>                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uikubedbcom-postgresinsight-editor bytebuilders-ui/uikubedbcom-postgresinsight-editor -n default --create-namespace --version=v0.4.10 --set apiVersion=ui.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uikubedbcom-postgresinsight-editor bytebuilders-ui/uikubedbcom-postgresinsight-editor -n default --create-namespace --version=v0.4.10 --values values.yaml
```
