# ImagePolicy Editor

[ImagePolicy Editor by AppsCode](https://byte.builders) - ImagePolicy Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/imagetoolkitfluxcdio-imagepolicy-editor --version=v0.4.14
$ helm upgrade -i imagetoolkitfluxcdio-imagepolicy-editor bytebuilders-ui/imagetoolkitfluxcdio-imagepolicy-editor -n default --create-namespace --version=v0.4.14
```

## Introduction

This chart deploys a ImagePolicy Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `imagetoolkitfluxcdio-imagepolicy-editor`:

```bash
$ helm upgrade -i imagetoolkitfluxcdio-imagepolicy-editor bytebuilders-ui/imagetoolkitfluxcdio-imagepolicy-editor -n default --create-namespace --version=v0.4.14
```

The command deploys a ImagePolicy Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `imagetoolkitfluxcdio-imagepolicy-editor`:

```bash
$ helm uninstall imagetoolkitfluxcdio-imagepolicy-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `imagetoolkitfluxcdio-imagepolicy-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>image.toolkit.fluxcd.io/v1beta1</code> |
| kind               |             | <code>ImagePolicy</code>                     |
| metadata.name      |             | <code>imagepolicy</code>                     |
| metadata.namespace |             | <code>default</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i imagetoolkitfluxcdio-imagepolicy-editor bytebuilders-ui/imagetoolkitfluxcdio-imagepolicy-editor -n default --create-namespace --version=v0.4.14 --set apiVersion=image.toolkit.fluxcd.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i imagetoolkitfluxcdio-imagepolicy-editor bytebuilders-ui/imagetoolkitfluxcdio-imagepolicy-editor -n default --create-namespace --version=v0.4.14 --values values.yaml
```