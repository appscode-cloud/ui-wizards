# OutputPowerBI Editor

[OutputPowerBI Editor by AppsCode](https://byte.builders) - OutputPowerBI Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/streamanalyticsazureupboundio-outputpowerbi-editor --version=v0.4.18
$ helm upgrade -i streamanalyticsazureupboundio-outputpowerbi-editor bytebuilders-ui/streamanalyticsazureupboundio-outputpowerbi-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a OutputPowerBI Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `streamanalyticsazureupboundio-outputpowerbi-editor`:

```bash
$ helm upgrade -i streamanalyticsazureupboundio-outputpowerbi-editor bytebuilders-ui/streamanalyticsazureupboundio-outputpowerbi-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a OutputPowerBI Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `streamanalyticsazureupboundio-outputpowerbi-editor`:

```bash
$ helm uninstall streamanalyticsazureupboundio-outputpowerbi-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `streamanalyticsazureupboundio-outputpowerbi-editor` chart and their default values.

|     Parameter      | Description |                        Default                        |
|--------------------|-------------|-------------------------------------------------------|
| apiVersion         |             | <code>streamanalytics.azure.upbound.io/v1beta1</code> |
| kind               |             | <code>OutputPowerBI</code>                            |
| metadata.name      |             | <code>outputpowerbi</code>                            |
| metadata.namespace |             | <code>""</code>                                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i streamanalyticsazureupboundio-outputpowerbi-editor bytebuilders-ui/streamanalyticsazureupboundio-outputpowerbi-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=streamanalytics.azure.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i streamanalyticsazureupboundio-outputpowerbi-editor bytebuilders-ui/streamanalyticsazureupboundio-outputpowerbi-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
