# Neo4j Editor

[Neo4j Editor by AppsCode](https://appscode.com) - Neo4j Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-neo4j-editor --version=v0.35.0
$ helm upgrade -i kubedbcom-neo4j-editor appscode/kubedbcom-neo4j-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a Neo4j Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-neo4j-editor`:

```bash
$ helm upgrade -i kubedbcom-neo4j-editor appscode/kubedbcom-neo4j-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a Neo4j Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-neo4j-editor`:

```bash
$ helm uninstall kubedbcom-neo4j-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-neo4j-editor` chart and their default values.

|                               Parameter                                | Description |                                                                Default                                                                |
|------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                        |             | <code>{}</code>                                                                                                                       |
| form.alert.annotations                                                 |             | <code>{}</code>                                                                                                                       |
| form.alert.enabled                                                     |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.database.enabled                                     |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.database.rules.diskAlmostFull.duration               |             | <code>1m</code>                                                                                                                       |
| form.alert.groups.database.rules.diskAlmostFull.enabled                |             | <code>true</code>                                                                                                                     |
| form.alert.groups.database.rules.diskAlmostFull.severity               |             | <code>critical</code>                                                                                                                 |
| form.alert.groups.database.rules.diskAlmostFull.val                    |             | <code>95</code>                                                                                                                       |
| form.alert.groups.database.rules.diskUsageHigh.duration                |             | <code>1m</code>                                                                                                                       |
| form.alert.groups.database.rules.diskUsageHigh.enabled                 |             | <code>true</code>                                                                                                                     |
| form.alert.groups.database.rules.diskUsageHigh.severity                |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.database.rules.diskUsageHigh.val                     |             | <code>80</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jHighCPUUsage.duration            |             | <code>1m</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jHighCPUUsage.enabled             |             | <code>true</code>                                                                                                                     |
| form.alert.groups.database.rules.neo4jHighCPUUsage.severity            |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.database.rules.neo4jHighCPUUsage.val                 |             | <code>80</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jHighMemoryUsage.duration         |             | <code>1m</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jHighMemoryUsage.enabled          |             | <code>true</code>                                                                                                                     |
| form.alert.groups.database.rules.neo4jHighMemoryUsage.severity         |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.database.rules.neo4jHighMemoryUsage.val              |             | <code>80</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jPageCacheHitRatioLow.duration    |             | <code>5m</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jPageCacheHitRatioLow.enabled     |             | <code>true</code>                                                                                                                     |
| form.alert.groups.database.rules.neo4jPageCacheHitRatioLow.severity    |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.database.rules.neo4jPageCacheHitRatioLow.val         |             | <code>0.98</code>                                                                                                                     |
| form.alert.groups.database.rules.neo4jPageCacheUsageRatioHigh.duration |             | <code>5m</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jPageCacheUsageRatioHigh.enabled  |             | <code>true</code>                                                                                                                     |
| form.alert.groups.database.rules.neo4jPageCacheUsageRatioHigh.severity |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.database.rules.neo4jPageCacheUsageRatioHigh.val      |             | <code>0.85</code>                                                                                                                     |
| form.alert.groups.database.rules.neo4jPageFaultFailuresHigh.duration   |             | <code>5m</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jPageFaultFailuresHigh.enabled    |             | <code>true</code>                                                                                                                     |
| form.alert.groups.database.rules.neo4jPageFaultFailuresHigh.severity   |             | <code>critical</code>                                                                                                                 |
| form.alert.groups.database.rules.neo4jPageFaultFailuresHigh.val        |             | <code>0</code>                                                                                                                        |
| form.alert.groups.database.rules.neo4jPageFaultsHigh.duration          |             | <code>5m</code>                                                                                                                       |
| form.alert.groups.database.rules.neo4jPageFaultsHigh.enabled           |             | <code>true</code>                                                                                                                     |
| form.alert.groups.database.rules.neo4jPageFaultsHigh.severity          |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.database.rules.neo4jPageFaultsHigh.val               |             | <code>5000</code>                                                                                                                     |
| form.alert.groups.provisioner.enabled                                  |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration          |             | <code>15m</code>                                                                                                                      |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled           |             | <code>true</code>                                                                                                                     |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity          |             | <code>warning</code>                                                                                                                  |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration          |             | <code>1m</code>                                                                                                                       |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled           |             | <code>true</code>                                                                                                                     |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity          |             | <code>critical</code>                                                                                                                 |
| form.alert.labels.release                                              |             | <code>prometheus</code>                                                                                                               |
| metadata.resource.group                                                |             | <code>kubedb.com</code>                                                                                                               |
| metadata.resource.version                                              |             | <code>v1alpha2</code>                                                                                                                 |
| metadata.resource.name                                                 |             | <code>neo4js</code>                                                                                                                   |
| metadata.resource.kind                                                 |             | <code>Neo4j</code>                                                                                                                    |
| metadata.resource.scope                                                |             | <code>Namespaced</code>                                                                                                               |
| metadata.release.name                                                  |             | <code>RELEASE-NAME</code>                                                                                                             |
| metadata.release.namespace                                             |             | <code>default</code>                                                                                                                  |
| resources.autoscalingKubedbComNeo4jAutoscaler                          |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"Neo4jAutoscaler","metadata":{"name":"neo4j","namespace":"demo"}}</code> |
| resources.certManagerIoIssuer_ca                                       |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"neo4j-ca","namespace":"demo"}}</code>                    |
| resources.coreKubestashComBackupBlueprint                              |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupBlueprint","metadata":{"name":"neo4j","namespace":"demo"}}</code>     |
| resources.coreKubestashComBackupConfiguration                          |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupConfiguration","metadata":{"name":"neo4j","namespace":"demo"}}</code> |
| resources.coreKubestashComRestoreSession                               |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"neo4j","namespace":"demo"}}</code>      |
| resources.kubedbComNeo4j                                               |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"Neo4j","metadata":{"name":"neo4j","namespace":"default"}}</code>                    |
| resources.monitoringCoreosComServiceMonitor                            |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"neo4j","namespace":"demo"}}</code>         |
| resources.secret_auth                                                  |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"neo4j-auth","namespace":"demo"}}</code>                                  |
| resources.secret_config                                                |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"neo4j-config","namespace":"demo"}}</code>                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-neo4j-editor appscode/kubedbcom-neo4j-editor -n default --create-namespace --version=v0.35.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-neo4j-editor appscode/kubedbcom-neo4j-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
