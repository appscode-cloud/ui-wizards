# Postgres Editor

[Postgres Editor by AppsCode](https://appscode.com) - Postgres Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-postgres-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-postgres-editor appscode/kubedbcom-postgres-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a Postgres Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-postgres-editor`:

```bash
$ helm upgrade -i kubedbcom-postgres-editor appscode/kubedbcom-postgres-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a Postgres Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-postgres-editor`:

```bash
$ helm uninstall kubedbcom-postgres-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-postgres-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                   Default                                                                   |
|-------------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                             |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                             |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.PostgresReplicationSlotLagCritical.duration  |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.PostgresReplicationSlotLagCritical.enabled   |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.PostgresReplicationSlotLagCritical.severity  |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.PostgresReplicationSlotLagCritical.val       |             | <code>1.288490188e+09</code>                                                                                                                |
| form.alert.groups.database.rules.PostgresReplicationSlotLagHigh.duration      |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.PostgresReplicationSlotLagHigh.enabled       |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.PostgresReplicationSlotLagHigh.severity      |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.PostgresReplicationSlotLagHigh.val           |             | <code>8.388608e+08</code>                                                                                                                   |
| form.alert.groups.database.rules.diskAlmostFull.duration                      |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.diskAlmostFull.enabled                       |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.diskAlmostFull.severity                      |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.diskAlmostFull.val                           |             | <code>95</code>                                                                                                                             |
| form.alert.groups.database.rules.diskUsageHigh.duration                       |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.diskUsageHigh.enabled                        |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.diskUsageHigh.severity                       |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.diskUsageHigh.val                            |             | <code>80</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresExporterError.duration               |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresExporterError.enabled                |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresExporterError.severity               |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.postgresHighRollbackRate.duration            |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresHighRollbackRate.enabled             |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresHighRollbackRate.severity            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.postgresHighRollbackRate.val                 |             | <code>0.02</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresInstanceDown.duration                |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresInstanceDown.enabled                 |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresInstanceDown.severity                |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.postgresNotEnoughConnections.duration        |             | <code>2m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresNotEnoughConnections.enabled         |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresNotEnoughConnections.severity        |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.postgresNotEnoughConnections.val             |             | <code>5</code>                                                                                                                              |
| form.alert.groups.database.rules.postgresReplicationLag.duration              |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresReplicationLag.enabled               |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresReplicationLag.severity              |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.postgresReplicationLag.val                   |             | <code>30s</code>                                                                                                                            |
| form.alert.groups.database.rules.postgresRestarted.duration                   |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresRestarted.enabled                    |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresRestarted.severity                   |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.postgresRestarted.val                        |             | <code>60</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresSlowQueries.duration                 |             | <code>2m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresSlowQueries.enabled                  |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresSlowQueries.severity                 |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.postgresSplitBrain.duration                  |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresSplitBrain.enabled                   |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresSplitBrain.severity                  |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.postgresTooManyConnections.duration          |             | <code>2m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresTooManyConnections.enabled           |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresTooManyConnections.severity          |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.postgresTooManyConnections.val               |             | <code>80</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresTooManyLocksAcquired.duration        |             | <code>2m</code>                                                                                                                             |
| form.alert.groups.database.rules.postgresTooManyLocksAcquired.enabled         |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.postgresTooManyLocksAcquired.severity        |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.postgresTooManyLocksAcquired.val             |             | <code>0.2</code>                                                                                                                            |
| form.alert.groups.kubeStash.enabled                                           |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.backupSessionFailed.duration                |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.backupSessionFailed.enabled                 |             | <code>true</code>                                                                                                                           |
| form.alert.groups.kubeStash.rules.backupSessionFailed.severity                |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.duration         |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.enabled          |             | <code>true</code>                                                                                                                           |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.severity         |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.val              |             | <code>1800</code>                                                                                                                           |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.duration          |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.enabled           |             | <code>true</code>                                                                                                                           |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.severity          |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.val               |             | <code>18000</code>                                                                                                                          |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.duration                |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.enabled                 |             | <code>true</code>                                                                                                                           |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.severity                |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.duration        |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.enabled         |             | <code>true</code>                                                                                                                           |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.severity        |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.val             |             | <code>1.073741824e+10</code>                                                                                                                |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.duration               |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.enabled                |             | <code>true</code>                                                                                                                           |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.severity               |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.duration        |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.enabled         |             | <code>true</code>                                                                                                                           |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.severity        |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.val             |             | <code>1800</code>                                                                                                                           |
| form.alert.groups.opsManager.enabled                                          |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                  |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                   |             | <code>true</code>                                                                                                                           |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                  |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration              |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled               |             | <code>true</code>                                                                                                                           |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity              |             | <code>info</code>                                                                                                                           |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration |             | <code>30m</code>                                                                                                                            |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled  |             | <code>true</code>                                                                                                                           |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.provisioner.enabled                                         |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                 |             | <code>15m</code>                                                                                                                            |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                  |             | <code>true</code>                                                                                                                           |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                 |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                 |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                  |             | <code>true</code>                                                                                                                           |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                 |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.schemaManager.enabled                                       |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.schemaManager.rules.schemaExpired.duration                  |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.schemaManager.rules.schemaExpired.enabled                   |             | <code>true</code>                                                                                                                           |
| form.alert.groups.schemaManager.rules.schemaExpired.severity                  |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.schemaManager.rules.schemaFailed.duration                   |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.schemaManager.rules.schemaFailed.enabled                    |             | <code>true</code>                                                                                                                           |
| form.alert.groups.schemaManager.rules.schemaFailed.severity                   |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.schemaManager.rules.schemaInProgressForTooLong.duration     |             | <code>30m</code>                                                                                                                            |
| form.alert.groups.schemaManager.rules.schemaInProgressForTooLong.enabled      |             | <code>true</code>                                                                                                                           |
| form.alert.groups.schemaManager.rules.schemaInProgressForTooLong.severity     |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.schemaManager.rules.schemaPendingForTooLong.duration        |             | <code>30m</code>                                                                                                                            |
| form.alert.groups.schemaManager.rules.schemaPendingForTooLong.enabled         |             | <code>true</code>                                                                                                                           |
| form.alert.groups.schemaManager.rules.schemaPendingForTooLong.severity        |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.schemaManager.rules.schemaTerminatingForTooLong.duration    |             | <code>30m</code>                                                                                                                            |
| form.alert.groups.schemaManager.rules.schemaTerminatingForTooLong.enabled     |             | <code>true</code>                                                                                                                           |
| form.alert.groups.schemaManager.rules.schemaTerminatingForTooLong.severity    |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.stash.enabled                                               |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.stash.rules.backupSessionFailed.duration                    |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.stash.rules.backupSessionFailed.enabled                     |             | <code>true</code>                                                                                                                           |
| form.alert.groups.stash.rules.backupSessionFailed.severity                    |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.duration             |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.enabled              |             | <code>true</code>                                                                                                                           |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.severity             |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.val                  |             | <code>1800</code>                                                                                                                           |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.duration              |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.enabled               |             | <code>true</code>                                                                                                                           |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.severity              |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.val                   |             | <code>18000</code>                                                                                                                          |
| form.alert.groups.stash.rules.repositoryCorrupted.duration                    |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.stash.rules.repositoryCorrupted.enabled                     |             | <code>true</code>                                                                                                                           |
| form.alert.groups.stash.rules.repositoryCorrupted.severity                    |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.duration            |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.enabled             |             | <code>true</code>                                                                                                                           |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.severity            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.val                 |             | <code>1.073741824e+10</code>                                                                                                                |
| form.alert.groups.stash.rules.restoreSessionFailed.duration                   |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.stash.rules.restoreSessionFailed.enabled                    |             | <code>true</code>                                                                                                                           |
| form.alert.groups.stash.rules.restoreSessionFailed.severity                   |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.duration            |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.enabled             |             | <code>true</code>                                                                                                                           |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.severity            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.val                 |             | <code>1800</code>                                                                                                                           |
| form.alert.labels.release                                                     |             | <code>kube-prometheus-stack</code>                                                                                                          |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                     |
| metadata.resource.version                                                     |             | <code>v1</code>                                                                                                                             |
| metadata.resource.name                                                        |             | <code>postgreses</code>                                                                                                                     |
| metadata.resource.kind                                                        |             | <code>Postgres</code>                                                                                                                       |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                     |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                                   |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                        |
| resources.autoscalingKubedbComPostgresAutoscaler                              |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"PostgresAutoscaler","metadata":{"name":"postgres","namespace":"demo"}}</code> |
| resources.catalogAppscodeComPostgresBinding                                   |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"PostgresBinding","metadata":{"name":"postgres","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"postgres-ca","namespace":"demo"}}</code>                       |
| resources.coreKubestashComBackupBlueprint                                     |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupBlueprint","metadata":{"name":"postgres","namespace":"demo"}}</code>        |
| resources.coreKubestashComBackupConfiguration                                 |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupConfiguration","metadata":{"name":"postgres","namespace":"demo"}}</code>    |
| resources.coreKubestashComRestoreSession                                      |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"postgres","namespace":"demo"}}</code>         |
| resources.gitopsKubedbComPostgres                                             |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"Postgres","metadata":{"name":"postgres","namespace":"demo"}}</code>                |
| resources.kubedbComPostgres                                                   |             | <code>{"apiVersion":"kubedb.com/v1","kind":"Postgres","metadata":{"name":"postgres","namespace":"demo"}}</code>                             |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"postgres","namespace":"demo"}}</code>            |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"postgres-auth","namespace":"demo"}}</code>                                     |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"postgres-config","namespace":"demo"}}</code>                                   |
| resources.secret_encryption_secret                                            |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"postgres-encryption-secret","namespace":"demo"}}</code>                        |
| resources.secret_init_repo_cred                                               |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"postgres-init-repo-cred","namespace":"demo"}}</code>                           |
| resources.secret_repo_cred                                                    |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"postgres-repo-cred","namespace":"demo"}}</code>                                |
| resources.stashAppscodeComBackupConfiguration                                 |             | <code>{"apiVersion":"stash.appscode.com/v1beta1","kind":"BackupConfiguration","metadata":{"name":"postgres","namespace":"demo"}}</code>     |
| resources.stashAppscodeComRepository_init_repo                                |             | <code>{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"postgres-init-repo","namespace":"demo"}}</code>   |
| resources.stashAppscodeComRepository_repo                                     |             | <code>{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"postgres-repo","namespace":"demo"}}</code>        |
| resources.stashAppscodeComRestoreSession_init                                 |             | <code>{"apiVersion":"stash.appscode.com/v1beta1","kind":"RestoreSession","metadata":{"name":"postgres-init","namespace":"demo"}}</code>     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-postgres-editor appscode/kubedbcom-postgres-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-postgres-editor appscode/kubedbcom-postgres-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
