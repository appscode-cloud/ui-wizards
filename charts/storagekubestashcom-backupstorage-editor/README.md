# BackupStorage Editor

[BackupStorage Editor by AppsCode](https://appscode.com) - BackupStorage Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/storagekubestashcom-backupstorage-editor --version=v0.30.0
$ helm upgrade -i storagekubestashcom-backupstorage-editor appscode/storagekubestashcom-backupstorage-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a BackupStorage Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `storagekubestashcom-backupstorage-editor`:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor appscode/storagekubestashcom-backupstorage-editor -n default --create-namespace --version=v0.30.0
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

|                 Parameter                  | Description |                                                                                                                                                                                                      Default                                                                                                                                                                                                      |
|--------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                    |             | <code>storage.kubestash.com</code>                                                                                                                                                                                                                                                                                                                                                                                |
| metadata.resource.version                  |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.resource.name                     |             | <code>backupstorages</code>                                                                                                                                                                                                                                                                                                                                                                                       |
| metadata.resource.kind                     |             | <code>BackupStorage</code>                                                                                                                                                                                                                                                                                                                                                                                        |
| metadata.resource.scope                    |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.release.name                      |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata.release.namespace                 |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                              |
| resources.secret_storage_cred              |             | <code>{"apiVersion":"v1","data":{"AWS_ACCESS_KEY_ID":"\u003cAWS Access Key ID\u003e","AWS_SECRET_ACCESS_KEY":"\u003cAWS Secret Access Key\u003e"},"kind":"Secret","metadata":{"name":"s3-storage-cred","namespace":""},"type":"Opaque"}</code>                                                                                                                                                                    |
| resources.storageKubestashComBackupStorage |             | <code>{"apiVersion":"storage.kubestash.com/v1alpha1","kind":"BackupStorage","metadata":{"name":"s3","namespace":"demo"},"spec":{"default":true,"deletionPolicy":"WipeOut","storage":{"provider":"s3","s3":{"bucket":"kubestash-demo","endpoint":"s3.amazonaws.com","prefix":"/kubestash-backup","region":"us-west-1","secretName":"s3-storage-cred"}},"usagePolicy":{"allowedNamespaces":{"from":"All"}}}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor appscode/storagekubestashcom-backupstorage-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=storage.kubestash.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor appscode/storagekubestashcom-backupstorage-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
