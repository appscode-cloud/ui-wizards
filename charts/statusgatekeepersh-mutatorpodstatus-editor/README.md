# MutatorPodStatus Editor

[MutatorPodStatus Editor by AppsCode](https://byte.builders) - MutatorPodStatus Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/statusgatekeepersh-mutatorpodstatus-editor --version=v0.4.18
$ helm upgrade -i statusgatekeepersh-mutatorpodstatus-editor appscode-charts-oci/statusgatekeepersh-mutatorpodstatus-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a MutatorPodStatus Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `statusgatekeepersh-mutatorpodstatus-editor`:

```bash
$ helm upgrade -i statusgatekeepersh-mutatorpodstatus-editor appscode-charts-oci/statusgatekeepersh-mutatorpodstatus-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a MutatorPodStatus Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `statusgatekeepersh-mutatorpodstatus-editor`:

```bash
$ helm uninstall statusgatekeepersh-mutatorpodstatus-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `statusgatekeepersh-mutatorpodstatus-editor` chart and their default values.

|     Parameter      | Description |                  Default                  |
|--------------------|-------------|-------------------------------------------|
| apiVersion         |             | <code>status.gatekeeper.sh/v1beta1</code> |
| kind               |             | <code>MutatorPodStatus</code>             |
| metadata.name      |             | <code>mutatorpodstatus</code>             |
| metadata.namespace |             | <code>default</code>                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i statusgatekeepersh-mutatorpodstatus-editor appscode-charts-oci/statusgatekeepersh-mutatorpodstatus-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=status.gatekeeper.sh/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i statusgatekeepersh-mutatorpodstatus-editor appscode-charts-oci/statusgatekeepersh-mutatorpodstatus-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
