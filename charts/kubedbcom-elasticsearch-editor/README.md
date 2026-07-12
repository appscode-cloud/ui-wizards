# Elasticsearch Editor

[Elasticsearch Editor by AppsCode](https://appscode.com) - Elasticsearch Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-elasticsearch-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-elasticsearch-editor appscode/kubedbcom-elasticsearch-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a Elasticsearch Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-elasticsearch-editor`:

```bash
$ helm upgrade -i kubedbcom-elasticsearch-editor appscode/kubedbcom-elasticsearch-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a Elasticsearch Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-elasticsearch-editor`:

```bash
$ helm uninstall kubedbcom-elasticsearch-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-elasticsearch-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                        Default                                                                        |
|-------------------------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                                       |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                                       |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.database.enabled                                            |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.database.rules.diskAlmostFull.duration                      |             | <code>1m</code>                                                                                                                                       |
| form.alert.groups.database.rules.diskAlmostFull.enabled                       |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.diskAlmostFull.severity                      |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.database.rules.diskAlmostFull.val                           |             | <code>95</code>                                                                                                                                       |
| form.alert.groups.database.rules.diskUsageHigh.duration                       |             | <code>1m</code>                                                                                                                                       |
| form.alert.groups.database.rules.diskUsageHigh.enabled                        |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.diskUsageHigh.severity                       |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.database.rules.diskUsageHigh.val                            |             | <code>80</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchClusterRed.duration             |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchClusterRed.enabled              |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchClusterRed.severity             |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.database.rules.elasticsearchClusterYellow.duration          |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchClusterYellow.enabled           |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchClusterYellow.severity          |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.database.rules.elasticsearchDiskOutOfSpace.duration         |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchDiskOutOfSpace.enabled          |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchDiskOutOfSpace.severity         |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.database.rules.elasticsearchDiskOutOfSpace.val              |             | <code>90</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchDiskSpaceLow.duration           |             | <code>2m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchDiskSpaceLow.enabled            |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchDiskSpaceLow.severity           |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.database.rules.elasticsearchDiskSpaceLow.val                |             | <code>80</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchHealthyDataNodes.duration       |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchHealthyDataNodes.enabled        |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchHealthyDataNodes.severity       |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.database.rules.elasticsearchHealthyDataNodes.val            |             | <code>3</code>                                                                                                                                        |
| form.alert.groups.database.rules.elasticsearchHealthyNodes.duration           |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchHealthyNodes.enabled            |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchHealthyNodes.severity           |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.database.rules.elasticsearchHealthyNodes.val                |             | <code>3</code>                                                                                                                                        |
| form.alert.groups.database.rules.elasticsearchHeapUsageTooHigh.duration       |             | <code>2m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchHeapUsageTooHigh.enabled        |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchHeapUsageTooHigh.severity       |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.database.rules.elasticsearchHeapUsageTooHigh.val            |             | <code>90</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchHeapUsageWarning.duration       |             | <code>2m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchHeapUsageWarning.enabled        |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchHeapUsageWarning.severity       |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.database.rules.elasticsearchHeapUsageWarning.val            |             | <code>80</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchInitializingShards.duration     |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchInitializingShards.enabled      |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchInitializingShards.severity     |             | <code>info</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchNoNewDocuments10m.duration      |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchNoNewDocuments10m.enabled       |             | <code>false</code>                                                                                                                                    |
| form.alert.groups.database.rules.elasticsearchNoNewDocuments10m.severity      |             | <code>info</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchPendingTasks.duration           |             | <code>15m</code>                                                                                                                                      |
| form.alert.groups.database.rules.elasticsearchPendingTasks.enabled            |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchPendingTasks.severity           |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.database.rules.elasticsearchRelocatingShards.duration       |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchRelocatingShards.enabled        |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchRelocatingShards.severity       |             | <code>info</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchUnassignedShards.duration       |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.database.rules.elasticsearchUnassignedShards.enabled        |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.database.rules.elasticsearchUnassignedShards.severity       |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.kubeStash.enabled                                           |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.backupSessionFailed.duration                |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.kubeStash.rules.backupSessionFailed.enabled                 |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.kubeStash.rules.backupSessionFailed.severity                |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.duration         |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.enabled          |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.severity         |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.val              |             | <code>1800</code>                                                                                                                                     |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.duration          |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.enabled           |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.severity          |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.val               |             | <code>18000</code>                                                                                                                                    |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.duration                |             | <code>5m</code>                                                                                                                                       |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.enabled                 |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.severity                |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.duration        |             | <code>5m</code>                                                                                                                                       |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.enabled         |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.severity        |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.val             |             | <code>1.073741824e+10</code>                                                                                                                          |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.duration               |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.enabled                |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.severity               |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.duration        |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.enabled         |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.severity        |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.val             |             | <code>1800</code>                                                                                                                                     |
| form.alert.groups.opsManager.enabled                                          |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                  |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                   |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                  |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration              |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled               |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity              |             | <code>info</code>                                                                                                                                     |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration |             | <code>30m</code>                                                                                                                                      |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled  |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.provisioner.enabled                                         |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                 |             | <code>15m</code>                                                                                                                                      |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                  |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                 |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                 |             | <code>1m</code>                                                                                                                                       |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                  |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                 |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.stash.enabled                                               |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.stash.rules.backupSessionFailed.duration                    |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.stash.rules.backupSessionFailed.enabled                     |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.stash.rules.backupSessionFailed.severity                    |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.duration             |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.enabled              |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.severity             |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.val                  |             | <code>1800</code>                                                                                                                                     |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.duration              |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.enabled               |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.severity              |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.val                   |             | <code>18000</code>                                                                                                                                    |
| form.alert.groups.stash.rules.repositoryCorrupted.duration                    |             | <code>5m</code>                                                                                                                                       |
| form.alert.groups.stash.rules.repositoryCorrupted.enabled                     |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.stash.rules.repositoryCorrupted.severity                    |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.duration            |             | <code>5m</code>                                                                                                                                       |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.enabled             |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.severity            |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.val                 |             | <code>1.073741824e+10</code>                                                                                                                          |
| form.alert.groups.stash.rules.restoreSessionFailed.duration                   |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.stash.rules.restoreSessionFailed.enabled                    |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.stash.rules.restoreSessionFailed.severity                   |             | <code>critical</code>                                                                                                                                 |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.duration            |             | <code>0m</code>                                                                                                                                       |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.enabled             |             | <code>true</code>                                                                                                                                     |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.severity            |             | <code>warning</code>                                                                                                                                  |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.val                 |             | <code>1800</code>                                                                                                                                     |
| form.alert.labels.release                                                     |             | <code>kube-prometheus-stack</code>                                                                                                                    |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                               |
| metadata.resource.version                                                     |             | <code>v1</code>                                                                                                                                       |
| metadata.resource.name                                                        |             | <code>elasticsearches</code>                                                                                                                          |
| metadata.resource.kind                                                        |             | <code>Elasticsearch</code>                                                                                                                            |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                               |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                                             |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                                  |
| resources.autoscalingKubedbComElasticsearchAutoscaler                         |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"ElasticsearchAutoscaler","metadata":{"name":"elasticsearch","namespace":"demo"}}</code> |
| resources.catalogAppscodeComElasticsearchBinding                              |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"ElasticsearchBinding","metadata":{"name":"elasticsearch","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"elasticsearch-ca","namespace":"demo"}}</code>                            |
| resources.coreKubestashComBackupBlueprint                                     |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupBlueprint","metadata":{"name":"elasticsearch","namespace":"demo"}}</code>             |
| resources.coreKubestashComBackupConfiguration                                 |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupConfiguration","metadata":{"name":"elasticsearch","namespace":"demo"}}</code>         |
| resources.coreKubestashComRestoreSession                                      |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"elasticsearch","namespace":"demo"}}</code>              |
| resources.gitopsKubedbComElasticsearch                                        |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"Elasticsearch","metadata":{"name":"elasticsearch","namespace":"demo"}}</code>                |
| resources.kubedbComElasticsearch                                              |             | <code>{"apiVersion":"kubedb.com/v1","kind":"Elasticsearch","metadata":{"name":"elasticsearch","namespace":"demo"}}</code>                             |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"elasticsearch","namespace":"demo"}}</code>                 |
| resources.secret_admin_cred                                                   |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-admin-cred","namespace":"demo"}}</code>                                    |
| resources.secret_elastic_cred                                                 |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-elastic-cred","namespace":"demo"}}</code>                                  |
| resources.secret_encryption_secret                                            |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-encryption-secret","namespace":"demo"}}</code>                             |
| resources.secret_init_repo_cred                                               |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-init-repo-cred","namespace":"demo"}}</code>                                |
| resources.secret_kibanaro_cred                                                |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-kibanaro-cred","namespace":"demo"}}</code>                                 |
| resources.secret_kibanaserver_cred                                            |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-kibanaserver-cred","namespace":"demo"}}</code>                             |
| resources.secret_logstash_cred                                                |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-logstash-cred","namespace":"demo"}}</code>                                 |
| resources.secret_metrics_exporter_cred                                        |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-metrics-exporter-cred","namespace":"demo"}}</code>                         |
| resources.secret_readall_cred                                                 |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-readall-cred","namespace":"demo"}}</code>                                  |
| resources.secret_repo_cred                                                    |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-repo-cred","namespace":"demo"}}</code>                                     |
| resources.secret_secure_config                                                |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-secure-config","namespace":"demo"}}</code>                                 |
| resources.secret_snapshotrestore_cred                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-snapshotrestore-cred","namespace":"demo"}}</code>                          |
| resources.secret_user_config                                                  |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"elasticsearch-user-config","namespace":"demo"}}</code>                                   |
| resources.stashAppscodeComBackupConfiguration                                 |             | <code>{"apiVersion":"stash.appscode.com/v1beta1","kind":"BackupConfiguration","metadata":{"name":"elasticsearch","namespace":"demo"}}</code>          |
| resources.stashAppscodeComRepository_init_repo                                |             | <code>{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"elasticsearch-init-repo","namespace":"demo"}}</code>        |
| resources.stashAppscodeComRepository_repo                                     |             | <code>{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"elasticsearch-repo","namespace":"demo"}}</code>             |
| resources.stashAppscodeComRestoreSession_init                                 |             | <code>{"apiVersion":"stash.appscode.com/v1beta1","kind":"RestoreSession","metadata":{"name":"elasticsearch-init","namespace":"demo"}}</code>          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-elasticsearch-editor appscode/kubedbcom-elasticsearch-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-elasticsearch-editor appscode/kubedbcom-elasticsearch-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
