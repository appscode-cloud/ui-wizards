# Publisher Editor

[Publisher Editor by AppsCode](https://byte.builders) - Publisher Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/postgreskubedbcom-publisher-editor --version=v0.4.15
$ helm upgrade -i postgreskubedbcom-publisher-editor bytebuilders-ui/postgreskubedbcom-publisher-editor -n default --create-namespace --version=v0.4.15
```

## Introduction

This chart deploys a Publisher Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `postgreskubedbcom-publisher-editor`:

```bash
$ helm upgrade -i postgreskubedbcom-publisher-editor bytebuilders-ui/postgreskubedbcom-publisher-editor -n default --create-namespace --version=v0.4.15
```

The command deploys a Publisher Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `postgreskubedbcom-publisher-editor`:

```bash
$ helm uninstall postgreskubedbcom-publisher-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `postgreskubedbcom-publisher-editor` chart and their default values.

|     Parameter      | Description |                  Default                  |
|--------------------|-------------|-------------------------------------------|
| apiVersion         |             | <code>postgres.kubedb.com/v1alpha1</code> |
| kind               |             | <code>Publisher</code>                    |
| metadata.name      |             | <code>publisher</code>                    |
| metadata.namespace |             | <code>default</code>                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i postgreskubedbcom-publisher-editor bytebuilders-ui/postgreskubedbcom-publisher-editor -n default --create-namespace --version=v0.4.15 --set apiVersion=postgres.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i postgreskubedbcom-publisher-editor bytebuilders-ui/postgreskubedbcom-publisher-editor -n default --create-namespace --version=v0.4.15 --values values.yaml
```
