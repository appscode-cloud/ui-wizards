# BackupBatch Editor

[BackupBatch Editor by AppsCode](https://appscode.com) - BackupBatch Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/stashappscodecom-backupbatch-editor --version=v0.12.0
$ helm upgrade -i stashappscodecom-backupbatch-editor appscode-charts-oci/stashappscodecom-backupbatch-editor -n default --create-namespace --version=v0.12.0
```

## Introduction

This chart deploys a BackupBatch Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-backupbatch-editor`:

```bash
$ helm upgrade -i stashappscodecom-backupbatch-editor appscode-charts-oci/stashappscodecom-backupbatch-editor -n default --create-namespace --version=v0.12.0
```

The command deploys a BackupBatch Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-backupbatch-editor`:

```bash
$ helm uninstall stashappscodecom-backupbatch-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-backupbatch-editor` chart and their default values.

|     Parameter      | Description |                 Default                 |
|--------------------|-------------|-----------------------------------------|
| apiVersion         |             | <code>stash.appscode.com/v1beta1</code> |
| kind               |             | <code>BackupBatch</code>                |
| metadata.name      |             | <code>backupbatch</code>                |
| metadata.namespace |             | <code>default</code>                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-backupbatch-editor appscode-charts-oci/stashappscodecom-backupbatch-editor -n default --create-namespace --version=v0.12.0 --set apiVersion=stash.appscode.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-backupbatch-editor appscode-charts-oci/stashappscodecom-backupbatch-editor -n default --create-namespace --version=v0.12.0 --values values.yaml
```
