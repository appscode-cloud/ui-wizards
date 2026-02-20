# CompositionRevision Editor

[CompositionRevision Editor by AppsCode](https://appscode.com) - CompositionRevision Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/apiextensionscrossplaneio-compositionrevision-editor --version=v0.30.0
$ helm upgrade -i apiextensionscrossplaneio-compositionrevision-editor appscode/apiextensionscrossplaneio-compositionrevision-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a CompositionRevision Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `apiextensionscrossplaneio-compositionrevision-editor`:

```bash
$ helm upgrade -i apiextensionscrossplaneio-compositionrevision-editor appscode/apiextensionscrossplaneio-compositionrevision-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a CompositionRevision Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `apiextensionscrossplaneio-compositionrevision-editor`:

```bash
$ helm uninstall apiextensionscrossplaneio-compositionrevision-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `apiextensionscrossplaneio-compositionrevision-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>apiextensions.crossplane.io/v1</code> |
| kind               |             | <code>CompositionRevision</code>            |
| metadata.name      |             | <code>compositionrevision</code>            |
| metadata.namespace |             | <code>""</code>                             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i apiextensionscrossplaneio-compositionrevision-editor appscode/apiextensionscrossplaneio-compositionrevision-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=apiextensions.crossplane.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i apiextensionscrossplaneio-compositionrevision-editor appscode/apiextensionscrossplaneio-compositionrevision-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
