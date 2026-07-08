# MSSQLServer Editor

[MSSQLServer Editor by AppsCode](https://appscode.com) - MSSQLServer Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-mssqlserver-editor --version=v0.35.0
$ helm upgrade -i kubedbcom-mssqlserver-editor appscode/kubedbcom-mssqlserver-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a MSSQLServer Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-mssqlserver-editor`:

```bash
$ helm upgrade -i kubedbcom-mssqlserver-editor appscode/kubedbcom-mssqlserver-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a MSSQLServer Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-mssqlserver-editor`:

```bash
$ helm uninstall kubedbcom-mssqlserver-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-mssqlserver-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                      Default                                                                       |
|-------------------------------------------------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                                    |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                                    |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.database.rules.diskAlmostFull.duration                      |             | <code>1m</code>                                                                                                                                    |
| form.alert.groups.database.rules.diskAlmostFull.enabled                       |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.database.rules.diskAlmostFull.severity                      |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.database.rules.diskAlmostFull.val                           |             | <code>95</code>                                                                                                                                    |
| form.alert.groups.database.rules.diskUsageHigh.duration                       |             | <code>1m</code>                                                                                                                                    |
| form.alert.groups.database.rules.diskUsageHigh.enabled                        |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.database.rules.diskUsageHigh.severity                       |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.database.rules.diskUsageHigh.val                            |             | <code>80</code>                                                                                                                                    |
| form.alert.groups.database.rules.mssqlserverInstanceDown.duration             |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.database.rules.mssqlserverInstanceDown.enabled              |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.database.rules.mssqlserverInstanceDown.severity             |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.database.rules.mssqlserverRestarted.duration                |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.database.rules.mssqlserverRestarted.enabled                 |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.database.rules.mssqlserverRestarted.severity                |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.database.rules.mssqlserverRestarted.val                     |             | <code>60</code>                                                                                                                                    |
| form.alert.groups.database.rules.mssqlserverServiceDown.duration              |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.database.rules.mssqlserverServiceDown.enabled               |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.database.rules.mssqlserverServiceDown.severity              |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.kubeStash.enabled                                           |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.kubeStash.rules.backupSessionFailed.duration                |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.kubeStash.rules.backupSessionFailed.enabled                 |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.backupSessionFailed.severity                |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.duration         |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.enabled          |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.severity         |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.val              |             | <code>1800</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.duration          |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.enabled           |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.severity          |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.val               |             | <code>18000</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.duration                |             | <code>5m</code>                                                                                                                                    |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.enabled                 |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.severity                |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.duration        |             | <code>5m</code>                                                                                                                                    |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.enabled         |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.severity        |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.val             |             | <code>1.073741824e+10</code>                                                                                                                       |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.duration               |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.enabled                |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.severity               |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.duration        |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.enabled         |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.severity        |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.val             |             | <code>1800</code>                                                                                                                                  |
| form.alert.groups.opsManager.enabled                                          |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                  |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                   |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                  |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration              |             | <code>0m</code>                                                                                                                                    |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled               |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity              |             | <code>info</code>                                                                                                                                  |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration |             | <code>30m</code>                                                                                                                                   |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled  |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity |             | <code>critical</code>                                                                                                                              |
| form.alert.groups.provisioner.enabled                                         |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                 |             | <code>15m</code>                                                                                                                                   |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                  |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                 |             | <code>warning</code>                                                                                                                               |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                 |             | <code>1m</code>                                                                                                                                    |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                  |             | <code>true</code>                                                                                                                                  |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                 |             | <code>critical</code>                                                                                                                              |
| form.alert.labels.release                                                     |             | <code>kube-prometheus-stack</code>                                                                                                                 |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                            |
| metadata.resource.version                                                     |             | <code>v1alpha2</code>                                                                                                                              |
| metadata.resource.name                                                        |             | <code>mssqlservers</code>                                                                                                                          |
| metadata.resource.kind                                                        |             | <code>MSSQLServer</code>                                                                                                                           |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                            |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                                          |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                               |
| resources.autoscalingKubedbComMSSQLServerAutoscaler                           |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"MSSQLServerAutoscaler","metadata":{"name":"sqlserver-ag","namespace":"demo"}}</code> |
| resources.catalogAppscodeComMSSQLServerBinding                                |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"MSSQLServerBinding","metadata":{"name":"sqlserver-ag","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"sqlserver-ag-ca","namespace":"sample"}}</code>                        |
| resources.coreKubestashComBackupBlueprint                                     |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupBlueprint","metadata":{"name":"sqlserver-ag","namespace":"demo"}}</code>           |
| resources.coreKubestashComBackupConfiguration                                 |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupConfiguration","metadata":{"name":"sqlserver-ag","namespace":"demo"}}</code>       |
| resources.coreKubestashComRestoreSession                                      |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"sqlserver-ag","namespace":"demo"}}</code>            |
| resources.gitopsKubedbComMSSQLServer                                          |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"MSSQLServer","metadata":{"name":"sqlserver-ag","namespace":"sample"}}</code>              |
| resources.kubedbComMSSQLServer                                                |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"MSSQLServer","metadata":{"name":"sqlserver-ag","namespace":"sample"}}</code>                     |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"sqlserver-ag","namespace":"demo"}}</code>               |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"sqlserver-ag-auth","namespace":"demo"}}</code>                                        |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"sqlserver-ag-config","namespace":"demo"}}</code>                                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-mssqlserver-editor appscode/kubedbcom-mssqlserver-editor -n default --create-namespace --version=v0.35.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-mssqlserver-editor appscode/kubedbcom-mssqlserver-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
