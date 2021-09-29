# BackupConfiguration Editor

[BackupConfiguration Editor by AppsCode](https://byte.builders) - BackupConfiguration Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install stashappscodecom-backupconfiguration-editor bytebuilders-ui/stashappscodecom-backupconfiguration-editor -n default
```

## Introduction

This chart deploys a BackupConfiguration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `stashappscodecom-backupconfiguration-editor`:

```console
$ helm install stashappscodecom-backupconfiguration-editor bytebuilders-ui/stashappscodecom-backupconfiguration-editor -n default
```

The command deploys a BackupConfiguration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `stashappscodecom-backupconfiguration-editor`:

```console
$ helm delete stashappscodecom-backupconfiguration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-backupconfiguration-editor` chart and their default values.

|     Parameter      | Description |           Default            |
|--------------------|-------------|------------------------------|
| apiVersion         |             | `stash.appscode.com/v1beta1` |
| kind               |             | `BackupConfiguration`        |
| metadata.name      |             | `backupconfiguration`        |
| metadata.namespace |             | `default`                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install stashappscodecom-backupconfiguration-editor bytebuilders-ui/stashappscodecom-backupconfiguration-editor -n default --set apiVersion=stash.appscode.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install stashappscodecom-backupconfiguration-editor bytebuilders-ui/stashappscodecom-backupconfiguration-editor -n default --values values.yaml
```
