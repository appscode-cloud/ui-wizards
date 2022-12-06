# PgBouncer Editor UI Options

[PgBouncer Editor UI Options](https://byte.builders) - PgBouncer Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-pgbouncer-editor-options --version=v0.4.13
$ helm upgrade -i kubedbcom-pgbouncer-editor-options bytebuilders-ui/kubedbcom-pgbouncer-editor-options -n kube-system --create-namespace --version=v0.4.13
```

## Introduction

This chart deploys a PgBouncer Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-pgbouncer-editor-options`:

```bash
$ helm upgrade -i kubedbcom-pgbouncer-editor-options bytebuilders-ui/kubedbcom-pgbouncer-editor-options -n kube-system --create-namespace --version=v0.4.13
```

The command deploys a PgBouncer Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-pgbouncer-editor-options`:

```bash
$ helm uninstall kubedbcom-pgbouncer-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-pgbouncer-editor-options` chart and their default values.

|                                   Parameter                                   |                                                                                Description                                                                                |                     Default                      |
|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| metadata.resource.group                                                       |                                                                                                                                                                           | <code>kubedb.com</code>                          |
| metadata.resource.kind                                                        |                                                                                                                                                                           | <code>PgBouncer</code>                            |
| metadata.resource.name                                                        |                                                                                                                                                                           | <code>pgbouncers</code>                           |
| metadata.resource.scope                                                       |                                                                                                                                                                           | <code>Namespaced</code>                          |
| metadata.resource.version                                                     |                                                                                                                                                                           | <code>v1alpha2</code>                            |
| metadata.release.name                                                         | Release name                                                                                                                                                              | <code>""</code>                                  |
| metadata.release.namespace                                                    | Release namespace                                                                                                                                                         | <code>""</code>                                  |
| spec.version                                                                  | List options                                                                                                                                                              | <code>2.3.2-debian</code>                        |
| spec.annotations                                                              | Annotations to add to the database custom resource                                                                                                                        | <code>{}</code>                                  |
| spec.labels                                                                   | Labels to add to all the template objects                                                                                                                                 | <code>{}</code>                                  |
| spec.mode                                                                     | Standalone, Cluster                                                                                                                                                       | <code>Cluster</code>                             |
| spec.terminationPolicy                                                        |                                                                                                                                                                           | <code>WipeOut</code>                             |
| spec.machine                                                                  |                                                                                                                                                                           | <code>""</code>                                  |
| spec.resources.limits.cpu                                                     |                                                                                                                                                                           | <code>500m</code>                                |
| spec.resources.limits.memory                                                  |                                                                                                                                                                           | <code>1Gi</code>                                 |
| spec.authSecret.name                                                          |                                                                                                                                                                           | <code>""</code>                                  |
| spec.authSecret.password                                                      |                                                                                                                                                                           | <code>""</code>                                  |
| spec.monitoring.agent                                                         | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin")                                                                      | <code>prometheus.io/operator</code>              |
| spec.monitoring.serviceMonitor.labels                                         | Specify the labels for ServiceMonitor. Prometheus crd will select ServiceMonitor using these labels. Only usable when monitoring agent is `prometheus.io/webhook server`. | <code>{}</code>                                  |
| spec.syncUsers                                                                |                                                                                                                                                                           | <code>false</code>                               |
| spec.backend                                                                  |                                                                                                                                                                           | <code>""</code>                                  |
| form.alert.enabled                                                            | # Enable PrometheusRule alerts                                                                                                                                            | <code>true</code>                                |
| form.alert.labels                                                             | # Labels for default rules                                                                                                                                                | <code>{"release":"kube-prometheus-stack"}</code> |
| form.alert.annotations                                                        | # Annotations for default rules                                                                                                                                           | <code>{}</code>                                  |
| form.alert.additionalRuleLabels                                               | # Additional labels for PrometheusRule alerts                                                                                                                             | <code>{}</code>                                  |
| form.alert.groups.database.enabled                                            |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerInstanceDown.enabled                 |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerInstanceDown.duration                |                                                                                                                                                                           | <code>"0m"</code>                                |
| form.alert.groups.database.rules.pgBouncerInstanceDown.severity                |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.database.rules.pgBouncerServiceDown.enabled                  |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerServiceDown.duration                 |                                                                                                                                                                           | <code>"0m"</code>                                |
| form.alert.groups.database.rules.pgBouncerServiceDown.severity                 |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.database.rules.pgBouncerTooManyConnections.enabled           |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerTooManyConnections.duration          |                                                                                                                                                                           | <code>"2m"</code>                                |
| form.alert.groups.database.rules.pgBouncerTooManyConnections.val               |                                                                                                                                                                           | <code>80</code>                                  |
| form.alert.groups.database.rules.pgBouncerTooManyConnections.severity          |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.pgBouncerHighThreadsRunning.enabled           |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerHighThreadsRunning.duration          |                                                                                                                                                                           | <code>"2m"</code>                                |
| form.alert.groups.database.rules.pgBouncerHighThreadsRunning.val               |                                                                                                                                                                           | <code>60</code>                                  |
| form.alert.groups.database.rules.pgBouncerHighThreadsRunning.severity          |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.pgBouncerSlowQueries.enabled                  |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerSlowQueries.duration                 |                                                                                                                                                                           | <code>"2m"</code>                                |
| form.alert.groups.database.rules.pgBouncerSlowQueries.severity                 |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.pgBouncerRestarted.enabled                    |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerRestarted.duration                   |                                                                                                                                                                           | <code>"0m"</code>                                |
| form.alert.groups.database.rules.pgBouncerRestarted.val                        |                                                                                                                                                                           | <code>60</code>                                  |
| form.alert.groups.database.rules.pgBouncerRestarted.severity                   |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.pgBouncerHighQPS.enabled                      |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerHighQPS.duration                     |                                                                                                                                                                           | <code>"0m"</code>                                |
| form.alert.groups.database.rules.pgBouncerHighQPS.val                          |                                                                                                                                                                           | <code>1000</code>                                |
| form.alert.groups.database.rules.pgBouncerHighQPS.severity                     |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.database.rules.pgBouncerHighIncomingBytes.enabled            |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerHighIncomingBytes.duration           |                                                                                                                                                                           | <code>"0m"</code>                                |
| form.alert.groups.database.rules.pgBouncerHighIncomingBytes.val                |                                                                                                                                                                           | <code>1048576 # 1MB</code>                       |
| form.alert.groups.database.rules.pgBouncerHighIncomingBytes.severity           |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.database.rules.pgBouncerHighOutgoingBytes.enabled            |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.pgBouncerHighOutgoingBytes.duration           |                                                                                                                                                                           | <code>"0m"</code>                                |
| form.alert.groups.database.rules.pgBouncerHighOutgoingBytes.val                |                                                                                                                                                                           | <code>1048576 # 1MB</code>                       |
| form.alert.groups.database.rules.pgBouncerHighOutgoingBytes.severity           |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.cluster.enabled                                             |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.cluster.rules.pgbouncerCLusterSyncFailure.enabled            |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.cluster.rules.pgbouncerCLusterSyncFailure.val                |                                                                                                                                                                           | <code>0.1</code>                                 |
| form.alert.groups.cluster.rules.pgbouncerCLusterSyncFailure.duration           |                                                                                                                                                                           | <code>"5m"</code>                                |
| form.alert.groups.cluster.rules.pgbouncerCLusterSyncFailure.severity           |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.provisioner.enabled                                         |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                  |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                 |                                                                                                                                                                           | <code>"1m"</code>                                |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                 |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                  |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                 |                                                                                                                                                                           | <code>"15m"</code>                               |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                 |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.opsManager.enabled                                          |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.enabled               |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.duration              |                                                                                                                                                                           | <code>"0m"</code>                                |
| form.alert.groups.opsManager.rules.opsRequestOnProgress.severity              |                                                                                                                                                                           | <code>info</code>                                |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.enabled  |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.duration |                                                                                                                                                                           | <code>"30m"</code>                               |
| form.alert.groups.opsManager.rules.opsRequestStatusProgressingToLong.severity |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.opsManager.rules.opsRequestFailed.enabled                   |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.opsManager.rules.opsRequestFailed.duration                  |                                                                                                                                                                           | <code>"0m"</code>                                |
| form.alert.groups.opsManager.rules.opsRequestFailed.severity                  |                                                                                                                                                                           | <code>critical</code>                            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-pgbouncer-editor-options bytebuilders-ui/kubedbcom-pgbouncer-editor-options -n kube-system --create-namespace --version=v0.4.13 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-pgbouncer-editor-options bytebuilders-ui/kubedbcom-pgbouncer-editor-options -n kube-system --create-namespace --version=v0.4.13 --values values.yaml
```
