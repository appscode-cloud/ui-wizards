# JobTemplate Editor

[JobTemplate Editor by AppsCode](https://byte.builders) - JobTemplate Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/batch-jobtemplate-editor --version=v0.4.15
$ helm upgrade -i batch-jobtemplate-editor bytebuilders-ui/batch-jobtemplate-editor -n default --create-namespace --version=v0.4.15
```

## Introduction

This chart deploys a JobTemplate Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `batch-jobtemplate-editor`:

```bash
$ helm upgrade -i batch-jobtemplate-editor bytebuilders-ui/batch-jobtemplate-editor -n default --create-namespace --version=v0.4.15
```

The command deploys a JobTemplate Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `batch-jobtemplate-editor`:

```bash
$ helm uninstall batch-jobtemplate-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `batch-jobtemplate-editor` chart and their default values.

|     Parameter      | Description |          Default           |
|--------------------|-------------|----------------------------|
| apiVersion         |             | <code>batch/v1beta1</code> |
| kind               |             | <code>JobTemplate</code>   |
| metadata.name      |             | <code>jobtemplate</code>   |
| metadata.namespace |             | <code>default</code>       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i batch-jobtemplate-editor bytebuilders-ui/batch-jobtemplate-editor -n default --create-namespace --version=v0.4.15 --set apiVersion=batch/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i batch-jobtemplate-editor bytebuilders-ui/batch-jobtemplate-editor -n default --create-namespace --version=v0.4.15 --values values.yaml
```
