# Redis Editor

[Redis Editor by AppsCode](https://appscode.com) - Redis Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-redis-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-redis-editor appscode/kubedbcom-redis-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a Redis Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-redis-editor`:

```bash
$ helm upgrade -i kubedbcom-redis-editor appscode/kubedbcom-redis-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a Redis Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-redis-editor`:

```bash
$ helm uninstall kubedbcom-redis-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-redis-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                Default                                                                 |
|-------------------------------------------------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                        |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                        |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.database.rules.diskAlmostFull.duration                      |             | <code>1m</code>                                                                                                                        |
| form.alert.groups.database.rules.diskAlmostFull.enabled                       |             | <code>true</code>                                                                                                                      |
| form.alert.groups.database.rules.diskAlmostFull.severity                      |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.database.rules.diskAlmostFull.val                           |             | <code>95</code>                                                                                                                        |
| form.alert.groups.database.rules.diskUsageHigh.duration                       |             | <code>1m</code>                                                                                                                        |
| form.alert.groups.database.rules.diskUsageHigh.enabled                        |             | <code>true</code>                                                                                                                      |
| form.alert.groups.database.rules.diskUsageHigh.severity                       |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.database.rules.diskUsageHigh.val                            |             | <code>80</code>                                                                                                                        |
| form.alert.groups.database.rules.redisDisconnectedSlaves.duration             |             | <code>2m</code>                                                                                                                        |
| form.alert.groups.database.rules.redisDisconnectedSlaves.enabled              |             | <code>true</code>                                                                                                                      |
| form.alert.groups.database.rules.redisDisconnectedSlaves.severity             |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.database.rules.redisDisconnectedSlaves.val                  |             | <code>1</code>                                                                                                                         |
| form.alert.groups.database.rules.redisDown.duration                           |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.database.rules.redisDown.enabled                            |             | <code>true</code>                                                                                                                      |
| form.alert.groups.database.rules.redisDown.severity                           |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.database.rules.redisMissingMaster.duration                  |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.database.rules.redisMissingMaster.enabled                   |             | <code>true</code>                                                                                                                      |
| form.alert.groups.database.rules.redisMissingMaster.severity                  |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.database.rules.redisMissingMaster.val                       |             | <code>1</code>                                                                                                                         |
| form.alert.groups.database.rules.redisRejectedConnections.duration            |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.database.rules.redisRejectedConnections.enabled             |             | <code>true</code>                                                                                                                      |
| form.alert.groups.database.rules.redisRejectedConnections.severity            |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.database.rules.redisRejectedConnections.val                 |             | <code>0</code>                                                                                                                         |
| form.alert.groups.database.rules.redisTooManyConnections.duration             |             | <code>2m</code>                                                                                                                        |
| form.alert.groups.database.rules.redisTooManyConnections.enabled              |             | <code>true</code>                                                                                                                      |
| form.alert.groups.database.rules.redisTooManyConnections.severity             |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.database.rules.redisTooManyConnections.val                  |             | <code>100</code>                                                                                                                       |
| form.alert.groups.database.rules.redisTooManyMasters.duration                 |             | <code>2m</code>                                                                                                                        |
| form.alert.groups.database.rules.redisTooManyMasters.enabled                  |             | <code>true</code>                                                                                                                      |
| form.alert.groups.database.rules.redisTooManyMasters.severity                 |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.database.rules.redisTooManyMasters.val                      |             | <code>1</code>                                                                                                                         |
| form.alert.groups.kubeStash.enabled                                           |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.kubeStash.rules.backupSessionFailed.duration                |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.backupSessionFailed.enabled                 |             | <code>true</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.backupSessionFailed.severity                |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.duration         |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.enabled          |             | <code>true</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.severity         |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.val              |             | <code>1800</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.duration          |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.enabled           |             | <code>true</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.severity          |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.val               |             | <code>18000</code>                                                                                                                     |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.duration                |             | <code>5m</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.enabled                 |             | <code>true</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.severity                |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.duration        |             | <code>5m</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.enabled         |             | <code>true</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.severity        |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.val             |             | <code>1.073741824e+10</code>                                                                                                           |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.duration               |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.enabled                |             | <code>true</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.severity               |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.duration        |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.enabled         |             | <code>true</code>                                                                                                                      |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.severity        |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.val             |             | <code>1800</code>                                                                                                                      |
| form.alert.groups.opsManager.enabled                                          |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                  |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                   |             | <code>true</code>                                                                                                                      |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                  |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration              |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled               |             | <code>true</code>                                                                                                                      |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity              |             | <code>info</code>                                                                                                                      |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration |             | <code>30m</code>                                                                                                                       |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled  |             | <code>true</code>                                                                                                                      |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.provisioner.enabled                                         |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                 |             | <code>15m</code>                                                                                                                       |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                  |             | <code>true</code>                                                                                                                      |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                 |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                 |             | <code>1m</code>                                                                                                                        |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                  |             | <code>true</code>                                                                                                                      |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                 |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.stash.enabled                                               |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.stash.rules.backupSessionFailed.duration                    |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.stash.rules.backupSessionFailed.enabled                     |             | <code>true</code>                                                                                                                      |
| form.alert.groups.stash.rules.backupSessionFailed.severity                    |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.duration             |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.enabled              |             | <code>true</code>                                                                                                                      |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.severity             |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.val                  |             | <code>1800</code>                                                                                                                      |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.duration              |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.enabled               |             | <code>true</code>                                                                                                                      |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.severity              |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.val                   |             | <code>18000</code>                                                                                                                     |
| form.alert.groups.stash.rules.repositoryCorrupted.duration                    |             | <code>5m</code>                                                                                                                        |
| form.alert.groups.stash.rules.repositoryCorrupted.enabled                     |             | <code>true</code>                                                                                                                      |
| form.alert.groups.stash.rules.repositoryCorrupted.severity                    |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.duration            |             | <code>5m</code>                                                                                                                        |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.enabled             |             | <code>true</code>                                                                                                                      |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.severity            |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.val                 |             | <code>1.073741824e+10</code>                                                                                                           |
| form.alert.groups.stash.rules.restoreSessionFailed.duration                   |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.stash.rules.restoreSessionFailed.enabled                    |             | <code>true</code>                                                                                                                      |
| form.alert.groups.stash.rules.restoreSessionFailed.severity                   |             | <code>critical</code>                                                                                                                  |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.duration            |             | <code>0m</code>                                                                                                                        |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.enabled             |             | <code>true</code>                                                                                                                      |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.severity            |             | <code>warning</code>                                                                                                                   |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.val                 |             | <code>1800</code>                                                                                                                      |
| form.alert.labels.release                                                     |             | <code>prometheus</code>                                                                                                                |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                |
| metadata.resource.version                                                     |             | <code>v1</code>                                                                                                                        |
| metadata.resource.name                                                        |             | <code>redises</code>                                                                                                                   |
| metadata.resource.kind                                                        |             | <code>Redis</code>                                                                                                                     |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                              |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                   |
| resources.autoscalingKubedbComRedisAutoscaler                                 |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"RedisAutoscaler","metadata":{"name":"redis","namespace":"demo"}}</code>  |
| resources.catalogAppscodeComRedisBinding                                      |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"RedisBinding","metadata":{"name":"redis","namespace":"demo"}}</code>       |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"redis-ca","namespace":"demo"}}</code>                     |
| resources.coreKubestashComBackupBlueprint                                     |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupBlueprint","metadata":{"name":"redis","namespace":"demo"}}</code>      |
| resources.coreKubestashComBackupConfiguration                                 |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupConfiguration","metadata":{"name":"redis","namespace":"demo"}}</code>  |
| resources.coreKubestashComRestoreSession                                      |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"redis","namespace":"demo"}}</code>       |
| resources.gitopsKubedbComRedis                                                |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"Redis","metadata":{"name":"redis","namespace":"demo"}}</code>                 |
| resources.gitopsKubedbComRedisSentinel_sentinel                               |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"RedisSentinel","metadata":{"name":"sentinel","namespace":"demo"}}</code>      |
| resources.kubedbComRedis                                                      |             | <code>{"apiVersion":"kubedb.com/v1","kind":"Redis","metadata":{"name":"redis","namespace":"demo"}}</code>                              |
| resources.kubedbComRedisSentinel_sentinel                                     |             | <code>{"apiVersion":"kubedb.com/v1","kind":"RedisSentinel","metadata":{"name":"sentinel","namespace":"demo"}}</code>                   |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"redis","namespace":"demo"}}</code>          |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"redis-auth","namespace":"demo"}}</code>                                   |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"redis-config","namespace":"demo"}}</code>                                 |
| resources.secret_encryption_secret                                            |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"redis-encryption-secret","namespace":"demo"}}</code>                      |
| resources.secret_init_repo_cred                                               |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"redis-init-repo-cred","namespace":"demo"}}</code>                         |
| resources.secret_repo_cred                                                    |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"redis-repo-cred","namespace":"demo"}}</code>                              |
| resources.stashAppscodeComBackupConfiguration                                 |             | <code>{"apiVersion":"stash.appscode.com/v1beta1","kind":"BackupConfiguration","metadata":{"name":"redis","namespace":"demo"}}</code>   |
| resources.stashAppscodeComRepository_init_repo                                |             | <code>{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"redis-init-repo","namespace":"demo"}}</code> |
| resources.stashAppscodeComRepository_repo                                     |             | <code>{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"redis-repo","namespace":"demo"}}</code>      |
| resources.stashAppscodeComRestoreSession_init                                 |             | <code>{"apiVersion":"stash.appscode.com/v1beta1","kind":"RestoreSession","metadata":{"name":"redis-init","namespace":"demo"}}</code>   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-redis-editor appscode/kubedbcom-redis-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-redis-editor appscode/kubedbcom-redis-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
