# Configuration Editor

[Configuration Editor by AppsCode](https://appscode.com) - Configuration Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/pkgcrossplaneio-configuration-editor --version=v0.7.0
$ helm upgrade -i pkgcrossplaneio-configuration-editor appscode-charts-oci/pkgcrossplaneio-configuration-editor -n default --create-namespace --version=v0.7.0
```

## Introduction

This chart deploys a Configuration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `pkgcrossplaneio-configuration-editor`:

```bash
$ helm upgrade -i pkgcrossplaneio-configuration-editor appscode-charts-oci/pkgcrossplaneio-configuration-editor -n default --create-namespace --version=v0.7.0
```

The command deploys a Configuration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `pkgcrossplaneio-configuration-editor`:

```bash
$ helm uninstall pkgcrossplaneio-configuration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `pkgcrossplaneio-configuration-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | <code>pkg.crossplane.io/v1</code> |
| kind               |             | <code>Configuration</code>        |
| metadata.name      |             | <code>configuration</code>        |
| metadata.namespace |             | <code>""</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i pkgcrossplaneio-configuration-editor appscode-charts-oci/pkgcrossplaneio-configuration-editor -n default --create-namespace --version=v0.7.0 --set apiVersion=pkg.crossplane.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i pkgcrossplaneio-configuration-editor appscode-charts-oci/pkgcrossplaneio-configuration-editor -n default --create-namespace --version=v0.7.0 --values values.yaml
```
