# ProviderRevision Editor

[ProviderRevision Editor by AppsCode](https://appscode.com) - ProviderRevision Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/pkgcrossplaneio-providerrevision-editor --version=v0.13.0
$ helm upgrade -i pkgcrossplaneio-providerrevision-editor appscode-charts-oci/pkgcrossplaneio-providerrevision-editor -n default --create-namespace --version=v0.13.0
```

## Introduction

This chart deploys a ProviderRevision Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `pkgcrossplaneio-providerrevision-editor`:

```bash
$ helm upgrade -i pkgcrossplaneio-providerrevision-editor appscode-charts-oci/pkgcrossplaneio-providerrevision-editor -n default --create-namespace --version=v0.13.0
```

The command deploys a ProviderRevision Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `pkgcrossplaneio-providerrevision-editor`:

```bash
$ helm uninstall pkgcrossplaneio-providerrevision-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `pkgcrossplaneio-providerrevision-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | <code>pkg.crossplane.io/v1</code> |
| kind               |             | <code>ProviderRevision</code>     |
| metadata.name      |             | <code>providerrevision</code>     |
| metadata.namespace |             | <code>""</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i pkgcrossplaneio-providerrevision-editor appscode-charts-oci/pkgcrossplaneio-providerrevision-editor -n default --create-namespace --version=v0.13.0 --set apiVersion=pkg.crossplane.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i pkgcrossplaneio-providerrevision-editor appscode-charts-oci/pkgcrossplaneio-providerrevision-editor -n default --create-namespace --version=v0.13.0 --values values.yaml
```
