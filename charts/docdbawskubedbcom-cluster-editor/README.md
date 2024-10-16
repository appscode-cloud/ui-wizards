# Cluster Editor

[Cluster Editor by AppsCode](https://appscode.com) - Cluster Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/docdbawskubedbcom-cluster-editor --version=v0.8.0
$ helm upgrade -i docdbawskubedbcom-cluster-editor appscode-charts-oci/docdbawskubedbcom-cluster-editor -n default --create-namespace --version=v0.8.0
```

## Introduction

This chart deploys a Cluster Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `docdbawskubedbcom-cluster-editor`:

```bash
$ helm upgrade -i docdbawskubedbcom-cluster-editor appscode-charts-oci/docdbawskubedbcom-cluster-editor -n default --create-namespace --version=v0.8.0
```

The command deploys a Cluster Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `docdbawskubedbcom-cluster-editor`:

```bash
$ helm uninstall docdbawskubedbcom-cluster-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `docdbawskubedbcom-cluster-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>docdb.aws.kubedb.com/v1alpha1</code> |
| kind               |             | <code>Cluster</code>                       |
| metadata.name      |             | <code>cluster</code>                       |
| metadata.namespace |             | <code>""</code>                            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i docdbawskubedbcom-cluster-editor appscode-charts-oci/docdbawskubedbcom-cluster-editor -n default --create-namespace --version=v0.8.0 --set apiVersion=docdb.aws.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i docdbawskubedbcom-cluster-editor appscode-charts-oci/docdbawskubedbcom-cluster-editor -n default --create-namespace --version=v0.8.0 --values values.yaml
```
