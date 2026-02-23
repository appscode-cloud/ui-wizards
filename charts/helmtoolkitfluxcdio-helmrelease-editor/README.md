# HelmRelease Editor

[HelmRelease Editor by AppsCode](https://appscode.com) - HelmRelease Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/helmtoolkitfluxcdio-helmrelease-editor --version=v0.30.0
$ helm upgrade -i helmtoolkitfluxcdio-helmrelease-editor appscode/helmtoolkitfluxcdio-helmrelease-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a HelmRelease Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `helmtoolkitfluxcdio-helmrelease-editor`:

```bash
$ helm upgrade -i helmtoolkitfluxcdio-helmrelease-editor appscode/helmtoolkitfluxcdio-helmrelease-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a HelmRelease Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `helmtoolkitfluxcdio-helmrelease-editor`:

```bash
$ helm uninstall helmtoolkitfluxcdio-helmrelease-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `helmtoolkitfluxcdio-helmrelease-editor` chart and their default values.

|     Parameter      | Description |                Default                 |
|--------------------|-------------|----------------------------------------|
| apiVersion         |             | <code>helm.toolkit.fluxcd.io/v2</code> |
| kind               |             | <code>HelmRelease</code>               |
| metadata.name      |             | <code>helmrelease</code>               |
| metadata.namespace |             | <code>default</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i helmtoolkitfluxcdio-helmrelease-editor appscode/helmtoolkitfluxcdio-helmrelease-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=helm.toolkit.fluxcd.io/v2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i helmtoolkitfluxcdio-helmrelease-editor appscode/helmtoolkitfluxcdio-helmrelease-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
