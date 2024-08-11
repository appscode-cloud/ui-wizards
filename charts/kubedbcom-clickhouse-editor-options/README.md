# ClickHouse Editor UI Options

[ClickHouse Editor UI Options](https://byte.builders) - ClickHouse Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-clickhouse-editor-options --version=v0.4.21
$ helm upgrade -i kubedbcom-clickhouse-editor-options bytebuilders-ui/kubedbcom-clickhouse-editor-options -n kube-system --create-namespace --version=v0.4.21
```

## Introduction

This chart deploys a ClickHouse Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-clickhouse-editor-options`:

```bash
$ helm upgrade -i kubedbcom-clickhouse-editor-options bytebuilders-ui/kubedbcom-clickhouse-editor-options -n kube-system --create-namespace --version=v0.4.21
```

The command deploys a ClickHouse Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-clickhouse-editor-options`:

```bash
$ helm uninstall kubedbcom-clickhouse-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-clickhouse-editor-options` chart and their default values.

|                                   Parameter                                    |                                             Description                                              |                          Default                          |
|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| metadata.resource.group                                                        |                                                                                                      | <code>kubedb.com</code>                                   |
| metadata.resource.kind                                                         |                                                                                                      | <code>ClickHouse</code>                                   |
| metadata.resource.name                                                         |                                                                                                      | <code>clickhouses</code>                                  |
| metadata.resource.scope                                                        |                                                                                                      | <code>Namespaced</code>                                   |
| metadata.resource.version                                                      |                                                                                                      | <code>v1alpha2</code>                                     |
| metadata.release.name                                                          | Release name                                                                                         | <code>""</code>                                           |
| metadata.release.namespace                                                     | Release namespace                                                                                    | <code>""</code>                                           |
| spec.annotations                                                               | Annotations to add to the database custom resource                                                   | <code>{}</code>                                           |
| spec.labels                                                                    | Labels to add to all the template objects                                                            | <code>{}</code>                                           |
| spec.mode                                                                      | Standalone, Topology                                                                                 | <code>Standalone</code>                                   |
| spec.topology.clickHouseKeeper.host                                            |                                                                                                      | <code>clickhouse-keeper.click-keeper</code>               |
| spec.topology.clickHouseKeeper.port                                            |                                                                                                      | <code>2181</code>                                         |
| spec.deletionPolicy                                                            |                                                                                                      | <code>WipeOut</code>                                      |
| spec.persistence.size                                                          |                                                                                                      | <code>10Gi</code>                                         |
| spec.podResources.machine                                                      |                                                                                                      | <code>""</code>                                           |
| spec.podResources.resources.limits.cpu                                         |                                                                                                      | <code>500m</code>                                         |
| spec.podResources.resources.limits.memory                                      |                                                                                                      | <code>1Gi</code>                                          |
| spec.authSecret.name                                                           |                                                                                                      | <code>""</code>                                           |
| spec.authSecret.password                                                       |                                                                                                      | <code>""</code>                                           |
| spec.configuration                                                             |                                                                                                      | <code>""</code>                                           |
| spec.admin.deployment.default                                                  |                                                                                                      | <code>Dedicated</code>                                    |
| spec.admin.deployment.toggle                                                   |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.default                                                 |                                                                                                      | <code>"GeneralPurpose"</code>                             |
| spec.admin.clusterTier.toggle                                                  |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.nodeTopology.default                                    |                                                                                                      | <code>"standard-bsv2-family"</code>                       |
| spec.admin.clusterTier.nodeTopology.toggle                                     |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.placement.default                                       |                                                                                                      | <code>"default"</code>                                    |
| spec.admin.clusterTier.placement.toggle                                        |                                                                                                      | <code>true</code>                                         |
| spec.admin.databases.ClickHouse.versions.default                               |                                                                                                      | <code>"24.4.1"</code>                                     |
| spec.admin.databases.ClickHouse.versions.toggle                                |                                                                                                      | <code>true</code>                                         |
| spec.admin.storageClasses.default                                              |                                                                                                      | <code>"default"</code>                                    |
| spec.admin.storageClasses.toggle                                               |                                                                                                      | <code>true</code>                                         |
| spec.admin.tls.default                                                         |                                                                                                      | <code>false</code>                                        |
| spec.admin.tls.toggle                                                          |                                                                                                      | <code>false</code>                                        |
| spec.admin.clusterIssuers.default                                              |                                                                                                      | <code>"cluster-issuer"</code>                             |
| spec.admin.clusterIssuers.toggle                                               |                                                                                                      | <code>true</code>                                         |
| spec.admin.webUI.default                                                       |                                                                                                      | <code>false</code>                                        |
| spec.admin.webUI.toggle                                                        |                                                                                                      | <code>false</code>                                        |
| spec.admin.monitoring.agent                                                    | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin") | <code>""</code>                                           |
| spec.admin.monitoring.exporter.resources                                       |                                                                                                      | <code>{"requests":{"cpu":"100m","memory":"128Mi"}}</code> |
| spec.admin.monitoring.serviceMonitor.labels.monitoring.appscode.com/prometheus |                                                                                                      | <code>federated</code>                                    |
| spec.admin.monitoring.toggle                                                   |                                                                                                      | <code>false</code>                                        |
| spec.admin.alerts.toggle                                                       |                                                                                                      | <code>false</code>                                        |
| spec.admin.archiver.toggle                                                     |                                                                                                      | <code>false</code>                                        |
| spec.admin.archiver.default                                                    |                                                                                                      | <code>false</code>                                        |
| spec.admin.backup.tool                                                         |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.toggle                                                       |                                                                                                      | <code>false</code>                                        |
| spec.admin.backup.kubestash.schedule                                           |                                                                                                      | <code>"0 */2 * * *"</code>                                |
| spec.admin.backup.kubestash.storageRef.name                                    |                                                                                                      | <code>default</code>                                      |
| spec.admin.backup.kubestash.storageRef.namespace                               |                                                                                                      | <code>stash</code>                                        |
| spec.admin.backup.kubestash.retentionPolicy.name                               |                                                                                                      | <code>"keep-1mo"</code>                                   |
| spec.admin.backup.kubestash.retentionPolicy.namespace                          |                                                                                                      | <code>stash</code>                                        |
| spec.admin.backup.kubestash.encryptionSecret.name                              |                                                                                                      | <code>default-encryption-secret</code>                    |
| spec.admin.backup.kubestash.encryptionSecret.namespace                         |                                                                                                      | <code>stash</code>                                        |
| spec.admin.backup.stash.schedule                                               |                                                                                                      | <code>"0 */2 * * *"</code>                                |
| spec.admin.backup.stash.retentionPolicy.name                                   |                                                                                                      | <code>keep-last-30d</code>                                |
| spec.admin.backup.stash.retentionPolicy.keepHourly                             |                                                                                                      | <code>24</code>                                           |
| spec.admin.backup.stash.retentionPolicy.keepDaily                              |                                                                                                      | <code>30</code>                                           |
| spec.admin.backup.stash.retentionPolicy.prune                                  |                                                                                                      | <code>true</code>                                         |
| spec.admin.backup.stash.authSecret.name                                        |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.authSecret.password                                    |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.provider                                       |                                                                                                      | <code>"" # s3,gcs,azure,swift,b2</code>                   |
| spec.admin.backup.stash.backend.s3.spec.endpoint                               |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.s3.spec.bucket                                 |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.s3.auth.AWS_ACCESS_KEY_ID                      |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.s3.auth.AWS_SECRET_ACCESS_KEY                  |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.s3.auth.CA_CERT_DATA                           |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.azure.spec.container                           |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.azure.auth.AZURE_ACCOUNT_NAME                  |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.azure.auth.AZURE_ACCOUNT_KEY                   |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.gcs.spec.bucket                                |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.gcs.auth.GOOGLE_PROJECT_ID                     |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.gcs.auth.GOOGLE_SERVICE_ACCOUNT_JSON_KEY       |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.spec.container                           |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_USERNAME                         |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_PASSWORD                         |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_REGION_NAME                      |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_AUTH_URL                         |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_USER_DOMAIN_NAME                 |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_PROJECT_NAME                     |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_PROJECT_DOMAIN_NAME              |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_TENANT_ID                        |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_TENANT_NAME                      |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.ST_AUTH                             |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.ST_USER                             |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.ST_KEY                              |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_STORAGE_URL                      |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.swift.auth.OS_AUTH_TOKEN                       |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.b2.spec.bucket                                 |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.b2.auth.B2_ACCOUNT_ID                          |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.stash.backend.b2.auth.B2_ACCOUNT_KEY                         |                                                                                                      | <code>""</code>                                           |
| form.alert.enabled                                                             | # Enable PrometheusRule alerts                                                                       | <code>warning</code>                                      |
| form.alert.labels                                                              | # Labels for default rules                                                                           | <code>{"release":"kube-prometheus-stack"}</code>          |
| form.alert.annotations                                                         | # Annotations for default rules                                                                      | <code>{}</code>                                           |
| form.alert.additionalRuleLabels                                                | # Additional labels for PrometheusRule alerts                                                        | <code>{}</code>                                           |
| form.alert.groups.database.enabled                                             |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhouseVirtualMemoryUsage.enabled          |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseVirtualMemoryUsage.val              |                                                                                                      | <code>2097152 # 2GB</code>                                |
| form.alert.groups.database.rules.clickhouseVirtualMemoryUsage.duration         |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.clickhouseVirtualMemoryUsage.severity         |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhouseReplicationLag.enabled              |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseReplicationLag.val                  |                                                                                                      | <code>10</code>                                           |
| form.alert.groups.database.rules.clickhouseReplicationLag.duration             |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.clickhouseReplicationLag.severity             |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.clickhouseNumberCursorsOpen.enabled           |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseNumberCursorsOpen.val               |                                                                                                      | <code>10000</code>                                        |
| form.alert.groups.database.rules.clickhouseNumberCursorsOpen.duration          |                                                                                                      | <code>"2m"</code>                                         |
| form.alert.groups.database.rules.clickhouseNumberCursorsOpen.severity          |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhouseCursorsTimeouts.enabled             |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseCursorsTimeouts.val                 |                                                                                                      | <code>100</code>                                          |
| form.alert.groups.database.rules.clickhouseCursorsTimeouts.duration            |                                                                                                      | <code>"2m"</code>                                         |
| form.alert.groups.database.rules.clickhouseCursorsTimeouts.severity            |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhouseTooManyConnections.enabled          |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseTooManyConnections.val              |                                                                                                      | <code>80 # percentage</code>                              |
| form.alert.groups.database.rules.clickhouseTooManyConnections.duration         |                                                                                                      | <code>"2m"</code>                                         |
| form.alert.groups.database.rules.clickhouseTooManyConnections.severity         |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhousePhaseCritical.enabled               |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhousePhaseCritical.duration              |                                                                                                      | <code>"3m"</code>                                         |
| form.alert.groups.database.rules.clickhousePhaseCritical.severity              |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhouseDown.enabled                        |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseDown.duration                       |                                                                                                      | <code>"30s"</code>                                        |
| form.alert.groups.database.rules.clickhouseDown.severity                       |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.clickhouseHighLatency.enabled                 |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseHighLatency.val                     |                                                                                                      | <code>250000</code>                                       |
| form.alert.groups.database.rules.clickhouseHighLatency.duration                |                                                                                                      | <code>"10m"</code>                                        |
| form.alert.groups.database.rules.clickhouseHighLatency.severity                |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhouseHighTicketUtilization.enabled       |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseHighTicketUtilization.val           |                                                                                                      | <code>75 # percentage</code>                              |
| form.alert.groups.database.rules.clickhouseHighTicketUtilization.duration      |                                                                                                      | <code>"10m"</code>                                        |
| form.alert.groups.database.rules.clickhouseHighTicketUtilization.severity      |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhouseRecurrentCursorTimeout.enabled      |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseRecurrentCursorTimeout.val          |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.clickhouseRecurrentCursorTimeout.duration     |                                                                                                      | <code>"30m"</code>                                        |
| form.alert.groups.database.rules.clickhouseRecurrentCursorTimeout.severity     |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.clickhouseRecurrentMemoryPageFaults.enabled   |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.clickhouseRecurrentMemoryPageFaults.val       |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.clickhouseRecurrentMemoryPageFaults.duration  |                                                                                                      | <code>"30m"</code>                                        |
| form.alert.groups.database.rules.clickhouseRecurrentMemoryPageFaults.severity  |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.provisioner.enabled                                          |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                   |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                  |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                  |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                   |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                  |                                                                                                      | <code>"15m"</code>                                        |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                  |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.opsManager.enabled                                           |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled                |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration               |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity               |                                                                                                      | <code>info</code>                                         |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled   |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration  |                                                                                                      | <code>"30m"</code>                                        |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity  |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                   |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                   |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.stash.enabled                                                |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.stash.rules.backupSessionFailed.enabled                      |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.stash.rules.backupSessionFailed.duration                     |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.stash.rules.backupSessionFailed.severity                     |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.stash.rules.restoreSessionFailed.enabled                     |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.stash.rules.restoreSessionFailed.duration                    |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.stash.rules.restoreSessionFailed.severity                    |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.enabled                |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.duration               |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.val                    |                                                                                                      | <code>18000</code>                                        |
| form.alert.groups.stash.rules.noBackupSessionForTooLong.severity               |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.stash.rules.repositoryCorrupted.enabled                      |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.stash.rules.repositoryCorrupted.duration                     |                                                                                                      | <code>"5m"</code>                                         |
| form.alert.groups.stash.rules.repositoryCorrupted.severity                     |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.enabled              |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.duration             |                                                                                                      | <code>"5m"</code>                                         |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.val                  |                                                                                                      | <code>10737418240 # 10GB</code>                           |
| form.alert.groups.stash.rules.repositoryStorageRunningLow.severity             |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.enabled               |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.duration              |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.val                   |                                                                                                      | <code>1800 # 30 minute</code>                             |
| form.alert.groups.stash.rules.backupSessionPeriodTooLong.severity              |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.enabled              |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.duration             |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.val                  |                                                                                                      | <code>1800 # 30 minute</code>                             |
| form.alert.groups.stash.rules.restoreSessionPeriodTooLong.severity             |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.schemaManager.enabled                                        |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.schemaManager.rules.schemaPendingForTooLong.enabled          |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.schemaManager.rules.schemaPendingForTooLong.duration         |                                                                                                      | <code>"30m"</code>                                        |
| form.alert.groups.schemaManager.rules.schemaPendingForTooLong.severity         |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.schemaManager.rules.schemaInProgressForTooLong.enabled       |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.schemaManager.rules.schemaInProgressForTooLong.duration      |                                                                                                      | <code>"30m"</code>                                        |
| form.alert.groups.schemaManager.rules.schemaInProgressForTooLong.severity      |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.schemaManager.rules.schemaTerminatingForTooLong.enabled      |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.schemaManager.rules.schemaTerminatingForTooLong.duration     |                                                                                                      | <code>"30m"</code>                                        |
| form.alert.groups.schemaManager.rules.schemaTerminatingForTooLong.severity     |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.schemaManager.rules.schemaFailed.enabled                     |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.schemaManager.rules.schemaFailed.duration                    |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.schemaManager.rules.schemaFailed.severity                    |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.schemaManager.rules.schemaExpired.enabled                    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.schemaManager.rules.schemaExpired.duration                   |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.schemaManager.rules.schemaExpired.severity                   |                                                                                                      | <code>warning</code>                                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-clickhouse-editor-options bytebuilders-ui/kubedbcom-clickhouse-editor-options -n kube-system --create-namespace --version=v0.4.21 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-clickhouse-editor-options bytebuilders-ui/kubedbcom-clickhouse-editor-options -n kube-system --create-namespace --version=v0.4.21 --values values.yaml
```
