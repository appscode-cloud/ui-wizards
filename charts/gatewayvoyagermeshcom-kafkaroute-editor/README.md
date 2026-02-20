# KafkaRoute Editor

[KafkaRoute Editor by AppsCode](https://appscode.com) - KafkaRoute Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/gatewayvoyagermeshcom-kafkaroute-editor --version=v0.30.0
$ helm upgrade -i gatewayvoyagermeshcom-kafkaroute-editor appscode/gatewayvoyagermeshcom-kafkaroute-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a KafkaRoute Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `gatewayvoyagermeshcom-kafkaroute-editor`:

```bash
$ helm upgrade -i gatewayvoyagermeshcom-kafkaroute-editor appscode/gatewayvoyagermeshcom-kafkaroute-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a KafkaRoute Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `gatewayvoyagermeshcom-kafkaroute-editor`:

```bash
$ helm uninstall gatewayvoyagermeshcom-kafkaroute-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `gatewayvoyagermeshcom-kafkaroute-editor` chart and their default values.

|     Parameter      | Description |                    Default                    |
|--------------------|-------------|-----------------------------------------------|
| apiVersion         |             | <code>gateway.voyagermesh.com/v1alpha1</code> |
| kind               |             | <code>KafkaRoute</code>                       |
| metadata.name      |             | <code>kafkaroute</code>                       |
| metadata.namespace |             | <code>default</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i gatewayvoyagermeshcom-kafkaroute-editor appscode/gatewayvoyagermeshcom-kafkaroute-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=gateway.voyagermesh.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i gatewayvoyagermeshcom-kafkaroute-editor appscode/gatewayvoyagermeshcom-kafkaroute-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
