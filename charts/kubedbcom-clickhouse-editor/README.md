# ClickHouse Editor

[ClickHouse Editor by AppsCode](https://appscode.com) - ClickHouse Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-clickhouse-editor --version=v0.35.0
$ helm upgrade -i kubedbcom-clickhouse-editor appscode/kubedbcom-clickhouse-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a ClickHouse Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-clickhouse-editor`:

```bash
$ helm upgrade -i kubedbcom-clickhouse-editor appscode/kubedbcom-clickhouse-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a ClickHouse Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-clickhouse-editor`:

```bash
$ helm uninstall kubedbcom-clickhouse-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-clickhouse-editor` chart and their default values.

|                     Parameter                      | Description |                                                                     Default                                                                     |
|----------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                            |             | <code>kubedb.com</code>                                                                                                                         |
| metadata.resource.version                          |             | <code>v1alpha2</code>                                                                                                                           |
| metadata.resource.name                             |             | <code>clickhouses</code>                                                                                                                        |
| metadata.resource.kind                             |             | <code>ClickHouse</code>                                                                                                                         |
| metadata.resource.scope                            |             | <code>Namespaced</code>                                                                                                                         |
| metadata.release.name                              |             | <code>RELEASE-NAME</code>                                                                                                                       |
| metadata.release.namespace                         |             | <code>default</code>                                                                                                                            |
| resources.autoscalingKubedbComClickHouseAutoscaler |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"ClickHouseAutoscaler","metadata":{"name":"clickhouse","namespace":"demo"}}</code> |
| resources.catalogAppscodeComClickHouseBinding      |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"ClickHouseBinding","metadata":{"name":"clickhouse","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                   |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"clickhouse-ca","namespace":"demo"}}</code>                         |
| resources.coreKubestashComBackupBlueprint          |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupBlueprint","metadata":{"name":"clickhouse","namespace":"demo"}}</code>          |
| resources.coreKubestashComBackupConfiguration      |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupConfiguration","metadata":{"name":"clickhouse","namespace":"demo"}}</code>      |
| resources.coreKubestashComRestoreSession           |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"clickhouse","namespace":"demo"}}</code>           |
| resources.kubedbComClickHouse                      |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"ClickHouse","metadata":{"name":"clickhouse","namespace":"default"}}</code>                    |
| resources.monitoringCoreosComServiceMonitor        |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"clickhouse","namespace":"demo"}}</code>              |
| resources.secret_auth                              |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"clickhouse-auth","namespace":"demo"}}</code>                                       |
| resources.secret_config                            |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"clickhouse-config","namespace":"demo"}}</code>                                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-clickhouse-editor appscode/kubedbcom-clickhouse-editor -n default --create-namespace --version=v0.35.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-clickhouse-editor appscode/kubedbcom-clickhouse-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
