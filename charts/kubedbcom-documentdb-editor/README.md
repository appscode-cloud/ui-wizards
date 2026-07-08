# DocumentDB Editor

[DocumentDB Editor by AppsCode](https://appscode.com) - DocumentDB Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-documentdb-editor --version=v0.35.0
$ helm upgrade -i kubedbcom-documentdb-editor appscode/kubedbcom-documentdb-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a DocumentDB Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-documentdb-editor`:

```bash
$ helm upgrade -i kubedbcom-documentdb-editor appscode/kubedbcom-documentdb-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a DocumentDB Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-documentdb-editor`:

```bash
$ helm uninstall kubedbcom-documentdb-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-documentdb-editor` chart and their default values.

|                     Parameter                      | Description |                                                                     Default                                                                     |
|----------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                            |             | <code>kubedb.com</code>                                                                                                                         |
| metadata.resource.version                          |             | <code>v1alpha2</code>                                                                                                                           |
| metadata.resource.name                             |             | <code>documentdbs</code>                                                                                                                        |
| metadata.resource.kind                             |             | <code>DocumentDB</code>                                                                                                                         |
| metadata.resource.scope                            |             | <code>Namespaced</code>                                                                                                                         |
| metadata.release.name                              |             | <code>RELEASE-NAME</code>                                                                                                                       |
| metadata.release.namespace                         |             | <code>default</code>                                                                                                                            |
| resources.autoscalingKubedbComDocumentDBAutoscaler |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"DocumentDBAutoscaler","metadata":{"name":"documentdb","namespace":"demo"}}</code> |
| resources.kubedbComDocumentDB                      |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"DocumentDB","metadata":{"name":"documentdb","namespace":"default"}}</code>                    |
| resources.secret_auth                              |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"documentdb-auth","namespace":"demo"}}</code>                                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-documentdb-editor appscode/kubedbcom-documentdb-editor -n default --create-namespace --version=v0.35.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-documentdb-editor appscode/kubedbcom-documentdb-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
