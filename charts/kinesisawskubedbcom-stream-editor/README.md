# Stream Editor

[Stream Editor by AppsCode](https://appscode.com) - Stream Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kinesisawskubedbcom-stream-editor --version=v0.30.0
$ helm upgrade -i kinesisawskubedbcom-stream-editor appscode/kinesisawskubedbcom-stream-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a Stream Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kinesisawskubedbcom-stream-editor`:

```bash
$ helm upgrade -i kinesisawskubedbcom-stream-editor appscode/kinesisawskubedbcom-stream-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a Stream Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kinesisawskubedbcom-stream-editor`:

```bash
$ helm uninstall kinesisawskubedbcom-stream-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kinesisawskubedbcom-stream-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>kinesis.aws.kubedb.com/v1alpha1</code> |
| kind               |             | <code>Stream</code>                          |
| metadata.name      |             | <code>stream</code>                          |
| metadata.namespace |             | <code>""</code>                              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kinesisawskubedbcom-stream-editor appscode/kinesisawskubedbcom-stream-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=kinesis.aws.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kinesisawskubedbcom-stream-editor appscode/kinesisawskubedbcom-stream-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
