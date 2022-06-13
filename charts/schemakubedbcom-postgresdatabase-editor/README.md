# PostgresDatabase Editor

[PostgresDatabase Editor by AppsCode](https://byte.builders) - PostgresDatabase Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/schemakubedbcom-postgresdatabase-editor --version=v0.4.6
$ helm upgrade -i schemakubedbcom-postgresdatabase-editor bytebuilders-ui/schemakubedbcom-postgresdatabase-editor -n default --create-namespace --version=v0.4.6
```

## Introduction

This chart deploys a PostgresDatabase Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `schemakubedbcom-postgresdatabase-editor`:

```bash
$ helm upgrade -i schemakubedbcom-postgresdatabase-editor bytebuilders-ui/schemakubedbcom-postgresdatabase-editor -n default --create-namespace --version=v0.4.6
```

The command deploys a PostgresDatabase Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `schemakubedbcom-postgresdatabase-editor`:

```bash
$ helm uninstall schemakubedbcom-postgresdatabase-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `schemakubedbcom-postgresdatabase-editor` chart and their default values.

|     Parameter      | Description |                 Default                 |
|--------------------|-------------|-----------------------------------------|
| apiVersion         |             | <code>schema.kubedb.com/v1alpha1</code> |
| kind               |             | <code>PostgresDatabase</code>           |
| metadata.name      |             | <code>postgresdatabase</code>           |
| metadata.namespace |             | <code>default</code>                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i schemakubedbcom-postgresdatabase-editor bytebuilders-ui/schemakubedbcom-postgresdatabase-editor -n default --create-namespace --version=v0.4.6 --set apiVersion=schema.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i schemakubedbcom-postgresdatabase-editor bytebuilders-ui/schemakubedbcom-postgresdatabase-editor -n default --create-namespace --version=v0.4.6 --values values.yaml
```
