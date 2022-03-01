# MariaDBVersion Editor

[MariaDBVersion Editor by AppsCode](https://byte.builders) - MariaDBVersion Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/catalogkubedbcom-mariadbversion-editor --version=v0.3.0
$ helm upgrade -i catalogkubedbcom-mariadbversion-editor bytebuilders-ui/catalogkubedbcom-mariadbversion-editor -n default --create-namespace --version=v0.3.0
```

## Introduction

This chart deploys a MariaDBVersion Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `catalogkubedbcom-mariadbversion-editor`:

```bash
$ helm upgrade -i catalogkubedbcom-mariadbversion-editor bytebuilders-ui/catalogkubedbcom-mariadbversion-editor -n default --create-namespace --version=v0.3.0
```

The command deploys a MariaDBVersion Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `catalogkubedbcom-mariadbversion-editor`:

```bash
$ helm uninstall catalogkubedbcom-mariadbversion-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogkubedbcom-mariadbversion-editor` chart and their default values.

|   Parameter   | Description |                 Default                  |
|---------------|-------------|------------------------------------------|
| apiVersion    |             | <code>catalog.kubedb.com/v1alpha1</code> |
| kind          |             | <code>MariaDBVersion</code>              |
| metadata.name |             | <code>mariadbversion</code>              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i catalogkubedbcom-mariadbversion-editor bytebuilders-ui/catalogkubedbcom-mariadbversion-editor -n default --create-namespace --version=v0.3.0 --set apiVersion=catalog.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i catalogkubedbcom-mariadbversion-editor bytebuilders-ui/catalogkubedbcom-mariadbversion-editor -n default --create-namespace --version=v0.3.0 --values values.yaml
```
