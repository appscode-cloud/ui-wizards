# ModifySet Editor

[ModifySet Editor by AppsCode](https://byte.builders) - ModifySet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/mutationsgatekeepersh-modifyset-editor --version=v0.4.20
$ helm upgrade -i mutationsgatekeepersh-modifyset-editor appscode-charts-oci/mutationsgatekeepersh-modifyset-editor -n default --create-namespace --version=v0.4.20
```

## Introduction

This chart deploys a ModifySet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `mutationsgatekeepersh-modifyset-editor`:

```bash
$ helm upgrade -i mutationsgatekeepersh-modifyset-editor appscode-charts-oci/mutationsgatekeepersh-modifyset-editor -n default --create-namespace --version=v0.4.20
```

The command deploys a ModifySet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `mutationsgatekeepersh-modifyset-editor`:

```bash
$ helm uninstall mutationsgatekeepersh-modifyset-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `mutationsgatekeepersh-modifyset-editor` chart and their default values.

|     Parameter      | Description |                 Default                 |
|--------------------|-------------|-----------------------------------------|
| apiVersion         |             | <code>mutations.gatekeeper.sh/v1</code> |
| kind               |             | <code>ModifySet</code>                  |
| metadata.name      |             | <code>modifyset</code>                  |
| metadata.namespace |             | <code>""</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i mutationsgatekeepersh-modifyset-editor appscode-charts-oci/mutationsgatekeepersh-modifyset-editor -n default --create-namespace --version=v0.4.20 --set apiVersion=mutations.gatekeeper.sh/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i mutationsgatekeepersh-modifyset-editor appscode-charts-oci/mutationsgatekeepersh-modifyset-editor -n default --create-namespace --version=v0.4.20 --values values.yaml
```
