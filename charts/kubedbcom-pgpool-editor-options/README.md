# Pgpool Editor UI Options

[Pgpool Editor UI Options](https://byte.builders) - Pgpool Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-pgpool-editor-options --version=v0.5.0
$ helm upgrade -i kubedbcom-pgpool-editor-options bytebuilders-ui/kubedbcom-pgpool-editor-options -n kube-system --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys a Pgpool Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-pgpool-editor-options`:

```bash
$ helm upgrade -i kubedbcom-pgpool-editor-options bytebuilders-ui/kubedbcom-pgpool-editor-options -n kube-system --create-namespace --version=v0.5.0
```

The command deploys a Pgpool Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-pgpool-editor-options`:

```bash
$ helm uninstall kubedbcom-pgpool-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-pgpool-editor-options` chart and their default values.

|                                 Parameter                                  |                                             Description                                              |                          Default                          |
|----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| metadata.resource.group                                                    |                                                                                                      | <code>kubedb.com</code>                                   |
| metadata.resource.kind                                                     |                                                                                                      | <code>Pgpool</code>                                       |
| metadata.resource.name                                                     |                                                                                                      | <code>pgpools</code>                                      |
| metadata.resource.scope                                                    |                                                                                                      | <code>Namespaced</code>                                   |
| metadata.resource.version                                                  |                                                                                                      | <code>v1alpha2</code>                                     |
| metadata.release.name                                                      | Release name                                                                                         | <code>""</code>                                           |
| metadata.release.namespace                                                 | Release namespace                                                                                    | <code>""</code>                                           |
| spec.annotations                                                           | Annotations to add to the database custom resource                                                   | <code>{}</code>                                           |
| spec.labels                                                                | Labels to add to all the template objects                                                            | <code>{}</code>                                           |
| spec.mode                                                                  | Standalone, Replicaset                                                                               | <code>Replicaset</code>                                   |
| spec.replicas                                                              |                                                                                                      | <code>3</code>                                            |
| spec.postgresRef.name                                                      |                                                                                                      | <code>""</code>                                           |
| spec.postgresRef.namespace                                                 |                                                                                                      | <code>""</code>                                           |
| spec.syncUsers                                                             |                                                                                                      | <code>true</code>                                         |
| spec.deletionPolicy                                                        |                                                                                                      | <code>WipeOut</code>                                      |
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
| spec.admin.databases.Pgpool.versions.default                               |                                                                                                      | <code>"4.4.5"</code>                                      |
| spec.admin.databases.Pgpool.versions.toggle                                |                                                                                                      | <code>true</code>                                         |
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
| form.alert.labels                                                          | # Labels for default rules                                                                           | <code>{"release":"prometheus"}</code>                     |
| form.alert.annotations                                                     | # Annotations for default rules                                                                      | <code>{}</code>                                           |
| form.alert.additionalRuleLabels                                            | # Additional labels for PrometheusRule alerts                                                        | <code>{}</code>                                           |
| form.alert.groups.database.enabled                                         |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.pgpoolTooManyConnections.enabled          |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.pgpoolTooManyConnections.val              |                                                                                                      | <code>.1 # 10%</code>                                     |
| form.alert.groups.database.rules.pgpoolTooManyConnections.duration         |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.pgpoolTooManyConnections.severity         |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.pgpoolExporterLastScrapeError.enabled     |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.pgpoolExporterLastScrapeError.duration    |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.pgpoolExporterLastScrapeError.severity    |                                                                                                      | <code>warning</code>                                      |
| form.alert.groups.database.rules.pgpoolDown.enabled                        |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.pgpoolDown.duration                       |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.pgpoolDown.severity                       |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.pgpoolPostgresHealthCheckFailure.enabled  |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.pgpoolPostgresHealthCheckFailure.val      |                                                                                                      | <code>10</code>                                           |
| form.alert.groups.database.rules.pgpoolPostgresHealthCheckFailure.duration |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.pgpoolPostgresHealthCheckFailure.severity |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.pgpoolBackendPanicMessageCount.enabled    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.pgpoolBackendPanicMessageCount.val        |                                                                                                      | <code>10</code>                                           |
| form.alert.groups.database.rules.pgpoolBackendPanicMessageCount.duration   |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.pgpoolBackendPanicMessageCount.severity   |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.pgpoolBackendFatalMessageCount.enabled    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.pgpoolBackendFatalMessageCount.val        |                                                                                                      | <code>10</code>                                           |
| form.alert.groups.database.rules.pgpoolBackendFatalMessageCount.duration   |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.pgpoolBackendFatalMessageCount.severity   |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.pgpoolBackendErrorMessageCount.enabled    |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.pgpoolBackendErrorMessageCount.val        |                                                                                                      | <code>10</code>                                           |
| form.alert.groups.database.rules.pgpoolBackendErrorMessageCount.duration   |                                                                                                      | <code>"0m"</code>                                         |
| form.alert.groups.database.rules.pgpoolBackendErrorMessageCount.severity   |                                                                                                      | <code>critical</code>                                     |
| form.alert.groups.database.rules.pgpoolLowCacheMemory.enabled              |                                                                                                      | <code>true</code>                                         |
| form.alert.groups.database.rules.pgpoolLowCacheMemory.val                  |                                                                                                      | <code>100 # 10mb</code>                                   |
| form.alert.groups.database.rules.pgpoolLowCacheMemory.duration             |                                                                                                      | <code>"1m"</code>                                         |
| form.alert.groups.database.rules.pgpoolLowCacheMemory.severity             |                                                                                                      | <code>warning</code>                                      |
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
$ helm upgrade -i kubedbcom-pgpool-editor-options bytebuilders-ui/kubedbcom-pgpool-editor-options -n kube-system --create-namespace --version=v0.5.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-pgpool-editor-options bytebuilders-ui/kubedbcom-pgpool-editor-options -n kube-system --create-namespace --version=v0.5.0 --values values.yaml
```
