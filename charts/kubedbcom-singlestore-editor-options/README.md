# Singlestore Editor UI Options

[Singlestore Editor UI Options](https://byte.builders) - Singlestore Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-singlestore-editor-options --version=v0.5.0
$ helm upgrade -i kubedbcom-singlestore-editor-options bytebuilders-ui/kubedbcom-singlestore-editor-options -n kube-system --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys a Singlestore Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-singlestore-editor-options`:

```bash
$ helm upgrade -i kubedbcom-singlestore-editor-options bytebuilders-ui/kubedbcom-singlestore-editor-options -n kube-system --create-namespace --version=v0.5.0
```

The command deploys a Singlestore Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-singlestore-editor-options`:

```bash
$ helm uninstall kubedbcom-singlestore-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-singlestore-editor-options` chart and their default values.

|                                   Parameter                                    |                                             Description                                              |                          Default                          |
|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| metadata.resource.group                                                        |                                                                                                      | <code>kubedb.com</code>                                   |
| metadata.resource.kind                                                         |                                                                                                      | <code>Singlestore</code>                                  |
| metadata.resource.name                                                         |                                                                                                      | <code>singlestores</code>                                 |
| metadata.resource.scope                                                        |                                                                                                      | <code>Namespaced</code>                                   |
| metadata.resource.version                                                      |                                                                                                      | <code>v1alpha2</code>                                     |
| metadata.release.name                                                          | Release name                                                                                         | <code>""</code>                                           |
| metadata.release.namespace                                                     | Release namespace                                                                                    | <code>""</code>                                           |
| spec.annotations                                                               | Annotations to add to the database custom resource                                                   | <code>{}</code>                                           |
| spec.labels                                                                    | Labels to add to all the template objects                                                            | <code>{}</code>                                           |
| spec.mode                                                                      | Standalone, Topology                                                                                 | <code>Standalone</code>                                   |
| spec.topology.aggregator.persistence.size                                      |                                                                                                      | <code>10Gi</code>                                         |
| spec.topology.aggregator.podResources.machine                                  |                                                                                                      | <code>""</code>                                           |
| spec.topology.aggregator.podResources.resources.limits.cpu                     |                                                                                                      | <code>500m</code>                                         |
| spec.topology.aggregator.podResources.resources.limits.memory                  |                                                                                                      | <code>2Gi</code>                                          |
| spec.topology.aggregator.replicas                                              |                                                                                                      | <code>2</code>                                            |
| spec.topology.leaf.persistence.size                                            |                                                                                                      | <code>10Gi</code>                                         |
| spec.topology.leaf.podResources.machine                                        |                                                                                                      | <code>""</code>                                           |
| spec.topology.leaf.podResources.resources.limits.cpu                           |                                                                                                      | <code>500m</code>                                         |
| spec.topology.leaf.podResources.resources.limits.memory                        |                                                                                                      | <code>2Gi</code>                                          |
| spec.topology.leaf.replicas                                                    |                                                                                                      | <code>3</code>                                            |
| spec.licenseSecret.name                                                        |                                                                                                      | <code>""</code>                                           |
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
| spec.admin.databases.Singlestore.versions.default                              |                                                                                                      | <code>"8.1.32"</code>                                     |
| spec.admin.databases.Singlestore.versions.toggle                               |                                                                                                      | <code>true</code>                                         |
| spec.admin.storageClasses.default                                              |                                                                                                      | <code>"default"</code>                                    |
| spec.admin.storageClasses.toggle                                               |                                                                                                      | <code>true</code>                                         |
| spec.admin.tls.default                                                         |                                                                                                      | <code>true</code>                                         |
| spec.admin.tls.toggle                                                          |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterIssuers.default                                              |                                                                                                      | <code>"cluster-issuer"</code>                             |
| spec.admin.clusterIssuers.toggle                                               |                                                                                                      | <code>true</code>                                         |
| spec.admin.webUI.default                                                       |                                                                                                      | <code>false</code>                                        |
| spec.admin.webUI.toggle                                                        |                                                                                                      | <code>false</code>                                        |
| spec.admin.monitoring.agent                                                    | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin") | <code>prometheus.io/operator</code>                       |
| spec.admin.monitoring.exporter.resources                                       |                                                                                                      | <code>{"requests":{"cpu":"100m","memory":"128Mi"}}</code> |
| spec.admin.monitoring.serviceMonitor.labels.monitoring.appscode.com/prometheus |                                                                                                      | <code>federated</code>                                    |
| spec.admin.monitoring.toggle                                                   |                                                                                                      | <code>true</code>                                         |
| spec.admin.alerts.toggle                                                       |                                                                                                      | <code>true</code>                                         |
| spec.admin.archiver.toggle                                                     |                                                                                                      | <code>false</code>                                        |
| spec.admin.archiver.default                                                    |                                                                                                      | <code>false</code>                                        |
| spec.admin.backup.tool                                                         |                                                                                                      | <code>""</code>                                           |
| spec.admin.backup.toggle                                                       |                                                                                                      | <code>true</code>                                         |
| spec.admin.backup.kubestash.schedule                                           |                                                                                                      | <code>"0 */2 * * *"</code>                                |
| spec.admin.backup.kubestash.storageRef.name                                    |                                                                                                      | <code>default</code>                                      |
| spec.admin.backup.kubestash.storageRef.namespace                               |                                                                                                      | <code>stash</code>                                        |
| spec.admin.backup.kubestash.retentionPolicy.name                               |                                                                                                      | <code>"keep-1mo"</code>                                   |
| spec.admin.backup.kubestash.retentionPolicy.namespace                          |                                                                                                      | <code>stash</code>                                        |
| spec.admin.backup.kubestash.encryptionSecret.name                              |                                                                                                      | <code>default-encryption-secret</code>                    |
| spec.admin.backup.kubestash.encryptionSecret.namespace                         |                                                                                                      | <code>stash</code>                                        |
| form.alert.enabled                                                             | # Enable PrometheusRule alerts                                                                       | <code>warning</code>                                      |
| form.alert.labels                                                              | # Labels for default rules                                                                           | <code>{"release":"kube-prometheus-stack"}</code>          |
| form.alert.annotations                                                         | # Annotations for default rules                                                                      | <code>{}</code>                                           |
| form.alert.additionalRuleLabels                                                | # Additional labels for PrometheusRule alerts                                                        | <code>{}</code>                                           |
| form.alert.groups.database.enabled                                             |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.singlestoreInstanceDown.enabled               |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.singlestoreInstanceDown.duration              |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.singlestoreInstanceDown.severity              |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.singlestoreServiceDown.enabled                |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.singlestoreServiceDown.duration               |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.singlestoreServiceDown.severity               |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.singlestoreTooManyConnections.enabled         |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.singlestoreTooManyConnections.duration        |                                                                                                      | <code>"2m"</code>                                         |
| form.alert.groups.database.rules.singlestoreTooManyConnections.val             |                                                                                                      | <code>80</code>                                           |
| form.alert.groups.database.rules.singlestoreTooManyConnections.severity        |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.singlestoreHighThreadsRunning.enabled         |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.singlestoreHighThreadsRunning.duration        |                                                                                                      | <code>"2m"</code>                                         |
| form.alert.groups.database.rules.singlestoreHighThreadsRunning.val             |                                                                                                      | <code>60</code>                                           |
| form.alert.groups.database.rules.singlestoreHighThreadsRunning.severity        |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.singlestoreRestarted.enabled                  |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.singlestoreRestarted.duration                 |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.singlestoreRestarted.val                      |                                                                                                      | <code>60</code>                                           |
| form.alert.groups.database.rules.singlestoreRestarted.severity                 |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.singlestoreHighQPS.enabled                    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.singlestoreHighQPS.duration                   |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.singlestoreHighQPS.val                        |                                                                                                      | <code>1000</code>                                         |
| form.alert.groups.database.rules.singlestoreHighQPS.severity                   |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.singlestoreHighIncomingBytes.enabled          |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.singlestoreHighIncomingBytes.duration         |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.singlestoreHighIncomingBytes.val              |                                                                                                      | <code>1048576 # 1MB</code>                                |
| form.alert.groups.database.rules.singlestoreHighIncomingBytes.severity         |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.singlestoreHighOutgoingBytes.enabled          |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.singlestoreHighOutgoingBytes.duration         |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.singlestoreHighOutgoingBytes.val              |                                                                                                      | <code>1048576 # 1MB</code>                                |
| form.alert.groups.database.rules.singlestoreHighOutgoingBytes.severity         |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.diskUsageHigh.enabled                         |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.diskUsageHigh.val                             |                                                                                                      | <code>80</code>                                           |
| form.alert.groups.database.rules.diskUsageHigh.duration                        |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.diskUsageHigh.severity                        |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.diskAlmostFull.enabled                        |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.diskAlmostFull.val                            |                                                                                                      | <code>95</code>                                           |
| form.alert.groups.database.rules.diskAlmostFull.duration                       |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.diskAlmostFull.severity                       |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.provisioner.enabled                                          |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                   |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                  |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                  |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                   |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                  |                                                                                                      | <code>"15m"</code>                                        |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                  |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.kubeStash.enabled                                            |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.kubeStash.rules.backupSessionFailed.enabled                  |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.kubeStash.rules.backupSessionFailed.duration                 |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.kubeStash.rules.backupSessionFailed.severity                 |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.enabled                 |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.duration                |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.kubeStash.rules.restoreSessionFailed.severity                |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.enabled            |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.duration           |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.val                |                                                                                                      | <code>18000</code>                                        |
| form.alert.groups.kubeStash.rules.noBackupSessionForTooLong.severity           |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.enabled                  |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.duration                 |                                                                                                      | <code>"5m"</code>                                         |
| form.alert.groups.kubeStash.rules.repositoryCorrupted.severity                 |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.enabled          |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.duration         |                                                                                                      | <code>"5m"</code>                                         |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.val              |                                                                                                      | <code>10737418240 # 10GB</code>                           |
| form.alert.groups.kubeStash.rules.repositoryStorageRunningLow.severity         |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.enabled           |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.duration          |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.val               |                                                                                                      | <code>1800 # 30 minute</code>                             |
| form.alert.groups.kubeStash.rules.backupSessionPeriodTooLong.severity          |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.enabled          |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.duration         |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.val              |                                                                                                      | <code>1800 # 30 minute</code>                             |
| form.alert.groups.kubeStash.rules.restoreSessionPeriodTooLong.severity         |                                                                                                      | <code>warning</code>                                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-singlestore-editor-options bytebuilders-ui/kubedbcom-singlestore-editor-options -n kube-system --create-namespace --version=v0.5.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-singlestore-editor-options bytebuilders-ui/kubedbcom-singlestore-editor-options -n kube-system --create-namespace --version=v0.5.0 --values values.yaml
```
