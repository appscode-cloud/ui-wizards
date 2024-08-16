# BackupStorage Editor

[BackupStorage Editor by AppsCode](https://byte.builders) - BackupStorage Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/storagekubestashcom-backupstorage-editor --version=v0.4.21
$ helm upgrade -i storagekubestashcom-backupstorage-editor appscode-charts-oci/storagekubestashcom-backupstorage-editor -n default --create-namespace --version=v0.4.21
```

## Introduction

This chart deploys a BackupStorage Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `storagekubestashcom-backupstorage-editor`:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor appscode-charts-oci/storagekubestashcom-backupstorage-editor -n default --create-namespace --version=v0.4.21
```

The command deploys a BackupStorage Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `storagekubestashcom-backupstorage-editor`:

```bash
$ helm uninstall storagekubestashcom-backupstorage-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagekubestashcom-backupstorage-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>storage.kubestash.com/v1alpha1</code> |
| kind               |             | <code>BackupStorage</code>                  |
| metadata.name      |             | <code>backupstorage</code>                  |
| metadata.namespace |             | <code>default</code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor appscode-charts-oci/storagekubestashcom-backupstorage-editor -n default --create-namespace --version=v0.4.21 --set apiVersion=storage.kubestash.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor appscode-charts-oci/storagekubestashcom-backupstorage-editor -n default --create-namespace --version=v0.4.21 --values values.yaml
```
