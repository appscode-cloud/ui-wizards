# ProxySQL Editor

[ProxySQL Editor by AppsCode](https://appscode.com) - ProxySQL Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-proxysql-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-proxysql-editor appscode/kubedbcom-proxysql-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a ProxySQL Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-proxysql-editor`:

```bash
$ helm upgrade -i kubedbcom-proxysql-editor appscode/kubedbcom-proxysql-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a ProxySQL Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-proxysql-editor`:

```bash
$ helm uninstall kubedbcom-proxysql-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-proxysql-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                   Default                                                                   |
|-------------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                             |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                             |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.cluster.enabled                                             |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.cluster.rules.proxysqlClusterSyncFailure.duration           |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.cluster.rules.proxysqlClusterSyncFailure.enabled            |             | <code>true</code>                                                                                                                           |
| form.alert.groups.cluster.rules.proxysqlClusterSyncFailure.severity           |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.cluster.rules.proxysqlClusterSyncFailure.val                |             | <code>0.1</code>                                                                                                                            |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.proxysqlHighIncomingBytes.duration           |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlHighIncomingBytes.enabled            |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlHighIncomingBytes.severity           |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.proxysqlHighIncomingBytes.val                |             | <code>1.048576e+06</code>                                                                                                                   |
| form.alert.groups.database.rules.proxysqlHighOutgoingBytes.duration           |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlHighOutgoingBytes.enabled            |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlHighOutgoingBytes.severity           |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.proxysqlHighOutgoingBytes.val                |             | <code>1.048576e+06</code>                                                                                                                   |
| form.alert.groups.database.rules.proxysqlHighQPS.duration                     |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlHighQPS.enabled                      |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlHighQPS.severity                     |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.proxysqlHighQPS.val                          |             | <code>1000</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlHighThreadsRunning.duration          |             | <code>2m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlHighThreadsRunning.enabled           |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlHighThreadsRunning.severity          |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.proxysqlHighThreadsRunning.val               |             | <code>60</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlInstanceDown.duration                |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlInstanceDown.enabled                 |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlInstanceDown.severity                |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.proxysqlRestarted.duration                   |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlRestarted.enabled                    |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlRestarted.severity                   |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.proxysqlRestarted.val                        |             | <code>60</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlServiceDown.duration                 |             | <code>0m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlServiceDown.enabled                  |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlServiceDown.severity                 |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.proxysqlSlowQueries.duration                 |             | <code>2m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlSlowQueries.enabled                  |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlSlowQueries.severity                 |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.proxysqlTooManyConnections.duration          |             | <code>2m</code>                                                                                                                             |
| form.alert.groups.database.rules.proxysqlTooManyConnections.enabled           |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.proxysqlTooManyConnections.severity          |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.proxysqlTooManyConnections.val               |             | <code>80</code>                                                                                                                             |
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
| form.alert.labels.release                                                     |             | <code>kube-prometheus-stack</code>                                                                                                          |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                     |
| metadata.resource.version                                                     |             | <code>v1</code>                                                                                                                             |
| metadata.resource.name                                                        |             | <code>proxysqls</code>                                                                                                                      |
| metadata.resource.kind                                                        |             | <code>ProxySQL</code>                                                                                                                       |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                     |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                                   |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                        |
| resources.autoscalingKubedbComProxySQLAutoscaler                              |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"ProxySQLAutoscaler","metadata":{"name":"proxysql","namespace":"demo"}}</code> |
| resources.catalogAppscodeComProxySQLBinding                                   |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"ProxySQLBinding","metadata":{"name":"proxysql","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"proxysql-ca","namespace":"demo"}}</code>                       |
| resources.gitopsKubedbComProxySQL                                             |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"ProxySQL","metadata":{"name":"proxysql","namespace":"demo"}}</code>                |
| resources.kubedbComProxySQL                                                   |             | <code>{"apiVersion":"kubedb.com/v1","kind":"ProxySQL","metadata":{"name":"proxysql","namespace":"demo"}}</code>                             |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"proxysql","namespace":"demo"}}</code>            |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"proxysql-auth","namespace":"demo"}}</code>                                     |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"proxysql-config","namespace":"demo"}}</code>                                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-proxysql-editor appscode/kubedbcom-proxysql-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-proxysql-editor appscode/kubedbcom-proxysql-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
