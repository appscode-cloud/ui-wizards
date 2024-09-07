# ClusterChartPresets Editor UI Options

[ClusterChartPresets Editor UI Options](https://byte.builders) - ClusterChartPresets Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options --version=v0.5.0
$ helm upgrade -i chartsxhelmdev-clusterchartpreset-editor-options bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options -n kube-system --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys A ClusterChartPresets Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `chartsxhelmdev-clusterchartpreset-editor-options`:

```bash
$ helm upgrade -i chartsxhelmdev-clusterchartpreset-editor-options bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options -n kube-system --create-namespace --version=v0.5.0
```

The command deploys A ClusterChartPresets Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `chartsxhelmdev-clusterchartpreset-editor-options`:

```bash
$ helm uninstall chartsxhelmdev-clusterchartpreset-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `chartsxhelmdev-clusterchartpreset-editor-options` chart and their default values.

|                    Parameter                     |                                             Description                                              |                          Default                          |
|--------------------------------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| metadata.resource.group                          |                                                                                                      | <code>charts.x-helm.dev</code>                            |
| metadata.resource.kind                           |                                                                                                      | <code>ClusterChartPreset</code>                           |
| metadata.resource.name                           |                                                                                                      | <code>clusterchartpresets</code>                          |
| metadata.resource.scope                          |                                                                                                      | <code>Cluster</code>                                      |
| metadata.resource.version                        |                                                                                                      | <code>v1alpha1</code>                                     |
| metadata.release.name                            | Release name                                                                                         | <code>""</code>                                           |
| metadata.release.namespace                       | Release namespace                                                                                    | <code>""</code>                                           |
| spec.admin.deployment.default                    |                                                                                                      | <code>Shared</code>                                       |
| spec.admin.deployment.toggle                     |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.default                   |                                                                                                      | <code>"GeneralPurpose"</code>                             |
| spec.admin.clusterTier.toggle                    |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.nodeTopology.available    |                                                                                                      | <code>[]</code>                                           |
| spec.admin.clusterTier.nodeTopology.default      |                                                                                                      | <code>""</code>                                           |
| spec.admin.clusterTier.nodeTopology.toggle       |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterTier.placement.available       |                                                                                                      | <code>[]</code>                                           |
| spec.admin.clusterTier.placement.default         |                                                                                                      | <code>""</code>                                           |
| spec.admin.clusterTier.placement.toggle          |                                                                                                      | <code>true</code>                                         |
| spec.admin.showPreview                           |                                                                                                      | <code>false</code>                                        |
| spec.admin.databases.MongoDB.versions.available  |                                                                                                      | <code>[]</code>                                           |
| spec.admin.databases.MongoDB.versions.default    |                                                                                                      | <code>""</code>                                           |
| spec.admin.databases.MongoDB.versions.toggle     |                                                                                                      | <code>true</code>                                         |
| spec.admin.databases.MySQL.versions.available    |                                                                                                      | <code>[]</code>                                           |
| spec.admin.databases.MySQL.versions.default      |                                                                                                      | <code>""</code>                                           |
| spec.admin.databases.MySQL.versions.toggle       |                                                                                                      | <code>true</code>                                         |
| spec.admin.databases.Postgres.versions.available |                                                                                                      | <code>[]</code>                                           |
| spec.admin.databases.Postgres.versions.default   |                                                                                                      | <code>""</code>                                           |
| spec.admin.databases.Postgres.versions.toggle    |                                                                                                      | <code>true</code>                                         |
| spec.admin.storageClasses.available              |                                                                                                      | <code>[]</code>                                           |
| spec.admin.storageClasses.default                |                                                                                                      | <code>""</code>                                           |
| spec.admin.storageClasses.toggle                 |                                                                                                      | <code>true</code>                                         |
| spec.admin.tls.default                           |                                                                                                      | <code>false</code>                                        |
| spec.admin.tls.toggle                            |                                                                                                      | <code>true</code>                                         |
| spec.admin.clusterIssuers.available              |                                                                                                      | <code>[]</code>                                           |
| spec.admin.clusterIssuers.default                |                                                                                                      | <code>""</code>                                           |
| spec.admin.clusterIssuers.toggle                 |                                                                                                      | <code>true</code>                                         |
| spec.admin.expose.default                        |                                                                                                      | <code>true</code>                                         |
| spec.admin.expose.toggle                         |                                                                                                      | <code>true</code>                                         |
| spec.admin.monitoring.agent                      | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin") | <code>prometheus.io/operator</code>                       |
| spec.admin.monitoring.exporter.resources         |                                                                                                      | <code>{"requests":{"cpu":"100m","memory":"128Mi"}}</code> |
| spec.admin.monitoring.toggle                     |                                                                                                      | <code>true</code>                                         |
| spec.admin.alert.toggle                          |                                                                                                      | <code>true</code>                                         |
| spec.admin.archiver.toggle                       |                                                                                                      | <code>true</code>                                         |
| spec.admin.archiver.default                      |                                                                                                      | <code>false</code>                                        |
| spec.backup.tool                                 |                                                                                                      | <code>KubeStash</code>                                    |
| spec.backup.kubestash.encryptionSecret.name      |                                                                                                      | <code></code>                                             |
| spec.backup.kubestash.encryptionSecret.namespace |                                                                                                      | <code></code>                                             |
| spec.backup.kubestash.retentionPolicy.name       |                                                                                                      | <code></code>                                             |
| spec.backup.kubestash.retentionPolicy.namespace  |                                                                                                      | <code></code>                                             |
| spec.backup.kubestash.schedule                   |                                                                                                      | <code>'*/30 * * * *'</code>                               |
| spec.backup.kubestash.storageRef.name            |                                                                                                      | <code></code>                                             |
| spec.backup.kubestash.storageRef.namespace       |                                                                                                      | <code></code>                                             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i chartsxhelmdev-clusterchartpreset-editor-options bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options -n kube-system --create-namespace --version=v0.5.0 --set metadata.resource.group=charts.x-helm.dev
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i chartsxhelmdev-clusterchartpreset-editor-options bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options -n kube-system --create-namespace --version=v0.5.0 --values values.yaml
```
