# Stash Repository Editor UI Options

[Stash Repository Editor UI Options](https://byte.builders) - Stash Repository Editor UI Options

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/storagekubestashcom-backupstorage-editor-options --version=v0.30.0
$ helm upgrade -i storagekubestashcom-backupstorage-editor-options appscode/storagekubestashcom-backupstorage-editor-options -n kube-system --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a Stash Repository Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `storagekubestashcom-backupstorage-editor-options`:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor-options appscode/storagekubestashcom-backupstorage-editor-options -n kube-system --create-namespace --version=v0.30.0
```

The command deploys a Stash Repository Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `storagekubestashcom-backupstorage-editor-options`:

```bash
$ helm uninstall storagekubestashcom-backupstorage-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagekubestashcom-backupstorage-editor-options` chart and their default values.

|                       Parameter                       |                    Description                     |               Default                |
|-------------------------------------------------------|----------------------------------------------------|--------------------------------------|
| metadata.resource.group                               |                                                    | <code>storage.kubestash.com</code>   |
| metadata.resource.kind                                |                                                    | <code>BackupStorage</code>           |
| metadata.resource.name                                |                                                    | <code>backupstorages</code>          |
| metadata.resource.scope                               |                                                    | <code>Namespaced</code>              |
| metadata.resource.version                             |                                                    | <code>v1alpha1</code>                |
| metadata.release.name                                 | Release name                                       | <code>""</code>                      |
| metadata.release.namespace                            | Release namespace                                  | <code>""</code>                      |
| spec.annotations                                      | Annotations to add to the database custom resource | <code>{}</code>                      |
| spec.labels                                           | Labels to add to all the template objects          | <code>{}</code>                      |
| spec.backend.provider                                 |                                                    | <code>"" # s3,gcs,azure,local</code> |
| spec.backend.s3.spec.endpoint                         |                                                    | <code>""</code>                      |
| spec.backend.s3.spec.bucket                           |                                                    | <code>""</code>                      |
| spec.backend.s3.auth.AWS_ACCESS_KEY_ID                |                                                    | <code>""</code>                      |
| spec.backend.s3.auth.AWS_SECRET_ACCESS_KEY            |                                                    | <code>""</code>                      |
| spec.backend.azure.spec.container                     |                                                    | <code>""</code>                      |
| spec.backend.azure.auth.AZURE_ACCOUNT_NAME            |                                                    | <code>""</code>                      |
| spec.backend.azure.auth.AZURE_ACCOUNT_KEY             |                                                    | <code>""</code>                      |
| spec.backend.gcs.spec.bucket                          |                                                    | <code>""</code>                      |
| spec.backend.gcs.auth.GOOGLE_PROJECT_ID               |                                                    | <code>""</code>                      |
| spec.backend.gcs.auth.GOOGLE_SERVICE_ACCOUNT_JSON_KEY |                                                    | <code>""</code>                      |
| spec.backend.local.mountPath                          |                                                    | <code>"ll"</code>                    |
| spec.backend.local.persistentVolumeClaim.claimName    |                                                    | <code>"cc"</code>                    |
| spec.deletionPolicy                                   |                                                    | <code>"Delete"</code>                |
| spec.runtimeSettings.securityContext                  |                                                    | <code></code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor-options appscode/storagekubestashcom-backupstorage-editor-options -n kube-system --create-namespace --version=v0.30.0 --set metadata.resource.group=storage.kubestash.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i storagekubestashcom-backupstorage-editor-options appscode/storagekubestashcom-backupstorage-editor-options -n kube-system --create-namespace --version=v0.30.0 --values values.yaml
```
