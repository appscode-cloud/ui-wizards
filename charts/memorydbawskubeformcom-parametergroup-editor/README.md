# ParameterGroup Editor

[ParameterGroup Editor by AppsCode](https://byte.builders) - ParameterGroup Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/memorydbawskubeformcom-parametergroup-editor --version=v0.4.16
$ helm upgrade -i memorydbawskubeformcom-parametergroup-editor bytebuilders-ui/memorydbawskubeformcom-parametergroup-editor -n default --create-namespace --version=v0.4.16
```

## Introduction

This chart deploys a ParameterGroup Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `memorydbawskubeformcom-parametergroup-editor`:

```bash
$ helm upgrade -i memorydbawskubeformcom-parametergroup-editor bytebuilders-ui/memorydbawskubeformcom-parametergroup-editor -n default --create-namespace --version=v0.4.16
```

The command deploys a ParameterGroup Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `memorydbawskubeformcom-parametergroup-editor`:

```bash
$ helm uninstall memorydbawskubeformcom-parametergroup-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `memorydbawskubeformcom-parametergroup-editor` chart and their default values.

|     Parameter      | Description |                     Default                     |
|--------------------|-------------|-------------------------------------------------|
| apiVersion         |             | <code>memorydb.aws.kubeform.com/v1alpha1</code> |
| kind               |             | <code>ParameterGroup</code>                     |
| metadata.name      |             | <code>parametergroup</code>                     |
| metadata.namespace |             | <code>""</code>                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i memorydbawskubeformcom-parametergroup-editor bytebuilders-ui/memorydbawskubeformcom-parametergroup-editor -n default --create-namespace --version=v0.4.16 --set apiVersion=memorydb.aws.kubeform.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i memorydbawskubeformcom-parametergroup-editor bytebuilders-ui/memorydbawskubeformcom-parametergroup-editor -n default --create-namespace --version=v0.4.16 --values values.yaml
```