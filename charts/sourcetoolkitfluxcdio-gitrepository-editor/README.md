# GitRepository Editor

[GitRepository Editor by AppsCode](https://appscode.com) - GitRepository Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/sourcetoolkitfluxcdio-gitrepository-editor --version=v0.13.0
$ helm upgrade -i sourcetoolkitfluxcdio-gitrepository-editor appscode-charts-oci/sourcetoolkitfluxcdio-gitrepository-editor -n default --create-namespace --version=v0.13.0
```

## Introduction

This chart deploys a GitRepository Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `sourcetoolkitfluxcdio-gitrepository-editor`:

```bash
$ helm upgrade -i sourcetoolkitfluxcdio-gitrepository-editor appscode-charts-oci/sourcetoolkitfluxcdio-gitrepository-editor -n default --create-namespace --version=v0.13.0
```

The command deploys a GitRepository Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `sourcetoolkitfluxcdio-gitrepository-editor`:

```bash
$ helm uninstall sourcetoolkitfluxcdio-gitrepository-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `sourcetoolkitfluxcdio-gitrepository-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>source.toolkit.fluxcd.io/v1</code> |
| kind               |             | <code>GitRepository</code>               |
| metadata.name      |             | <code>gitrepository</code>               |
| metadata.namespace |             | <code>default</code>                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i sourcetoolkitfluxcdio-gitrepository-editor appscode-charts-oci/sourcetoolkitfluxcdio-gitrepository-editor -n default --create-namespace --version=v0.13.0 --set apiVersion=source.toolkit.fluxcd.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i sourcetoolkitfluxcdio-gitrepository-editor appscode-charts-oci/sourcetoolkitfluxcdio-gitrepository-editor -n default --create-namespace --version=v0.13.0 --values values.yaml
```
