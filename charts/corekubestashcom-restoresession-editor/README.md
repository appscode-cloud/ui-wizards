# RestoreSession Editor

[RestoreSession Editor by AppsCode](https://appscode.com) - RestoreSession Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/corekubestashcom-restoresession-editor --version=v0.30.0
$ helm upgrade -i corekubestashcom-restoresession-editor appscode/corekubestashcom-restoresession-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a RestoreSession Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `corekubestashcom-restoresession-editor`:

```bash
$ helm upgrade -i corekubestashcom-restoresession-editor appscode/corekubestashcom-restoresession-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a RestoreSession Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `corekubestashcom-restoresession-editor`:

```bash
$ helm uninstall corekubestashcom-restoresession-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `corekubestashcom-restoresession-editor` chart and their default values.

|                Parameter                 | Description |                                                                                                                                                                                                                                                                       Default                                                                                                                                                                                                                                                                       |
|------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                  |             | <code>core.kubestash.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.resource.version                |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.name                   |             | <code>restoresessions</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| metadata.resource.kind                   |             | <code>RestoreSession</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata.resource.scope                  |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.release.name                    |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.release.namespace               |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| resources.coreKubestashComRestoreSession |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"restore-app","namespace":"demo"},"spec":{"addon":{"jobTemplate":{"spec":{"securityContext":{"runAsUser":1001880000}}},"name":"mongodb-addon","tasks":[{"name":"logical-backup-restore"}]},"dataSource":{"encryptionSecret":{"name":"encrypt-secret","namespace":"demo"},"repository":"full-repo","snapshot":"full-repo-mg-backup-full-mongo-1723451040"},"target":{"apiGroup":"kubedb.com","kind":"MongoDB","name":"app","namespace":"demo"}}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i corekubestashcom-restoresession-editor appscode/corekubestashcom-restoresession-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=core.kubestash.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i corekubestashcom-restoresession-editor appscode/corekubestashcom-restoresession-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
