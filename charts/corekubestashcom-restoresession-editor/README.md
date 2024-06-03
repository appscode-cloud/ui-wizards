# RestoreSession Editor

[RestoreSession Editor by AppsCode](https://byte.builders) - RestoreSession Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/corekubestashcom-restoresession-editor --version=v0.4.20
$ helm upgrade -i corekubestashcom-restoresession-editor appscode-charts-oci/corekubestashcom-restoresession-editor -n default --create-namespace --version=v0.4.20
```

## Introduction

This chart deploys a RestoreSession Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `corekubestashcom-restoresession-editor`:

```bash
$ helm upgrade -i corekubestashcom-restoresession-editor appscode-charts-oci/corekubestashcom-restoresession-editor -n default --create-namespace --version=v0.4.20
```

The command deploys a RestoreSession Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `corekubestashcom-restoresession-editor`:

```bash
$ helm uninstall corekubestashcom-restoresession-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `corekubestashcom-restoresession-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>core.kubestash.com/v1alpha1</code> |
| kind               |             | <code>RestoreSession</code>              |
| metadata.name      |             | <code>restoresession</code>              |
| metadata.namespace |             | <code>default</code>                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i corekubestashcom-restoresession-editor appscode-charts-oci/corekubestashcom-restoresession-editor -n default --create-namespace --version=v0.4.20 --set apiVersion=core.kubestash.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i corekubestashcom-restoresession-editor appscode-charts-oci/corekubestashcom-restoresession-editor -n default --create-namespace --version=v0.4.20 --values values.yaml
```
