# ClusterEndpoint Editor

[ClusterEndpoint Editor by AppsCode](https://byte.builders) - ClusterEndpoint Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/rdsawskubeformcom-clusterendpoint-editor --version=v0.4.16
$ helm upgrade -i rdsawskubeformcom-clusterendpoint-editor bytebuilders-ui/rdsawskubeformcom-clusterendpoint-editor -n default --create-namespace --version=v0.4.16
```

## Introduction

This chart deploys a ClusterEndpoint Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `rdsawskubeformcom-clusterendpoint-editor`:

```bash
$ helm upgrade -i rdsawskubeformcom-clusterendpoint-editor bytebuilders-ui/rdsawskubeformcom-clusterendpoint-editor -n default --create-namespace --version=v0.4.16
```

The command deploys a ClusterEndpoint Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `rdsawskubeformcom-clusterendpoint-editor`:

```bash
$ helm uninstall rdsawskubeformcom-clusterendpoint-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `rdsawskubeformcom-clusterendpoint-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>rds.aws.kubeform.com/v1alpha1</code> |
| kind               |             | <code>ClusterEndpoint</code>               |
| metadata.name      |             | <code>clusterendpoint</code>               |
| metadata.namespace |             | <code>""</code>                            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i rdsawskubeformcom-clusterendpoint-editor bytebuilders-ui/rdsawskubeformcom-clusterendpoint-editor -n default --create-namespace --version=v0.4.16 --set apiVersion=rds.aws.kubeform.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i rdsawskubeformcom-clusterendpoint-editor bytebuilders-ui/rdsawskubeformcom-clusterendpoint-editor -n default --create-namespace --version=v0.4.16 --values values.yaml
```
