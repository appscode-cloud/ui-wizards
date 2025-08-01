# KinesisStreamingDestination Editor

[KinesisStreamingDestination Editor by AppsCode](https://appscode.com) - KinesisStreamingDestination Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/dynamodbawskubedbcom-kinesisstreamingdestination-editor --version=v0.21.0
$ helm upgrade -i dynamodbawskubedbcom-kinesisstreamingdestination-editor appscode/dynamodbawskubedbcom-kinesisstreamingdestination-editor -n default --create-namespace --version=v0.21.0
```

## Introduction

This chart deploys a KinesisStreamingDestination Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `dynamodbawskubedbcom-kinesisstreamingdestination-editor`:

```bash
$ helm upgrade -i dynamodbawskubedbcom-kinesisstreamingdestination-editor appscode/dynamodbawskubedbcom-kinesisstreamingdestination-editor -n default --create-namespace --version=v0.21.0
```

The command deploys a KinesisStreamingDestination Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `dynamodbawskubedbcom-kinesisstreamingdestination-editor`:

```bash
$ helm uninstall dynamodbawskubedbcom-kinesisstreamingdestination-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `dynamodbawskubedbcom-kinesisstreamingdestination-editor` chart and their default values.

|     Parameter      | Description |                    Default                    |
|--------------------|-------------|-----------------------------------------------|
| apiVersion         |             | <code>dynamodb.aws.kubedb.com/v1alpha1</code> |
| kind               |             | <code>KinesisStreamingDestination</code>      |
| metadata.name      |             | <code>kinesisstreamingdestination</code>      |
| metadata.namespace |             | <code>""</code>                               |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i dynamodbawskubedbcom-kinesisstreamingdestination-editor appscode/dynamodbawskubedbcom-kinesisstreamingdestination-editor -n default --create-namespace --version=v0.21.0 --set apiVersion=dynamodb.aws.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i dynamodbawskubedbcom-kinesisstreamingdestination-editor appscode/dynamodbawskubedbcom-kinesisstreamingdestination-editor -n default --create-namespace --version=v0.21.0 --values values.yaml
```
