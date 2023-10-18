# ParameterGroup Editor

[ParameterGroup Editor by AppsCode](https://byte.builders) - ParameterGroup Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/redshiftawsupboundio-parametergroup-editor --version=v0.4.18
$ helm upgrade -i redshiftawsupboundio-parametergroup-editor bytebuilders-ui/redshiftawsupboundio-parametergroup-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a ParameterGroup Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `redshiftawsupboundio-parametergroup-editor`:

```bash
$ helm upgrade -i redshiftawsupboundio-parametergroup-editor bytebuilders-ui/redshiftawsupboundio-parametergroup-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a ParameterGroup Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `redshiftawsupboundio-parametergroup-editor`:

```bash
$ helm uninstall redshiftawsupboundio-parametergroup-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `redshiftawsupboundio-parametergroup-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>redshift.aws.upbound.io/v1beta1</code> |
| kind               |             | <code>ParameterGroup</code>                  |
| metadata.name      |             | <code>parametergroup</code>                  |
| metadata.namespace |             | <code>""</code>                              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i redshiftawsupboundio-parametergroup-editor bytebuilders-ui/redshiftawsupboundio-parametergroup-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=redshift.aws.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i redshiftawsupboundio-parametergroup-editor bytebuilders-ui/redshiftawsupboundio-parametergroup-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```