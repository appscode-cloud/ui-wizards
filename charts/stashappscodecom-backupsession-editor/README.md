# BackupSession Editor

[BackupSession Editor by AppsCode](https://byte.builders) - BackupSession Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/stashappscodecom-backupsession-editor --version=v0.4.4
$ helm upgrade -i stashappscodecom-backupsession-editor bytebuilders-ui/stashappscodecom-backupsession-editor -n default --create-namespace --version=v0.4.4
```

## Introduction

This chart deploys a BackupSession Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-backupsession-editor`:

```bash
$ helm upgrade -i stashappscodecom-backupsession-editor bytebuilders-ui/stashappscodecom-backupsession-editor -n default --create-namespace --version=v0.4.4
```

The command deploys a BackupSession Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-backupsession-editor`:

```bash
$ helm uninstall stashappscodecom-backupsession-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-backupsession-editor` chart and their default values.

|     Parameter      | Description |                 Default                 |
|--------------------|-------------|-----------------------------------------|
| apiVersion         |             | <code>stash.appscode.com/v1beta1</code> |
| kind               |             | <code>BackupSession</code>              |
| metadata.name      |             | <code>backupsession</code>              |
| metadata.namespace |             | <code>default</code>                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-backupsession-editor bytebuilders-ui/stashappscodecom-backupsession-editor -n default --create-namespace --version=v0.4.4 --set apiVersion=stash.appscode.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-backupsession-editor bytebuilders-ui/stashappscodecom-backupsession-editor -n default --create-namespace --version=v0.4.4 --values values.yaml
```
