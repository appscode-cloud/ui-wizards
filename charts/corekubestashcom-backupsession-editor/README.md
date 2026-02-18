# BackupSession Editor

[BackupSession Editor by AppsCode](https://appscode.com) - BackupSession Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/corekubestashcom-backupsession-editor --version=v0.30.0
$ helm upgrade -i corekubestashcom-backupsession-editor appscode/corekubestashcom-backupsession-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a BackupSession Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `corekubestashcom-backupsession-editor`:

```bash
$ helm upgrade -i corekubestashcom-backupsession-editor appscode/corekubestashcom-backupsession-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a BackupSession Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `corekubestashcom-backupsession-editor`:

```bash
$ helm uninstall corekubestashcom-backupsession-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `corekubestashcom-backupsession-editor` chart and their default values.

|                Parameter                | Description |                                                                                                                            Default                                                                                                                             |
|-----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                 |             | <code>core.kubestash.com</code>                                                                                                                                                                                                                                |
| metadata.resource.version               |             | <code>v1alpha1</code>                                                                                                                                                                                                                                          |
| metadata.resource.name                  |             | <code>backupsessions</code>                                                                                                                                                                                                                                    |
| metadata.resource.kind                  |             | <code>BackupSession</code>                                                                                                                                                                                                                                     |
| metadata.resource.scope                 |             | <code>Namespaced</code>                                                                                                                                                                                                                                        |
| metadata.release.name                   |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                      |
| metadata.release.namespace              |             | <code>default</code>                                                                                                                                                                                                                                           |
| resources.coreKubestashComBackupSession |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupSession","metadata":{"name":"backup-app","namespace":"demo"},"spec":{"invoker":{"apiGroup":"core.kubestash.com","kind":"BackupConfiguration","name":"ace-db"},"session":"full-backup"}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i corekubestashcom-backupsession-editor appscode/corekubestashcom-backupsession-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=core.kubestash.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i corekubestashcom-backupsession-editor appscode/corekubestashcom-backupsession-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
