# Repository Editor

[Repository Editor by AppsCode](https://appscode.com) - Repository Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/storagekubestashcom-repository-editor --version=v0.30.0
$ helm upgrade -i storagekubestashcom-repository-editor appscode/storagekubestashcom-repository-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a Repository Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `storagekubestashcom-repository-editor`:

```bash
$ helm upgrade -i storagekubestashcom-repository-editor appscode/storagekubestashcom-repository-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a Repository Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `storagekubestashcom-repository-editor`:

```bash
$ helm uninstall storagekubestashcom-repository-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagekubestashcom-repository-editor` chart and their default values.

|                Parameter                | Description |                                                                                                                                                                                                     Default                                                                                                                                                                                                      |
|-----------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                 |             | <code>storage.kubestash.com</code>                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.version               |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.resource.name                  |             | <code>repositories</code>                                                                                                                                                                                                                                                                                                                                                                                        |
| metadata.resource.kind                  |             | <code>Repository</code>                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.scope                 |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.release.name                   |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                        |
| metadata.release.namespace              |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                             |
| resources.storageKubestashComRepository |             | <code>{"apiVersion":"storage.kubestash.com/v1alpha1","kind":"Repository","metadata":{"name":"ace-repo","namespace":"demo"},"spec":{"appRef":{"apiGroup":"kubedb.com","kind":"Postgres","name":"ace-db","namespace":"ace"},"deletionPolicy":"Delete","encryptionSecret":{"name":"default-encryption-secret","namespace":"stash"},"path":"ace/ace-db","storageRef":{"name":"default","namespace":"stash"}}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i storagekubestashcom-repository-editor appscode/storagekubestashcom-repository-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=storage.kubestash.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i storagekubestashcom-repository-editor appscode/storagekubestashcom-repository-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
