# Crawler Editor

[Crawler Editor by AppsCode](https://byte.builders) - Crawler Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/glueawsupboundio-crawler-editor --version=v0.4.18
$ helm upgrade -i glueawsupboundio-crawler-editor bytebuilders-ui/glueawsupboundio-crawler-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a Crawler Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `glueawsupboundio-crawler-editor`:

```bash
$ helm upgrade -i glueawsupboundio-crawler-editor bytebuilders-ui/glueawsupboundio-crawler-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a Crawler Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `glueawsupboundio-crawler-editor`:

```bash
$ helm uninstall glueawsupboundio-crawler-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `glueawsupboundio-crawler-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>glue.aws.upbound.io/v1beta1</code> |
| kind               |             | <code>Crawler</code>                     |
| metadata.name      |             | <code>crawler</code>                     |
| metadata.namespace |             | <code>""</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i glueawsupboundio-crawler-editor bytebuilders-ui/glueawsupboundio-crawler-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=glue.aws.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i glueawsupboundio-crawler-editor bytebuilders-ui/glueawsupboundio-crawler-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```