# PgBouncer Editor

[PgBouncer Editor by AppsCode](https://appscode.com) - PgBouncer Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-pgbouncer-editor --version=v0.35.0
$ helm upgrade -i kubedbcom-pgbouncer-editor appscode/kubedbcom-pgbouncer-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a PgBouncer Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-pgbouncer-editor`:

```bash
$ helm upgrade -i kubedbcom-pgbouncer-editor appscode/kubedbcom-pgbouncer-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a PgBouncer Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-pgbouncer-editor`:

```bash
$ helm uninstall kubedbcom-pgbouncer-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-pgbouncer-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                    Default                                                                    |
|-------------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                               |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                               |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.pgbouncerDown.duration                       |             | <code>0m</code>                                                                                                                               |
| form.alert.groups.database.rules.pgbouncerDown.enabled                        |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.pgbouncerDown.severity                       |             | <code>critical</code>                                                                                                                         |
| form.alert.groups.database.rules.pgbouncerExporterLastScrapeError.duration    |             | <code>0m</code>                                                                                                                               |
| form.alert.groups.database.rules.pgbouncerExporterLastScrapeError.enabled     |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.pgbouncerExporterLastScrapeError.severity    |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.pgbouncerLogPoolerError.duration             |             | <code>0m</code>                                                                                                                               |
| form.alert.groups.database.rules.pgbouncerLogPoolerError.enabled              |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.pgbouncerLogPoolerError.severity             |             | <code>critical</code>                                                                                                                         |
| form.alert.groups.database.rules.pgbouncerLogPoolerError.val                  |             | <code>10</code>                                                                                                                               |
| form.alert.groups.database.rules.pgbouncerTooManyConnections.duration         |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.pgbouncerTooManyConnections.enabled          |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.pgbouncerTooManyConnections.severity         |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.pgbouncerTooManyConnections.val              |             | <code>70</code>                                                                                                                               |
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
| form.alert.labels.release                                                     |             | <code>prometheus</code>                                                                                                                       |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                       |
| metadata.resource.version                                                     |             | <code>v1</code>                                                                                                                               |
| metadata.resource.name                                                        |             | <code>pgbouncers</code>                                                                                                                       |
| metadata.resource.kind                                                        |             | <code>PgBouncer</code>                                                                                                                        |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                       |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                                     |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                          |
| resources.autoscalingKubedbComPgBouncerAutoscaler                             |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"PgBouncerAutoscaler","metadata":{"name":"pgbouncer","namespace":"demo"}}</code> |
| resources.catalogAppscodeComPgBouncerBinding                                  |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"PgBouncerBinding","metadata":{"name":"pgbouncer","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"pgbouncer-ca","namespace":"demo"}}</code>                        |
| resources.gitopsKubedbComPgBouncer                                            |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"PgBouncer","metadata":{"name":"pgbouncer","namespace":"demo"}}</code>                |
| resources.kubedbComPgBouncer                                                  |             | <code>{"apiVersion":"kubedb.com/v1","kind":"PgBouncer","metadata":{"name":"pgbouncer","namespace":"demo"}}</code>                             |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"pgbouncer","namespace":"demo"}}</code>             |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"pgbouncer-auth","namespace":"demo"}}</code>                                      |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"pgbouncer-config","namespace":"demo"}}</code>                                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-pgbouncer-editor appscode/kubedbcom-pgbouncer-editor -n default --create-namespace --version=v0.35.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-pgbouncer-editor appscode/kubedbcom-pgbouncer-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
