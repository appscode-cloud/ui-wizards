# MetricsConfiguration Editor

[MetricsConfiguration Editor by AppsCode](https://byte.builders) - MetricsConfiguration Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor --version=v0.4.10
$ helm upgrade -i metricsappscodecom-metricsconfiguration-editor bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor -n default --create-namespace --version=v0.4.10
```

## Introduction

This chart deploys a MetricsConfiguration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `metricsappscodecom-metricsconfiguration-editor`:

```bash
$ helm upgrade -i metricsappscodecom-metricsconfiguration-editor bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor -n default --create-namespace --version=v0.4.10
```

The command deploys a MetricsConfiguration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `metricsappscodecom-metricsconfiguration-editor`:

```bash
$ helm uninstall metricsappscodecom-metricsconfiguration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `metricsappscodecom-metricsconfiguration-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>metrics.appscode.com/v1alpha1</code> |
| kind               |             | <code>MetricsConfiguration</code>          |
| metadata.name      |             | <code>metricsconfiguration</code>          |
| metadata.namespace |             | <code>""</code>                            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i metricsappscodecom-metricsconfiguration-editor bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor -n default --create-namespace --version=v0.4.10 --set apiVersion=metrics.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i metricsappscodecom-metricsconfiguration-editor bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor -n default --create-namespace --version=v0.4.10 --values values.yaml
```
