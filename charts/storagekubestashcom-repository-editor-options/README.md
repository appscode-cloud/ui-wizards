# Stash Repository Editor UI Options

[Stash Repository Editor UI Options](https://byte.builders) - Stash Repository Editor UI Options

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/storagekubestashcom-repository-editor-options --version=v0.30.0
$ helm upgrade -i storagekubestashcom-repository-editor-options appscode/storagekubestashcom-repository-editor-options -n kube-system --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a Stash Repository Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `storagekubestashcom-repository-editor-options`:

```bash
$ helm upgrade -i storagekubestashcom-repository-editor-options appscode/storagekubestashcom-repository-editor-options -n kube-system --create-namespace --version=v0.30.0
```

The command deploys a Stash Repository Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `storagekubestashcom-repository-editor-options`:

```bash
$ helm uninstall storagekubestashcom-repository-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `storagekubestashcom-repository-editor-options` chart and their default values.

|            Parameter            |                    Description                     |              Default               |
|---------------------------------|----------------------------------------------------|------------------------------------|
| metadata.resource.group         |                                                    | <code>storage.kubestash.com</code> |
| metadata.resource.kind          |                                                    | <code>Repository</code>            |
| metadata.resource.name          |                                                    | <code>repositories</code>          |
| metadata.resource.scope         |                                                    | <code>Namespaced</code>            |
| metadata.resource.version       |                                                    | <code>v1alpha1</code>              |
| metadata.release.name           | Release name                                       | <code>""</code>                    |
| metadata.release.namespace      | Release namespace                                  | <code>""</code>                    |
| spec.annotations                | Annotations to add to the database custom resource | <code>{}</code>                    |
| spec.labels                     | Labels to add to all the template objects          | <code>{}</code>                    |
| spec.storageRef.name            |                                                    | <code>""</code>                    |
| spec.storageRef.namespace       |                                                    | <code>""</code>                    |
| spec.encryptionSecret.name      |                                                    | <code>""</code>                    |
| spec.encryptionSecret.namespace |                                                    | <code>""</code>                    |
| spec.appRef.apiGroup            |                                                    | <code>"kubedb.com"</code>          |
| spec.appRef.kind                |                                                    | <code>""</code>                    |
| spec.appRef.name                |                                                    | <code>""</code>                    |
| spec.appRef.namespace           |                                                    | <code>""</code>                    |
| spec.path                       |                                                    | <code>""</code>                    |
| spec.deletionPolicy             |                                                    | <code>Delete</code>                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i storagekubestashcom-repository-editor-options appscode/storagekubestashcom-repository-editor-options -n kube-system --create-namespace --version=v0.30.0 --set metadata.resource.group=storage.kubestash.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i storagekubestashcom-repository-editor-options appscode/storagekubestashcom-repository-editor-options -n kube-system --create-namespace --version=v0.30.0 --values values.yaml
```
