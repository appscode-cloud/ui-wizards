# Singlestore Editor

[Singlestore Editor by AppsCode](https://appscode.com) - Singlestore Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-singlestore-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-singlestore-editor appscode/kubedbcom-singlestore-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a Singlestore Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-singlestore-editor`:

```bash
$ helm upgrade -i kubedbcom-singlestore-editor appscode/kubedbcom-singlestore-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a Singlestore Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-singlestore-editor`:

```bash
$ helm uninstall kubedbcom-singlestore-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-singlestore-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                      Default                                                                      |
|-------------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                                   |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                                   |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.database.rules.diskAlmostFull.duration                      |             | <code>1m</code>                                                                                                                                   |
| form.alert.groups.database.rules.diskAlmostFull.enabled                       |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.diskAlmostFull.severity                      |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.database.rules.diskAlmostFull.val                           |             | <code>95</code>                                                                                                                                   |
| form.alert.groups.database.rules.diskUsageHigh.duration                       |             | <code>1m</code>                                                                                                                                   |
| form.alert.groups.database.rules.diskUsageHigh.enabled                        |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.diskUsageHigh.severity                       |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.database.rules.diskUsageHigh.val                            |             | <code>80</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreHighIncomingBytes.duration        |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreHighIncomingBytes.enabled         |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreHighIncomingBytes.severity        |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.database.rules.singlestoreHighIncomingBytes.val             |             | <code>1.048576e+06</code>                                                                                                                         |
| form.alert.groups.database.rules.singlestoreHighOutgoingBytes.duration        |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreHighOutgoingBytes.enabled         |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreHighOutgoingBytes.severity        |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.database.rules.singlestoreHighOutgoingBytes.val             |             | <code>1.048576e+06</code>                                                                                                                         |
| form.alert.groups.database.rules.singlestoreHighQPS.duration                  |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreHighQPS.enabled                   |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreHighQPS.severity                  |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.database.rules.singlestoreHighQPS.val                       |             | <code>1000</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreHighThreadsRunning.duration       |             | <code>2m</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreHighThreadsRunning.enabled        |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreHighThreadsRunning.severity       |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.database.rules.singlestoreHighThreadsRunning.val            |             | <code>60</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreInstanceDown.duration             |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreInstanceDown.enabled              |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreInstanceDown.severity             |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.database.rules.singlestoreRestarted.duration                |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreRestarted.enabled                 |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreRestarted.severity                |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.database.rules.singlestoreRestarted.val                     |             | <code>60</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreServiceDown.duration              |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreServiceDown.enabled               |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreServiceDown.severity              |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.database.rules.singlestoreTooManyConnections.duration       |             | <code>2m</code>                                                                                                                                   |
| form.alert.groups.database.rules.singlestoreTooManyConnections.enabled        |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.database.rules.singlestoreTooManyConnections.severity       |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.database.rules.singlestoreTooManyConnections.val            |             | <code>80</code>                                                                                                                                   |
| form.alert.groups.kubeStash.enabled                                           |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.kubeStash.rules.backupSessionFailed.duration                |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.kubeStash.rules.backupSessionFailed.enabled                 |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.backupSessionFailed.severity                |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.duration         |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.enabled          |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.severity         |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.val              |             | <code>1800</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.duration          |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.enabled           |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.severity          |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.val               |             | <code>18000</code>                                                                                                                                |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.duration                |             | <code>5m</code>                                                                                                                                   |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.enabled                 |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.severity                |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.duration        |             | <code>5m</code>                                                                                                                                   |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.enabled         |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.severity        |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.val             |             | <code>1.073741824e+10</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.duration               |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.enabled                |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.severity               |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.duration        |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.enabled         |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.severity        |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.val             |             | <code>1800</code>                                                                                                                                 |
| form.alert.groups.opsManager.enabled                                          |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                  |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                   |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                  |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration              |             | <code>0m</code>                                                                                                                                   |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled               |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity              |             | <code>info</code>                                                                                                                                 |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration |             | <code>30m</code>                                                                                                                                  |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled  |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity |             | <code>critical</code>                                                                                                                             |
| form.alert.groups.provisioner.enabled                                         |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                 |             | <code>15m</code>                                                                                                                                  |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                  |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                 |             | <code>warning</code>                                                                                                                              |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                 |             | <code>1m</code>                                                                                                                                   |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                  |             | <code>true</code>                                                                                                                                 |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                 |             | <code>critical</code>                                                                                                                             |
| form.alert.labels.release                                                     |             | <code>kube-prometheus-stack</code>                                                                                                                |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                           |
| metadata.resource.version                                                     |             | <code>v1alpha2</code>                                                                                                                             |
| metadata.resource.name                                                        |             | <code>singlestores</code>                                                                                                                         |
| metadata.resource.kind                                                        |             | <code>Singlestore</code>                                                                                                                          |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                           |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                                         |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                              |
| resources.autoscalingKubedbComSinglestoreAutoscaler                           |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"SinglestoreAutoscaler","metadata":{"name":"singlestore","namespace":"demo"}}</code> |
| resources.catalogAppscodeComSinglestoreBinding                                |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"SinglestoreBinding","metadata":{"name":"singlestore","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"singlestore-ca","namespace":"demo"}}</code>                          |
| resources.coreKubestashComBackupBlueprint                                     |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupBlueprint","metadata":{"name":"singlestore","namespace":"demo"}}</code>           |
| resources.coreKubestashComBackupConfiguration                                 |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupConfiguration","metadata":{"name":"singlestore","namespace":"demo"}}</code>       |
| resources.coreKubestashComRestoreSession                                      |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"singlestore","namespace":"demo"}}</code>            |
| resources.gitopsKubedbComSinglestore                                          |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"Singlestore","metadata":{"name":"singlestore","namespace":"sdb"}}</code>                 |
| resources.kubedbComSinglestore                                                |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"Singlestore","metadata":{"name":"singlestore","namespace":"sdb"}}</code>                        |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"singlestore","namespace":"demo"}}</code>               |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"singlestore-auth","namespace":"demo"}}</code>                                        |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"singlestore-config","namespace":"demo"}}</code>                                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-singlestore-editor appscode/kubedbcom-singlestore-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-singlestore-editor appscode/kubedbcom-singlestore-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
