# Memcached Editor UI Options

[Memcached Editor UI Options](https://byte.builders) - Memcached Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-memcached-editor-options --version=v0.13.0
$ helm upgrade -i kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --create-namespace --version=v0.13.0
```

## Introduction

This chart deploys a Memcached Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-memcached-editor-options`:

```bash
$ helm upgrade -i kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --create-namespace --version=v0.13.0
```

The command deploys a Memcached Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-memcached-editor-options`:

```bash
$ helm uninstall kubedbcom-memcached-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-memcached-editor-options` chart and their default values.

|                     Parameter                     |                                                                                Description                                                                                |                          Default                          |
|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| metadata.resource.group                           |                                                                                                                                                                           | <code>kubedb.com</code>                                   |
| metadata.resource.kind                            |                                                                                                                                                                           | <code>Memcached</code>                                    |
| metadata.resource.name                            |                                                                                                                                                                           | <code>memcacheds</code>                                   |
| metadata.resource.scope                           |                                                                                                                                                                           | <code>Namespaced</code>                                   |
| metadata.resource.version                         |                                                                                                                                                                           | <code>v1alpha2</code>                                     |
| metadata.release.name                             | Release name                                                                                                                                                              | <code>""</code>                                           |
| metadata.release.namespace                        | Release namespace                                                                                                                                                         | <code>""</code>                                           |
| spec.annotations                                  | Annotations to add to the database custom resource                                                                                                                        | <code>{}</code>                                           |
| spec.labels                                       | Labels to add to all the template objects                                                                                                                                 | <code>{}</code>                                           |
| spec.mode                                         | Standalone, Replicaset                                                                                                                                                    | <code>Replicaset</code>                                   |
| spec.replicas                                     |                                                                                                                                                                           | <code>3</code>                                            |
| spec.deletionPolicy                               |                                                                                                                                                                           | <code>WipeOut</code>                                      |
| spec.podResources.machine                         |                                                                                                                                                                           | <code>""</code>                                           |
| spec.podResources.resources.requests.cpu          |                                                                                                                                                                           | <code>500m</code>                                         |
| spec.podResources.resources.requests.memory       |                                                                                                                                                                           | <code>1Gi</code>                                          |
| spec.authSecret.name                              |                                                                                                                                                                           | <code>""</code>                                           |
| spec.authSecret.password                          |                                                                                                                                                                           | <code>""</code>                                           |
| spec.configuration                                |                                                                                                                                                                           | <code>""</code>                                           |
| spec.openshift.securityContext.runAsUser          |                                                                                                                                                                           | <code></code>                                             |
| spec.admin.deployment.default                     |                                                                                                                                                                           | <code>Shared</code>                                       |
| spec.admin.deployment.toggle                      |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.clusterTier.default                    |                                                                                                                                                                           | <code>"GeneralPurpose"</code>                             |
| spec.admin.clusterTier.toggle                     |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.clusterTier.nodeTopology.available     |                                                                                                                                                                           | <code>[]</code>                                           |
| spec.admin.clusterTier.nodeTopology.default       |                                                                                                                                                                           | <code>""</code>                                           |
| spec.admin.clusterTier.nodeTopology.toggle        |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.clusterTier.placement.available        |                                                                                                                                                                           | <code>[]</code>                                           |
| spec.admin.clusterTier.placement.default          |                                                                                                                                                                           | <code>""</code>                                           |
| spec.admin.clusterTier.placement.toggle           |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.showPreview                            |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.leftPanel.showInsights                 |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.leftPanel.showVaultInfo                |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.leftPanel.showOperations               |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.leftPanel.showBackup                   |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.leftPanel.showBackupLegacy             |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.leftPanel.showSecurity                 |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.nodeSelector                           |                                                                                                                                                                           | <code>{}</code>                                           |
| spec.admin.tolerations                            |                                                                                                                                                                           | <code>[]</code>                                           |
| spec.admin.databases.Memcached.versions.available |                                                                                                                                                                           | <code>[]</code>                                           |
| spec.admin.databases.Memcached.versions.default   |                                                                                                                                                                           | <code>""</code>                                           |
| spec.admin.databases.Memcached.versions.toggle    |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.databases.Memcached.mode.default       |                                                                                                                                                                           | <code>"Replicaset"</code>                                 |
| spec.admin.databases.Memcached.mode.toggle        |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.storageClasses.available               |                                                                                                                                                                           | <code>[]</code>                                           |
| spec.admin.storageClasses.default                 |                                                                                                                                                                           | <code>""</code>                                           |
| spec.admin.storageClasses.toggle                  |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.tls.default                            |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.tls.toggle                             |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.clusterIssuers.available               |                                                                                                                                                                           | <code>[]</code>                                           |
| spec.admin.clusterIssuers.default                 |                                                                                                                                                                           | <code>""</code>                                           |
| spec.admin.clusterIssuers.toggle                  |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.expose.default                         |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.expose.toggle                          |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.monitoring.agent                       | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin")                                                                      | <code>prometheus.io/operator</code>                       |
| spec.admin.monitoring.exporter.resources          |                                                                                                                                                                           | <code>{"requests":{"cpu":"100m","memory":"128Mi"}}</code> |
| spec.admin.monitoring.toggle                      |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.alerts.toggle                          |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.deletionPolicy.default                 |                                                                                                                                                                           | <code>WipeOut</code>                                      |
| spec.admin.deletionPolicy.toggle                  |                                                                                                                                                                           | <code>true</code>                                         |
| spec.admin.backup.enable.default                  |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.backup.enable.toggle                   |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.backup.by                              |                                                                                                                                                                           | <code>BackupConfiguration</code>                          |
| spec.admin.archiver.enable.default                |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.archiver.enable.toggle                 |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.pointInTimeRecovery.default            |                                                                                                                                                                           | <code>false</code>                                        |
| spec.admin.pointInTimeRecovery.toggle             |                                                                                                                                                                           | <code>false</code>                                        |
| spec.backup.tool                                  |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.toggle                                |                                                                                                                                                                           | <code>true</code>                                         |
| spec.backup.kubestash.schedule                    |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.storageRef.name             |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.storageRef.namespace        |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.retentionPolicy.name        |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.retentionPolicy.namespace   |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.encryptionSecret.name       |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.encryptionSecret.namespace  |                                                                                                                                                                           | <code>""</code>                                           |
| spec.monitoring.serviceMonitor.labels             | Specify the labels for ServiceMonitor. Prometheus crd will select ServiceMonitor using these labels. Only usable when monitoring agent is `prometheus.io/webhook server`. | <code>{}</code>                                           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --create-namespace --version=v0.13.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --create-namespace --version=v0.13.0 --values values.yaml
```
