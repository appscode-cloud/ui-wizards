# MetricsConfiguration Editor

[MetricsConfiguration Editor by AppsCode](https://byte.builders) - MetricsConfiguration Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install metricsappscodecom-metricsconfiguration-editor bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor -n default
```

## Introduction

This chart deploys a MetricsConfiguration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `metricsappscodecom-metricsconfiguration-editor`:

```console
$ helm install metricsappscodecom-metricsconfiguration-editor bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor -n default
```

The command deploys a MetricsConfiguration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `metricsappscodecom-metricsconfiguration-editor`:

```console
$ helm delete metricsappscodecom-metricsconfiguration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `metricsappscodecom-metricsconfiguration-editor` chart and their default values.

|   Parameter   | Description |             Default             |
|---------------|-------------|---------------------------------|
| apiVersion    |             | `metrics.appscode.com/v1alpha1` |
| kind          |             | `MetricsConfiguration`          |
| metadata.name |             | `metricsconfiguration`          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install metricsappscodecom-metricsconfiguration-editor bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor -n default --set apiVersion=metrics.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install metricsappscodecom-metricsconfiguration-editor bytebuilders-ui/metricsappscodecom-metricsconfiguration-editor -n default --values values.yaml
```
