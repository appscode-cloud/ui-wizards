# GlobalTable Editor

[GlobalTable Editor by AppsCode](https://byte.builders) - GlobalTable Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/dynamodbawskubeformcom-globaltable-editor --version=v0.4.18
$ helm upgrade -i dynamodbawskubeformcom-globaltable-editor bytebuilders-ui/dynamodbawskubeformcom-globaltable-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a GlobalTable Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `dynamodbawskubeformcom-globaltable-editor`:

```bash
$ helm upgrade -i dynamodbawskubeformcom-globaltable-editor bytebuilders-ui/dynamodbawskubeformcom-globaltable-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a GlobalTable Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `dynamodbawskubeformcom-globaltable-editor`:

```bash
$ helm uninstall dynamodbawskubeformcom-globaltable-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `dynamodbawskubeformcom-globaltable-editor` chart and their default values.

|     Parameter      | Description |                     Default                     |
|--------------------|-------------|-------------------------------------------------|
| apiVersion         |             | <code>dynamodb.aws.kubeform.com/v1alpha1</code> |
| kind               |             | <code>GlobalTable</code>                        |
| metadata.name      |             | <code>globaltable</code>                        |
| metadata.namespace |             | <code>""</code>                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i dynamodbawskubeformcom-globaltable-editor bytebuilders-ui/dynamodbawskubeformcom-globaltable-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=dynamodb.aws.kubeform.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i dynamodbawskubeformcom-globaltable-editor bytebuilders-ui/dynamodbawskubeformcom-globaltable-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
