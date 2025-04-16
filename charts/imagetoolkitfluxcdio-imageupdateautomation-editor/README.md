# ImageUpdateAutomation Editor

[ImageUpdateAutomation Editor by AppsCode](https://appscode.com) - ImageUpdateAutomation Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/imagetoolkitfluxcdio-imageupdateautomation-editor --version=v0.16.0
$ helm upgrade -i imagetoolkitfluxcdio-imageupdateautomation-editor appscode/imagetoolkitfluxcdio-imageupdateautomation-editor -n default --create-namespace --version=v0.16.0
```

## Introduction

This chart deploys a ImageUpdateAutomation Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `imagetoolkitfluxcdio-imageupdateautomation-editor`:

```bash
$ helm upgrade -i imagetoolkitfluxcdio-imageupdateautomation-editor appscode/imagetoolkitfluxcdio-imageupdateautomation-editor -n default --create-namespace --version=v0.16.0
```

The command deploys a ImageUpdateAutomation Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `imagetoolkitfluxcdio-imageupdateautomation-editor`:

```bash
$ helm uninstall imagetoolkitfluxcdio-imageupdateautomation-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `imagetoolkitfluxcdio-imageupdateautomation-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>image.toolkit.fluxcd.io/v1beta2</code> |
| kind               |             | <code>ImageUpdateAutomation</code>           |
| metadata.name      |             | <code>imageupdateautomation</code>           |
| metadata.namespace |             | <code>default</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i imagetoolkitfluxcdio-imageupdateautomation-editor appscode/imagetoolkitfluxcdio-imageupdateautomation-editor -n default --create-namespace --version=v0.16.0 --set apiVersion=image.toolkit.fluxcd.io/v1beta2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i imagetoolkitfluxcdio-imageupdateautomation-editor appscode/imagetoolkitfluxcdio-imageupdateautomation-editor -n default --create-namespace --version=v0.16.0 --values values.yaml
```
