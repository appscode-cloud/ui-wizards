# ConfigurationRevision Editor

[ConfigurationRevision Editor by AppsCode](https://appscode.com) - ConfigurationRevision Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/pkgcrossplaneio-configurationrevision-editor --version=v0.30.0
$ helm upgrade -i pkgcrossplaneio-configurationrevision-editor appscode/pkgcrossplaneio-configurationrevision-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a ConfigurationRevision Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `pkgcrossplaneio-configurationrevision-editor`:

```bash
$ helm upgrade -i pkgcrossplaneio-configurationrevision-editor appscode/pkgcrossplaneio-configurationrevision-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a ConfigurationRevision Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `pkgcrossplaneio-configurationrevision-editor`:

```bash
$ helm uninstall pkgcrossplaneio-configurationrevision-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `pkgcrossplaneio-configurationrevision-editor` chart and their default values.

|     Parameter      | Description |              Default               |
|--------------------|-------------|------------------------------------|
| apiVersion         |             | <code>pkg.crossplane.io/v1</code>  |
| kind               |             | <code>ConfigurationRevision</code> |
| metadata.name      |             | <code>configurationrevision</code> |
| metadata.namespace |             | <code>""</code>                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i pkgcrossplaneio-configurationrevision-editor appscode/pkgcrossplaneio-configurationrevision-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=pkg.crossplane.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i pkgcrossplaneio-configurationrevision-editor appscode/pkgcrossplaneio-configurationrevision-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
