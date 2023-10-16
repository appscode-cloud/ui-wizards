# Accelerator Editor

[Accelerator Editor by AppsCode](https://byte.builders) - Accelerator Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/globalacceleratorawsupboundio-accelerator-editor --version=v0.4.18
$ helm upgrade -i globalacceleratorawsupboundio-accelerator-editor bytebuilders-ui/globalacceleratorawsupboundio-accelerator-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a Accelerator Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `globalacceleratorawsupboundio-accelerator-editor`:

```bash
$ helm upgrade -i globalacceleratorawsupboundio-accelerator-editor bytebuilders-ui/globalacceleratorawsupboundio-accelerator-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a Accelerator Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `globalacceleratorawsupboundio-accelerator-editor`:

```bash
$ helm uninstall globalacceleratorawsupboundio-accelerator-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `globalacceleratorawsupboundio-accelerator-editor` chart and their default values.

|     Parameter      | Description |                        Default                        |
|--------------------|-------------|-------------------------------------------------------|
| apiVersion         |             | <code>globalaccelerator.aws.upbound.io/v1beta1</code> |
| kind               |             | <code>Accelerator</code>                              |
| metadata.name      |             | <code>accelerator</code>                              |
| metadata.namespace |             | <code>""</code>                                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i globalacceleratorawsupboundio-accelerator-editor bytebuilders-ui/globalacceleratorawsupboundio-accelerator-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=globalaccelerator.aws.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i globalacceleratorawsupboundio-accelerator-editor bytebuilders-ui/globalacceleratorawsupboundio-accelerator-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
