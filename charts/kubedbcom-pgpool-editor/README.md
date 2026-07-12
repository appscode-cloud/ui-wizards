# Pgpool Editor

[Pgpool Editor by AppsCode](https://appscode.com) - Pgpool Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-pgpool-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-pgpool-editor appscode/kubedbcom-pgpool-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a Pgpool Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-pgpool-editor`:

```bash
$ helm upgrade -i kubedbcom-pgpool-editor appscode/kubedbcom-pgpool-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a Pgpool Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-pgpool-editor`:

```bash
$ helm uninstall kubedbcom-pgpool-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-pgpool-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                 Default                                                                 |
|-------------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                         |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                         |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                    |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                    |
| form.alert.groups.database.rules.pgpoolBackendErrorMessageCount.duration      |             | <code>0m</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolBackendErrorMessageCount.enabled       |             | <code>true</code>                                                                                                                       |
| form.alert.groups.database.rules.pgpoolBackendErrorMessageCount.severity      |             | <code>critical</code>                                                                                                                   |
| form.alert.groups.database.rules.pgpoolBackendErrorMessageCount.val           |             | <code>10</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolBackendFatalMessageCount.duration      |             | <code>0m</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolBackendFatalMessageCount.enabled       |             | <code>true</code>                                                                                                                       |
| form.alert.groups.database.rules.pgpoolBackendFatalMessageCount.severity      |             | <code>critical</code>                                                                                                                   |
| form.alert.groups.database.rules.pgpoolBackendFatalMessageCount.val           |             | <code>10</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolBackendPanicMessageCount.duration      |             | <code>0m</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolBackendPanicMessageCount.enabled       |             | <code>true</code>                                                                                                                       |
| form.alert.groups.database.rules.pgpoolBackendPanicMessageCount.severity      |             | <code>critical</code>                                                                                                                   |
| form.alert.groups.database.rules.pgpoolBackendPanicMessageCount.val           |             | <code>10</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolDown.duration                          |             | <code>0m</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolDown.enabled                           |             | <code>true</code>                                                                                                                       |
| form.alert.groups.database.rules.pgpoolDown.severity                          |             | <code>critical</code>                                                                                                                   |
| form.alert.groups.database.rules.pgpoolExporterLastScrapeError.duration       |             | <code>0m</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolExporterLastScrapeError.enabled        |             | <code>true</code>                                                                                                                       |
| form.alert.groups.database.rules.pgpoolExporterLastScrapeError.severity       |             | <code>warning</code>                                                                                                                    |
| form.alert.groups.database.rules.pgpoolLowCacheMemory.duration                |             | <code>1m</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolLowCacheMemory.enabled                 |             | <code>true</code>                                                                                                                       |
| form.alert.groups.database.rules.pgpoolLowCacheMemory.severity                |             | <code>warning</code>                                                                                                                    |
| form.alert.groups.database.rules.pgpoolLowCacheMemory.val                     |             | <code>100</code>                                                                                                                        |
| form.alert.groups.database.rules.pgpoolPostgresHealthCheckFailure.duration    |             | <code>0m</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolPostgresHealthCheckFailure.enabled     |             | <code>true</code>                                                                                                                       |
| form.alert.groups.database.rules.pgpoolPostgresHealthCheckFailure.severity    |             | <code>critical</code>                                                                                                                   |
| form.alert.groups.database.rules.pgpoolPostgresHealthCheckFailure.val         |             | <code>10</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolTooManyConnections.duration            |             | <code>1m</code>                                                                                                                         |
| form.alert.groups.database.rules.pgpoolTooManyConnections.enabled             |             | <code>true</code>                                                                                                                       |
| form.alert.groups.database.rules.pgpoolTooManyConnections.severity            |             | <code>warning</code>                                                                                                                    |
| form.alert.groups.database.rules.pgpoolTooManyConnections.val                 |             | <code>0.1</code>                                                                                                                        |
| form.alert.groups.opsManager.enabled                                          |             | <code>warning</code>                                                                                                                    |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                  |             | <code>0m</code>                                                                                                                         |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                   |             | <code>true</code>                                                                                                                       |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                  |             | <code>critical</code>                                                                                                                   |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration              |             | <code>0m</code>                                                                                                                         |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled               |             | <code>true</code>                                                                                                                       |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity              |             | <code>info</code>                                                                                                                       |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration |             | <code>30m</code>                                                                                                                        |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled  |             | <code>true</code>                                                                                                                       |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity |             | <code>critical</code>                                                                                                                   |
| form.alert.groups.provisioner.enabled                                         |             | <code>warning</code>                                                                                                                    |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                 |             | <code>15m</code>                                                                                                                        |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                  |             | <code>true</code>                                                                                                                       |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                 |             | <code>warning</code>                                                                                                                    |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                 |             | <code>1m</code>                                                                                                                         |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                  |             | <code>true</code>                                                                                                                       |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                 |             | <code>critical</code>                                                                                                                   |
| form.alert.labels.release                                                     |             | <code>prometheus</code>                                                                                                                 |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                 |
| metadata.resource.version                                                     |             | <code>v1alpha2</code>                                                                                                                   |
| metadata.resource.name                                                        |             | <code>pgpools</code>                                                                                                                    |
| metadata.resource.kind                                                        |             | <code>Pgpool</code>                                                                                                                     |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                 |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                               |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                    |
| resources.autoscalingKubedbComPgpoolAutoscaler                                |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"PgpoolAutoscaler","metadata":{"name":"pgpool","namespace":"demo"}}</code> |
| resources.catalogAppscodeComPgpoolBinding                                     |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"PgpoolBinding","metadata":{"name":"pgpool","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"pgpool-ca","namespace":"demo"}}</code>                     |
| resources.gitopsKubedbComPgpool                                               |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"Pgpool","metadata":{"name":"pgpool","namespace":"pool"}}</code>                |
| resources.kubedbComPgpool                                                     |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"Pgpool","metadata":{"name":"pgpool","namespace":"pool"}}</code>                       |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"pgpool","namespace":"demo"}}</code>          |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"pgpool-auth","namespace":"demo"}}</code>                                   |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"pgpool-config","namespace":"demo"}}</code>                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-pgpool-editor appscode/kubedbcom-pgpool-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-pgpool-editor appscode/kubedbcom-pgpool-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
