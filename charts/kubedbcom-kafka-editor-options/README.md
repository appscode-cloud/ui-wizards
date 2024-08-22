# Kafka Editor UI Options

[Kafka Editor UI Options](https://byte.builders) - Kafka Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-kafka-editor-options --version=v0.5.0
$ helm upgrade -i kubedbcom-kafka-editor-options bytebuilders-ui/kubedbcom-kafka-editor-options -n kube-system --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys a Kafka Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-kafka-editor-options`:

```bash
$ helm upgrade -i kubedbcom-kafka-editor-options bytebuilders-ui/kubedbcom-kafka-editor-options -n kube-system --create-namespace --version=v0.5.0
```

The command deploys a Kafka Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-kafka-editor-options`:

```bash
$ helm uninstall kubedbcom-kafka-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-kafka-editor-options` chart and their default values.

|                                 Parameter                                  |                                             Description                                              |                          Default                          |
|----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| metadata.resource.group                                                    |                                                                                                      | <code>kubedb.com</code>                                   |
| metadata.resource.kind                                                     |                                                                                                      | <code>Kafka</code>                                        |
| metadata.resource.name                                                     |                                                                                                      | <code>kafkas</code>                                       |
| metadata.resource.scope                                                    |                                                                                                      | <code>Namespaced</code>                                   |
| metadata.resource.version                                                  |                                                                                                      | <code>v1alpha2</code>                                     |
| metadata.release.name                                                      | Release name                                                                                         | <code>""</code>                                           |
| metadata.release.namespace                                                 | Release namespace                                                                                    | <code>""</code>                                           |
| spec.annotations                                                           | Annotations to add to the database custom resource                                                   | <code>{}</code>                                           |
| spec.labels                                                                | Labels to add to all the template objects                                                            | <code>{}</code>                                           |
| spec.mode                                                                  | Combined, Topology                                                                                   | <code>Combined</code>                                     |
| spec.replicas                                                              |                                                                                                      | <code>2</code>                                            |
| spec.topology.controller.replicas                                          |                                                                                                      | <code>2</code>                                            |
| spec.topology.controller.podResources.machine                              |                                                                                                      | <code>""</code>                                           |
| spec.topology.controller.podResources.resources.limits.cpu                 |                                                                                                      | <code>500m</code>                                         |
| spec.topology.controller.podResources.resources.limits.memory              |                                                                                                      | <code>1Gi</code>                                          |
| spec.topology.controller.persistence.size                                  |                                                                                                      | <code>1Gi</code>                                          |
| spec.topology.broker.replicas                                              |                                                                                                      | <code>2</code>                                            |
| spec.topology.broker.podResources.machine                                  |                                                                                                      | <code>""</code>                                           |
| spec.topology.broker.podResources.resources.limits.cpu                     |                                                                                                      | <code>500m</code>                                         |
| spec.topology.broker.podResources.resources.limits.memory                  |                                                                                                      | <code>1Gi</code>                                          |
| spec.topology.broker.persistence.size                                      |                                                                                                      | <code>1Gi</code>                                          |
| spec.deletionPolicy                                                        |                                                                                                      | <code>WipeOut</code>                                      |
| spec.persistence.size                                                      |                                                                                                      | <code>10Gi</code>                                         |
| spec.podResources.machine                                                  |                                                                                                      | <code>""</code>                                           |
| spec.podResources.resources.limits.cpu                                     |                                                                                                      | <code>500m</code>                                         |
| spec.podResources.resources.limits.memory                                  |                                                                                                      | <code>1Gi</code>                                          |
| spec.authSecret.name                                                       |                                                                                                      | <code>""</code>                                           |
| spec.authSecret.password                                                   |                                                                                                      | <code>""</code>                                           |
| spec.configuration                                                         |                                                                                                      | <code>""</code>                                           |
| spec.admin.deployment.default                                              |                                                                                                      | <code>Dedicated</code>                                    |
| spec.admin.deployment.toggle                                               |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.default                                             |                                                                                                      | <code>"GeneralPurpose"</code>                             |
| spec.admin.clusterTier.toggle                                              |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.nodeTopology.default                                |                                                                                                      | <code>"standard-bsv2-family"</code>                       |
| spec.admin.clusterTier.nodeTopology.toggle                                 |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.placement.default                                   |                                                                                                      | <code>"default"</code>                                    |
| spec.admin.clusterTier.placement.toggle                                    |                                                                                                      | <code>true</code>                                         |
| spec.admin.databases.Kafka.versions.default                                |                                                                                                      | <code>"3.5.2"</code>                                      |
| spec.admin.databases.Kafka.versions.toggle                                 |                                                                                                      | <code>true</code>                                         |
| spec.admin.storageClasses.default                                          |                                                                                                      | <code>"default"</code>                                    |
| spec.admin.storageClasses.toggle                                           |                                                                                                      | <code>true</code>                                         |
| spec.admin.tls.default                                                     |                                                                                                      | <code>true</code>                                         |
| spec.admin.tls.toggle                                                      |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterIssuers.default                                          |                                                                                                      | <code>"cluster-issuer"</code>                             |
| spec.admin.clusterIssuers.toggle                                           |                                                                                                      | <code>true</code>                                         |
| spec.admin.webUI.default                                                   |                                                                                                      | <code>false</code>                                        |
| spec.admin.webUI.toggle                                                    |                                                                                                      | <code>false</code>                                        |
| spec.admin.monitoring.agent                                                | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin") | <code>prometheus.io/operator</code>                       |
| spec.admin.monitoring.exporter.resources                                   |                                                                                                      | <code>{"requests":{"cpu":"100m","memory":"128Mi"}}</code> |
| spec.admin.monitoring.toggle                                               |                                                                                                      | <code>true</code>                                         |
| spec.admin.alerts.toggle                                                   |                                                                                                      | <code>true</code>                                         |
| spec.admin.archiver.toggle                                                 |                                                                                                      | <code>false</code>                                        |
| spec.admin.archiver.default                                                |                                                                                                      | <code>false</code>                                        |
| spec.backup.tool                                                           |                                                                                                      | <code>""</code>                                           |
| spec.backup.toggle                                                         |                                                                                                      | <code>true</code>                                         |
| spec.backup.kubestash.schedule                                             |                                                                                                      | <code>"0 */2 * * *"</code>                                |
| spec.backup.kubestash.storageRef.name                                      |                                                                                                      | <code>default</code>                                      |
| spec.backup.kubestash.storageRef.namespace                                 |                                                                                                      | <code>stash</code>                                        |
| spec.backup.kubestash.retentionPolicy.name                                 |                                                                                                      | <code>"keep-1mo"</code>                                   |
| spec.backup.kubestash.retentionPolicy.namespace                            |                                                                                                      | <code>stash</code>                                        |
| spec.backup.kubestash.encryptionSecret.name                                |                                                                                                      | <code>default-encryption-secret</code>                    |
| spec.backup.kubestash.encryptionSecret.namespace                           |                                                                                                      | <code>stash</code>                                        |
| spec.monitoring.serviceMonitor.labels.monitoring.appscode.com/prometheus   |                                                                                                      | <code>federated</code>                                    |
| form.alert.enabled                                                         | # Enable PrometheusRule alerts                                                                       | <code>warning</code>                                      |
| form.alert.labels                                                          | # Labels for default rules                                                                           | <code>{"release":"kube-prometheus-stack"}</code>          |
| form.alert.annotations                                                     | # Annotations for default rules                                                                      | <code>{}</code>                                           |
| form.alert.additionalRuleLabels                                            | # Additional labels for PrometheusRule alerts                                                        | <code>{}</code>                                           |
| form.alert.groups.database.enabled                                         |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaUnderReplicatedPartitions.enabled    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaUnderReplicatedPartitions.duration   |                                                                                                      | <code>"10s"</code>                                        |
| form.alert.groups.database.rules.kafkaUnderReplicatedPartitions.severity   |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaUnderReplicatedPartitions.val        |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.kafkaAbnormalControllerState.enabled      |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaAbnormalControllerState.duration     |                                                                                                      | <code>"10s"</code>                                        |
| form.alert.groups.database.rules.kafkaAbnormalControllerState.severity     |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaAbnormalControllerState.val          |                                                                                                      | <code>1</code>                                            |
| form.alert.groups.database.rules.kafkaOfflinePartitions.enabled            |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaOfflinePartitions.duration           |                                                                                                      | <code>"10s"</code>                                        |
| form.alert.groups.database.rules.kafkaOfflinePartitions.severity           |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaOfflinePartitions.val                |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.kafkaUnderMinIsrPartitionCount.enabled    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaUnderMinIsrPartitionCount.duration   |                                                                                                      | <code>"10s"</code>                                        |
| form.alert.groups.database.rules.kafkaUnderMinIsrPartitionCount.severity   |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaUnderMinIsrPartitionCount.val        |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.kafkaOfflineLogDirectoryCount.enabled     |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaOfflineLogDirectoryCount.duration    |                                                                                                      | <code>"10s"</code>                                        |
| form.alert.groups.database.rules.kafkaOfflineLogDirectoryCount.severity    |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaOfflineLogDirectoryCount.val         |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.kafkaISRExpandRate.enabled                |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaISRExpandRate.duration               |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.kafkaISRExpandRate.severity               |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaISRExpandRate.val                    |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.kafkaISRShrinkRate.enabled                |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaISRShrinkRate.duration               |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.kafkaISRShrinkRate.severity               |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaISRShrinkRate.val                    |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.kafkaBrokerCount.enabled                  |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaBrokerCount.duration                 |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.kafkaBrokerCount.severity                 |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.kafkaBrokerCount.val                      |                                                                                                      | <code>0</code>                                            |
| form.alert.groups.database.rules.kafkaNetworkProcessorIdlePercent.enabled  |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaNetworkProcessorIdlePercent.duration |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.kafkaNetworkProcessorIdlePercent.severity |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.kafkaNetworkProcessorIdlePercent.val      |                                                                                                      | <code>0.3</code>                                          |
| form.alert.groups.database.rules.kafkaRequestHandlerIdlePercent.enabled    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaRequestHandlerIdlePercent.duration   |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.kafkaRequestHandlerIdlePercent.severity   |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.kafkaRequestHandlerIdlePercent.val        |                                                                                                      | <code>0.3</code>                                          |
| form.alert.groups.database.rules.kafkaReplicaFetcherManagerMaxLag.enabled  |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaReplicaFetcherManagerMaxLag.duration |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.kafkaReplicaFetcherManagerMaxLag.severity |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.kafkaReplicaFetcherManagerMaxLag.val      |                                                                                                      | <code>50</code>                                           |
| form.alert.groups.database.rules.kafkaTopicCount.enabled                   |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaTopicCount.duration                  |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.kafkaTopicCount.severity                  |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaTopicCount.val                       |                                                                                                      | <code>1000</code>                                         |
| form.alert.groups.database.rules.kafkaPhaseCritical.enabled                |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaPhaseCritical.duration               |                                                                                                      | <code>"3m"</code>                                         |
| form.alert.groups.database.rules.kafkaPhaseCritical.severity               |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.kafkaDown.enabled                         |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.kafkaDown.duration                        |                                                                                                      | <code>"30s"</code>                                        |
| form.alert.groups.database.rules.kafkaDown.severity                        |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.diskUsageHigh.enabled                     |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.diskUsageHigh.val                         |                                                                                                      | <code>80</code>                                           |
| form.alert.groups.database.rules.diskUsageHigh.duration                    |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.diskUsageHigh.severity                    |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.diskAlmostFull.enabled                    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.diskAlmostFull.val                        |                                                                                                      | <code>95</code>                                           |
| form.alert.groups.database.rules.diskAlmostFull.duration                   |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.diskAlmostFull.severity                   |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.provisioner.enabled                                      |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled               |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration              |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity              |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled               |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration              |                                                                                                      | <code>"15m"</code>                                        |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity              |                                                                                                      | <code>warning</code>                                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-kafka-editor-options bytebuilders-ui/kubedbcom-kafka-editor-options -n kube-system --create-namespace --version=v0.5.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-kafka-editor-options bytebuilders-ui/kubedbcom-kafka-editor-options -n kube-system --create-namespace --version=v0.5.0 --values values.yaml
```
