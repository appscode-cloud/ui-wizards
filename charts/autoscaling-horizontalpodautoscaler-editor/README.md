# HorizontalPodAutoscaler Editor

[HorizontalPodAutoscaler Editor by AppsCode](https://byte.builders) - HorizontalPodAutoscaler Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/autoscaling-horizontalpodautoscaler-editor --version=v0.4.10
$ helm upgrade -i autoscaling-horizontalpodautoscaler-editor bytebuilders-ui/autoscaling-horizontalpodautoscaler-editor -n default --create-namespace --version=v0.4.10
```

## Introduction

This chart deploys a HorizontalPodAutoscaler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `autoscaling-horizontalpodautoscaler-editor`:

```bash
$ helm upgrade -i autoscaling-horizontalpodautoscaler-editor bytebuilders-ui/autoscaling-horizontalpodautoscaler-editor -n default --create-namespace --version=v0.4.10
```

The command deploys a HorizontalPodAutoscaler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `autoscaling-horizontalpodautoscaler-editor`:

```bash
$ helm uninstall autoscaling-horizontalpodautoscaler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `autoscaling-horizontalpodautoscaler-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>autoscaling/v2beta2</code>     |
| kind               |             | <code>HorizontalPodAutoscaler</code> |
| metadata.name      |             | <code>horizontalpodautoscaler</code> |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i autoscaling-horizontalpodautoscaler-editor bytebuilders-ui/autoscaling-horizontalpodautoscaler-editor -n default --create-namespace --version=v0.4.10 --set apiVersion=autoscaling/v2beta2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i autoscaling-horizontalpodautoscaler-editor bytebuilders-ui/autoscaling-horizontalpodautoscaler-editor -n default --create-namespace --version=v0.4.10 --values values.yaml
```
