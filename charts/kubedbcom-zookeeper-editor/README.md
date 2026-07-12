# ZooKeeper Editor

[ZooKeeper Editor by AppsCode](https://appscode.com) - ZooKeeper Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-zookeeper-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-zookeeper-editor appscode/kubedbcom-zookeeper-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a ZooKeeper Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-zookeeper-editor`:

```bash
$ helm upgrade -i kubedbcom-zookeeper-editor appscode/kubedbcom-zookeeper-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a ZooKeeper Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-zookeeper-editor`:

```bash
$ helm uninstall kubedbcom-zookeeper-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-zookeeper-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                    Default                                                                    |
|-------------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                               |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                               |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.diskAlmostFull.duration                      |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.diskAlmostFull.enabled                       |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.diskAlmostFull.severity                      |             | <code>critical</code>                                                                                                                         |
| form.alert.groups.database.rules.diskAlmostFull.val                           |             | <code>95</code>                                                                                                                               |
| form.alert.groups.database.rules.diskUsageHigh.duration                       |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.diskUsageHigh.enabled                        |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.diskUsageHigh.severity                       |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.diskUsageHigh.val                            |             | <code>80</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperDown.duration                       |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperDown.enabled                        |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperDown.severity                       |             | <code>critical</code>                                                                                                                         |
| form.alert.groups.database.rules.zookeeperJvmMemoryFilingUp.duration          |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperJvmMemoryFilingUp.enabled           |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperJvmMemoryFilingUp.severity          |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperJvmMemoryFilingUp.val               |             | <code>0.8</code>                                                                                                                              |
| form.alert.groups.database.rules.zookeeperLeaderElection.duration             |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperLeaderElection.enabled              |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperLeaderElection.severity             |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooBigMemory.duration               |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooBigMemory.enabled                |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperTooBigMemory.severity               |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooBigMemory.val                    |             | <code>1</code>                                                                                                                                |
| form.alert.groups.database.rules.zookeeperTooHighAvgLatency.duration          |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooHighAvgLatency.enabled           |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperTooHighAvgLatency.severity          |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooHighAvgLatency.val               |             | <code>100</code>                                                                                                                              |
| form.alert.groups.database.rules.zookeeperTooLongFsyncTime.duration           |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooLongFsyncTime.enabled            |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperTooLongFsyncTime.severity           |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooLongFsyncTime.val                |             | <code>100</code>                                                                                                                              |
| form.alert.groups.database.rules.zookeeperTooLongSnapshotTime.duration        |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooLongSnapshotTime.enabled         |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperTooLongSnapshotTime.severity        |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooLongSnapshotTime.val             |             | <code>100</code>                                                                                                                              |
| form.alert.groups.database.rules.zookeeperTooManyConnections.duration         |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooManyConnections.enabled          |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperTooManyConnections.severity         |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooManyConnections.val              |             | <code>60</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooManyNodes.duration               |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooManyNodes.enabled                |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperTooManyNodes.severity               |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooManyNodes.val                    |             | <code>1e+06</code>                                                                                                                            |
| form.alert.groups.database.rules.zookeeperTooManyOpenFiles.duration           |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooManyOpenFiles.enabled            |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperTooManyOpenFiles.severity           |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooManyOpenFiles.val                |             | <code>300</code>                                                                                                                              |
| form.alert.groups.database.rules.zookeeperTooManyWatch.duration               |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.zookeeperTooManyWatch.enabled                |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.zookeeperTooManyWatch.severity               |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.zookeeperTooManyWatch.val                    |             | <code>10000</code>                                                                                                                            |
| form.alert.groups.opsManager.enabled                                          |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                  |             | <code>0m</code>                                                                                                                               |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                   |             | <code>true</code>                                                                                                                             |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                  |             | <code>critical</code>                                                                                                                         |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration              |             | <code>0m</code>                                                                                                                               |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled               |             | <code>true</code>                                                                                                                             |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity              |             | <code>info</code>                                                                                                                             |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration |             | <code>30m</code>                                                                                                                              |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled  |             | <code>true</code>                                                                                                                             |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity |             | <code>critical</code>                                                                                                                         |
| form.alert.groups.provisioner.enabled                                         |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                 |             | <code>15m</code>                                                                                                                              |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                  |             | <code>true</code>                                                                                                                             |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                 |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                 |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                  |             | <code>true</code>                                                                                                                             |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                 |             | <code>critical</code>                                                                                                                         |
| form.alert.labels.release                                                     |             | <code>kube-prometheus-stack</code>                                                                                                            |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                       |
| metadata.resource.version                                                     |             | <code>v1alpha2</code>                                                                                                                         |
| metadata.resource.name                                                        |             | <code>zookeepers</code>                                                                                                                       |
| metadata.resource.kind                                                        |             | <code>ZooKeeper</code>                                                                                                                        |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                       |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                                     |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                          |
| resources.autoscalingKubedbComZooKeeperAutoscaler                             |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"ZooKeeperAutoscaler","metadata":{"name":"zookeeper","namespace":"demo"}}</code> |
| resources.catalogAppscodeComZooKeeperBinding                                  |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"ZooKeeperBinding","metadata":{"name":"zookeeper","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"zookeeper-ca","namespace":"demo"}}</code>                        |
| resources.coreKubestashComBackupBlueprint                                     |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupBlueprint","metadata":{"name":"zookeeper","namespace":"demo"}}</code>         |
| resources.coreKubestashComBackupConfiguration                                 |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"BackupConfiguration","metadata":{"name":"zookeeper","namespace":"demo"}}</code>     |
| resources.coreKubestashComRestoreSession                                      |             | <code>{"apiVersion":"core.kubestash.com/v1alpha1","kind":"RestoreSession","metadata":{"name":"zookeeper","namespace":"demo"}}</code>          |
| resources.kubedbComZooKeeper                                                  |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"ZooKeeper","metadata":{"name":"zookeeper","namespace":"zookeeper"}}</code>                  |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"zookeeper","namespace":"demo"}}</code>             |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"zookeeper-auth","namespace":"demo"}}</code>                                      |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"zookeeper-config","namespace":"demo"}}</code>                                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-zookeeper-editor appscode/kubedbcom-zookeeper-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-zookeeper-editor appscode/kubedbcom-zookeeper-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
