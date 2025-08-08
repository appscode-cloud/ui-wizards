# PostgresRole Editor

[PostgresRole Editor by AppsCode](https://appscode.com) - PostgresRole Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/enginekubevaultcom-postgresrole-editor --version=v0.22.0
$ helm upgrade -i enginekubevaultcom-postgresrole-editor appscode/enginekubevaultcom-postgresrole-editor -n default --create-namespace --version=v0.22.0
```

## Introduction

This chart deploys a PostgresRole Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `enginekubevaultcom-postgresrole-editor`:

```bash
$ helm upgrade -i enginekubevaultcom-postgresrole-editor appscode/enginekubevaultcom-postgresrole-editor -n default --create-namespace --version=v0.22.0
```

The command deploys a PostgresRole Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `enginekubevaultcom-postgresrole-editor`:

```bash
$ helm uninstall enginekubevaultcom-postgresrole-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `enginekubevaultcom-postgresrole-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>engine.kubevault.com/v1alpha1</code> |
| kind               |             | <code>PostgresRole</code>                  |
| metadata.name      |             | <code>postgresrole</code>                  |
| metadata.namespace |             | <code>default</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i enginekubevaultcom-postgresrole-editor appscode/enginekubevaultcom-postgresrole-editor -n default --create-namespace --version=v0.22.0 --set apiVersion=engine.kubevault.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i enginekubevaultcom-postgresrole-editor appscode/enginekubevaultcom-postgresrole-editor -n default --create-namespace --version=v0.22.0 --values values.yaml
```
