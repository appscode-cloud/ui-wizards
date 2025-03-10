# Instance Editor

[Instance Editor by AppsCode](https://appscode.com) - Instance Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/redisgcpkubedbcom-instance-editor --version=v0.14.0
$ helm upgrade -i redisgcpkubedbcom-instance-editor appscode-charts-oci/redisgcpkubedbcom-instance-editor -n default --create-namespace --version=v0.14.0
```

## Introduction

This chart deploys a Instance Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `redisgcpkubedbcom-instance-editor`:

```bash
$ helm upgrade -i redisgcpkubedbcom-instance-editor appscode-charts-oci/redisgcpkubedbcom-instance-editor -n default --create-namespace --version=v0.14.0
```

The command deploys a Instance Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `redisgcpkubedbcom-instance-editor`:

```bash
$ helm uninstall redisgcpkubedbcom-instance-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `redisgcpkubedbcom-instance-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>redis.gcp.kubedb.com/v1alpha1</code> |
| kind               |             | <code>Instance</code>                      |
| metadata.name      |             | <code>instance</code>                      |
| metadata.namespace |             | <code>""</code>                            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i redisgcpkubedbcom-instance-editor appscode-charts-oci/redisgcpkubedbcom-instance-editor -n default --create-namespace --version=v0.14.0 --set apiVersion=redis.gcp.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i redisgcpkubedbcom-instance-editor appscode-charts-oci/redisgcpkubedbcom-instance-editor -n default --create-namespace --version=v0.14.0 --values values.yaml
```
