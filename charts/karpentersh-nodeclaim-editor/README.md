# NodeClaim Editor

[NodeClaim Editor by AppsCode](https://appscode.com) - NodeClaim Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/karpentersh-nodeclaim-editor --version=v0.30.0
$ helm upgrade -i karpentersh-nodeclaim-editor appscode/karpentersh-nodeclaim-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a NodeClaim Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `karpentersh-nodeclaim-editor`:

```bash
$ helm upgrade -i karpentersh-nodeclaim-editor appscode/karpentersh-nodeclaim-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a NodeClaim Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `karpentersh-nodeclaim-editor`:

```bash
$ helm uninstall karpentersh-nodeclaim-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `karpentersh-nodeclaim-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | <code>karpenter.sh/v1beta1</code> |
| kind               |             | <code>NodeClaim</code>            |
| metadata.name      |             | <code>nodeclaim</code>            |
| metadata.namespace |             | <code>""</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i karpentersh-nodeclaim-editor appscode/karpentersh-nodeclaim-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=karpenter.sh/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i karpentersh-nodeclaim-editor appscode/karpentersh-nodeclaim-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
