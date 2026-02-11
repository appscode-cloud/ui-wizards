# BackupConfiguration Editor

[BackupConfiguration Editor by AppsCode](https://appscode.com) - BackupConfiguration Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/stashappscodecom-backupconfiguration-editor --version=v0.30.0
$ helm upgrade -i stashappscodecom-backupconfiguration-editor appscode/stashappscodecom-backupconfiguration-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a BackupConfiguration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-backupconfiguration-editor`:

```bash
$ helm upgrade -i stashappscodecom-backupconfiguration-editor appscode/stashappscodecom-backupconfiguration-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a BackupConfiguration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-backupconfiguration-editor`:

```bash
$ helm uninstall stashappscodecom-backupconfiguration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-backupconfiguration-editor` chart and their default values.

|     Parameter      | Description |                 Default                 |
|--------------------|-------------|-----------------------------------------|
| apiVersion         |             | <code>stash.appscode.com/v1beta1</code> |
| kind               |             | <code>BackupConfiguration</code>        |
| metadata.name      |             | <code>backupconfiguration</code>        |
| metadata.namespace |             | <code>default</code>                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-backupconfiguration-editor appscode/stashappscodecom-backupconfiguration-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=stash.appscode.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-backupconfiguration-editor appscode/stashappscodecom-backupconfiguration-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
