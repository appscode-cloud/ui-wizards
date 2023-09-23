# Kustomization Editor

[Kustomization Editor by AppsCode](https://byte.builders) - Kustomization Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kustomizetoolkitfluxcdio-kustomization-editor --version=v0.4.18
$ helm upgrade -i kustomizetoolkitfluxcdio-kustomization-editor bytebuilders-ui/kustomizetoolkitfluxcdio-kustomization-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a Kustomization Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `kustomizetoolkitfluxcdio-kustomization-editor`:

```bash
$ helm upgrade -i kustomizetoolkitfluxcdio-kustomization-editor bytebuilders-ui/kustomizetoolkitfluxcdio-kustomization-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a Kustomization Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kustomizetoolkitfluxcdio-kustomization-editor`:

```bash
$ helm uninstall kustomizetoolkitfluxcdio-kustomization-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kustomizetoolkitfluxcdio-kustomization-editor` chart and their default values.

|     Parameter      | Description |                     Default                      |
|--------------------|-------------|--------------------------------------------------|
| apiVersion         |             | <code>kustomize.toolkit.fluxcd.io/v1beta2</code> |
| kind               |             | <code>Kustomization</code>                       |
| metadata.name      |             | <code>kustomization</code>                       |
| metadata.namespace |             | <code>default</code>                             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kustomizetoolkitfluxcdio-kustomization-editor bytebuilders-ui/kustomizetoolkitfluxcdio-kustomization-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=kustomize.toolkit.fluxcd.io/v1beta2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kustomizetoolkitfluxcdio-kustomization-editor bytebuilders-ui/kustomizetoolkitfluxcdio-kustomization-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
