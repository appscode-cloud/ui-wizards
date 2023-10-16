# Gen2Environment Editor

[Gen2Environment Editor by AppsCode](https://byte.builders) - Gen2Environment Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/timeseriesinsightsazureupboundio-gen2environment-editor --version=v0.4.18
$ helm upgrade -i timeseriesinsightsazureupboundio-gen2environment-editor bytebuilders-ui/timeseriesinsightsazureupboundio-gen2environment-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a Gen2Environment Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `timeseriesinsightsazureupboundio-gen2environment-editor`:

```bash
$ helm upgrade -i timeseriesinsightsazureupboundio-gen2environment-editor bytebuilders-ui/timeseriesinsightsazureupboundio-gen2environment-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a Gen2Environment Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `timeseriesinsightsazureupboundio-gen2environment-editor`:

```bash
$ helm uninstall timeseriesinsightsazureupboundio-gen2environment-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `timeseriesinsightsazureupboundio-gen2environment-editor` chart and their default values.

|     Parameter      | Description |                         Default                          |
|--------------------|-------------|----------------------------------------------------------|
| apiVersion         |             | <code>timeseriesinsights.azure.upbound.io/v1beta1</code> |
| kind               |             | <code>Gen2Environment</code>                             |
| metadata.name      |             | <code>gen2environment</code>                             |
| metadata.namespace |             | <code>""</code>                                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i timeseriesinsightsazureupboundio-gen2environment-editor bytebuilders-ui/timeseriesinsightsazureupboundio-gen2environment-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=timeseriesinsights.azure.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i timeseriesinsightsazureupboundio-gen2environment-editor bytebuilders-ui/timeseriesinsightsazureupboundio-gen2environment-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
