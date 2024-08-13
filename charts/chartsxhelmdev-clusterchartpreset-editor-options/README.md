# ClusterChartPresets Editor UI Options

[ClusterChartPresets Editor UI Options](https://byte.builders) - ClusterChartPresets Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options --version=v0.4.21
$ helm upgrade -i chartsxhelmdev-clusterchartpreset-editor-options bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options -n kube-system --create-namespace --version=v0.4.21
```

## Introduction

This chart deploys A ClusterChartPresets Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `chartsxhelmdev-clusterchartpreset-editor-options`:

```bash
$ helm upgrade -i chartsxhelmdev-clusterchartpreset-editor-options bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options -n kube-system --create-namespace --version=v0.4.21
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

|                               Parameter                                |                                                                                Description                                                                                |                          Default                          |
|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| metadata.resource.group                                                |                                                                                                                                                                           | <code>charts.x-helm.dev</code>                            |
| metadata.resource.kind                                                 |                                                                                                                                                                           | <code>ClusterChartPreset</code>                           |
| metadata.resource.name                                                 |                                                                                                                                                                           | <code>clusterchartpresets</code>                          |
| metadata.resource.scope                                                |                                                                                                                                                                           | <code>Cluster</code>                                      |
| metadata.resource.version                                              |                                                                                                                                                                           | <code>v1alpha1</code>                                     |
| metadata.release.name                                                  | Release name                                                                                                                                                              | <code>""</code>                                           |
| metadata.release.namespace                                             | Release namespace                                                                                                                                                         | <code>""</code>                                           |
| spec.kubeDB.deployment.default                                         |                                                                                                                                                                           | <code>Dedicated</code>                                    |
| spec.kubeDB.deployment.toggle                                          |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.clusterTier.default                                        |                                                                                                                                                                           | <code>"GeneralPurpose"</code>                             |
| spec.kubeDB.clusterTier.toggle                                         |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.clusterTier.nodeTopology.default                           |                                                                                                                                                                           | <code>"standard-bsv2-family"</code>                       |
| spec.kubeDB.clusterTier.nodeTopology.toggle                            |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.clusterTier.placement.default                              |                                                                                                                                                                           | <code>"default"</code>                                    |
| spec.kubeDB.clusterTier.placement.toggle                               |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.databases.MongoDB.versions.default                         |                                                                                                                                                                           | <code>"6.0.12"</code>                                     |
| spec.kubeDB.databases.MongoDB.versions.toggle                          |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.databases.MySQL.versions.default                           |                                                                                                                                                                           | <code>"8.0.35"</code>                                     |
| spec.kubeDB.databases.MySQL.versions.toggle                            |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.databases.Postgres.versions.default                        |                                                                                                                                                                           | <code>"15.5"</code>                                       |
| spec.kubeDB.databases.Postgres.versions.toggle                         |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.storageClasses.default                                     |                                                                                                                                                                           | <code>"default"</code>                                    |
| spec.kubeDB.storageClasses.toggle                                      |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.tls.default                                                |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.tls.toggle                                                 |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.clusterIssuers.default                                     |                                                                                                                                                                           | <code>"cluster-issuer"</code>                             |
| spec.kubeDB.clusterIssuers.toggle                                      |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.webUI.default                                              |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.webUI.toggle                                               |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.monitoring.agent                                           | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin")                                                                      | <code>prometheus.io/operator</code>                       |
| spec.kubeDB.monitoring.exporter.resources                              |                                                                                                                                                                           | <code>{"requests":{"cpu":"100m","memory":"128Mi"}}</code> |
| spec.kubeDB.monitoring.serviceMonitor.labels                           | Specify the labels for ServiceMonitor. Prometheus crd will select ServiceMonitor using these labels. Only usable when monitoring agent is `prometheus.io/webhook server`. | <code>{}</code>                                           |
| spec.kubeDB.monitoring.toggle                                          |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.alerts.toggle                                              |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.archiver.toggle                                            |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.archiver.default                                           |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.backup.tool                                                |                                                                                                                                                                           | <code>KubeStash</code>                                    |
| spec.kubeDB.backup.toggle                                              |                                                                                                                                                                           | <code>true</code>                                         |
| spec.kubeDB.backup.kubestash.schedule                                  |                                                                                                                                                                           | <code>"0 */2 * * *"</code>                                |
| spec.kubeDB.backup.kubestash.storageRef.name                           |                                                                                                                                                                           | <code>default</code>                                      |
| spec.kubeDB.backup.kubestash.storageRef.namespace                      |                                                                                                                                                                           | <code>stash</code>                                        |
| spec.kubeDB.backup.kubestash.retentionPolicy.name                      |                                                                                                                                                                           | <code>"keep-1mo"</code>                                   |
| spec.kubeDB.backup.kubestash.retentionPolicy.namespace                 |                                                                                                                                                                           | <code>stash</code>                                        |
| spec.kubeDB.backup.kubestash.encryptionSecret.name                     |                                                                                                                                                                           | <code>default-encryption-secret</code>                    |
| spec.kubeDB.backup.kubestash.encryptionSecret.namespace                |                                                                                                                                                                           | <code>stash</code>                                        |
| spec.monitoring                                                        |                                                                                                                                                                           | <code>{}</code>                                           |
| spec.backup.tool                                                       |                                                                                                                                                                           | <code>KubeStash</code>                                    |
| spec.backup.kubestash.backend.provider                                 |                                                                                                                                                                           | <code>s3</code>                                           |
| spec.backup.kubestash.backend.s3.auth.AWS_ACCESS_KEY_ID                |                                                                                                                                                                           | <code>34F9JI2JM8DOJC6NUPII</code>                         |
| spec.backup.kubestash.backend.s3.auth.AWS_SECRET_ACCESS_KEY            |                                                                                                                                                                           | <code></code>                                             |
| spec.backup.kubestash.backend.s3.spec.bucket                           |                                                                                                                                                                           | <code>arnob</code>                                        |
| spec.backup.kubestash.backend.s3.spec.endpoint                         |                                                                                                                                                                           | <code>us-east-1.linodeobjects.com</code>                  |
| spec.backup.kubestash.backend.s3.spec.insecureTLS                      |                                                                                                                                                                           | <code>false</code>                                        |
| spec.backup.kubestash.backend.s3.spec.prefix                           |                                                                                                                                                                           | <code>presets</code>                                      |
| spec.backup.kubestash.backend.s3.spec.region                           |                                                                                                                                                                           | <code>us-east-1</code>                                    |
| spec.backup.kubestash.backend.azure.spec.container                     |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.backend.azure.auth.AZURE_ACCOUNT_NAME            |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.backend.azure.auth.AZURE_ACCOUNT_KEY             |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.backend.gcs.spec.bucket                          |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.backend.gcs.auth.GOOGLE_PROJECT_ID               |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.backend.gcs.auth.GOOGLE_SERVICE_ACCOUNT_JSON_KEY |                                                                                                                                                                           | <code>""</code>                                           |
| spec.backup.kubestash.encryptionSecret                                 |                                                                                                                                                                           | <code>asdfg</code>                                        |
| spec.backup.kubestash.retentionPolicy                                  |                                                                                                                                                                           | <code>keep-1wk</code>                                     |
| spec.backup.kubestash.schedule                                         |                                                                                                                                                                           | <code>'*/30 * * * *'</code>                               |
| spec.backup.kubestash.storageSecret.create                             |                                                                                                                                                                           | <code>true</code>                                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i chartsxhelmdev-clusterchartpreset-editor-options bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options -n kube-system --create-namespace --version=v0.4.21 --set metadata.resource.group=charts.x-helm.dev
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i chartsxhelmdev-clusterchartpreset-editor-options bytebuilders-ui/chartsxhelmdev-clusterchartpreset-editor-options -n kube-system --create-namespace --version=v0.4.21 --values values.yaml
```
