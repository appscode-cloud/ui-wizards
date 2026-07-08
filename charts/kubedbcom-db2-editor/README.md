# DB2 Editor

[DB2 Editor by AppsCode](https://appscode.com) - DB2 Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-db2-editor --version=v0.35.0
$ helm upgrade -i kubedbcom-db2-editor appscode/kubedbcom-db2-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a DB2 Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-db2-editor`:

```bash
$ helm upgrade -i kubedbcom-db2-editor appscode/kubedbcom-db2-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a DB2 Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-db2-editor`:

```bash
$ helm uninstall kubedbcom-db2-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-db2-editor` chart and their default values.

|                  Parameter                  | Description |                                                               Default                                                                |
|---------------------------------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                     |             | <code>kubedb.com</code>                                                                                                              |
| metadata.resource.version                   |             | <code>v1alpha2</code>                                                                                                                |
| metadata.resource.name                      |             | <code>db2s</code>                                                                                                                    |
| metadata.resource.kind                      |             | <code>DB2</code>                                                                                                                     |
| metadata.resource.scope                     |             | <code>Namespaced</code>                                                                                                              |
| metadata.release.name                       |             | <code>RELEASE-NAME</code>                                                                                                            |
| metadata.release.namespace                  |             | <code>default</code>                                                                                                                 |
| resources.autoscalingKubedbComDB2Autoscaler |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"DB2Autoscaler","metadata":{"name":"db2","namespace":"default"}}</code> |
| resources.kubedbComDB2                      |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"DB2","metadata":{"name":"db2","namespace":"default"}}</code>                       |
| resources.secret_auth                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"db2-auth","namespace":"demo"}}</code>                                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-db2-editor appscode/kubedbcom-db2-editor -n default --create-namespace --version=v0.35.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-db2-editor appscode/kubedbcom-db2-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
