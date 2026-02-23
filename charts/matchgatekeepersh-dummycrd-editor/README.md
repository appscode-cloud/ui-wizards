# DummyCRD Editor

[DummyCRD Editor by AppsCode](https://appscode.com) - DummyCRD Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/matchgatekeepersh-dummycrd-editor --version=v0.30.0
$ helm upgrade -i matchgatekeepersh-dummycrd-editor appscode/matchgatekeepersh-dummycrd-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a DummyCRD Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `matchgatekeepersh-dummycrd-editor`:

```bash
$ helm upgrade -i matchgatekeepersh-dummycrd-editor appscode/matchgatekeepersh-dummycrd-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a DummyCRD Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `matchgatekeepersh-dummycrd-editor`:

```bash
$ helm uninstall matchgatekeepersh-dummycrd-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `matchgatekeepersh-dummycrd-editor` chart and their default values.

|     Parameter      | Description |                Default                 |
|--------------------|-------------|----------------------------------------|
| apiVersion         |             | <code>match.gatekeeper.sh/match</code> |
| kind               |             | <code>DummyCRD</code>                  |
| metadata.name      |             | <code>dummycrd</code>                  |
| metadata.namespace |             | <code>default</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i matchgatekeepersh-dummycrd-editor appscode/matchgatekeepersh-dummycrd-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=match.gatekeeper.sh/match
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i matchgatekeepersh-dummycrd-editor appscode/matchgatekeepersh-dummycrd-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
