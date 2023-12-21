# ClusterActivityStream Editor

[ClusterActivityStream Editor by AppsCode](https://byte.builders) - ClusterActivityStream Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/rdsawskubedbcom-clusteractivitystream-editor --version=v0.4.18
$ helm upgrade -i rdsawskubedbcom-clusteractivitystream-editor appscode-charts-oci/rdsawskubedbcom-clusteractivitystream-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a ClusterActivityStream Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `rdsawskubedbcom-clusteractivitystream-editor`:

```bash
$ helm upgrade -i rdsawskubedbcom-clusteractivitystream-editor appscode-charts-oci/rdsawskubedbcom-clusteractivitystream-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a ClusterActivityStream Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `rdsawskubedbcom-clusteractivitystream-editor`:

```bash
$ helm uninstall rdsawskubedbcom-clusteractivitystream-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `rdsawskubedbcom-clusteractivitystream-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>rds.aws.kubedb.com/v1alpha1</code> |
| kind               |             | <code>ClusterActivityStream</code>       |
| metadata.name      |             | <code>clusteractivitystream</code>       |
| metadata.namespace |             | <code>""</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i rdsawskubedbcom-clusteractivitystream-editor appscode-charts-oci/rdsawskubedbcom-clusteractivitystream-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=rds.aws.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i rdsawskubedbcom-clusteractivitystream-editor appscode-charts-oci/rdsawskubedbcom-clusteractivitystream-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
