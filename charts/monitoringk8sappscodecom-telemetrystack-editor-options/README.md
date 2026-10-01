# TelemetryStack Editor UI Options

[TelemetryStack Editor UI Options](https://byte.builders) - TelemetryStack Editor UI Options

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/monitoringk8sappscodecom-telemetrystack-editor-options --version=v0.37.0-test
$ helm upgrade -i monitoringk8sappscodecom-telemetrystack-editor-options appscode/monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system --create-namespace --version=v0.37.0-test
```

## Introduction

This chart deploys a TelemetryStack Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `monitoringk8sappscodecom-telemetrystack-editor-options`:

```bash
$ helm upgrade -i monitoringk8sappscodecom-telemetrystack-editor-options appscode/monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system --create-namespace --version=v0.37.0-test
```

The command deploys a TelemetryStack Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `monitoringk8sappscodecom-telemetrystack-editor-options`:

```bash
$ helm uninstall monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `monitoringk8sappscodecom-telemetrystack-editor-options` chart and their default values.

|                                 Parameter                                 |                                                                 Description                                                                 |                 Default                  |
|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| metadata.resource.group                                                   |                                                                                                                                             | <code>monitoring.k8s.appscode.com</code> |
| metadata.resource.kind                                                    |                                                                                                                                             | <code>TelemetryStack</code>              |
| metadata.resource.name                                                    |                                                                                                                                             | <code>telemetrystacks</code>             |
| metadata.resource.scope                                                   |                                                                                                                                             | <code>Cluster</code>                     |
| metadata.resource.version                                                 |                                                                                                                                             | <code>v1alpha1</code>                    |
| metadata.release.name                                                     | Release name                                                                                                                                | <code>telemetry-stack</code>             |
| metadata.release.namespace                                                | Release namespace                                                                                                                           | <code>monitoring</code>                  |
| spec.metrics.backend                                                      | Thanos keeps the stack that exists today working untouched; the CRD defaults to it for the same reason.                                     | <code>Thanos</code>                      |
| spec.metrics.victoriaMetrics.deploymentMode                               |                                                                                                                                             | <code>Standalone</code>                  |
| spec.metrics.victoriaMetrics.version                                      |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.victoriaMetrics.defaultRetention                             |                                                                                                                                             | <code>30d</code>                         |
| spec.metrics.victoriaMetrics.retentionStrategy                            | PerTierInstance runs one instance per retention tier and needs no licence. RetentionFilters keeps a single instance and is enterprise only. | <code>PerTierInstance</code>             |
| spec.metrics.victoriaMetrics.license.secretName                           |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.victoriaMetrics.license.secretKey                            |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.victoriaMetrics.storage.size                                 |                                                                                                                                             | <code>10Gi</code>                        |
| spec.metrics.victoriaMetrics.storage.storageClassName                     |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.victoriaMetrics.cluster.replicationFactor                    |                                                                                                                                             | <code>2</code>                           |
| spec.metrics.victoriaMetrics.cluster.insertReplicas                       |                                                                                                                                             | <code>2</code>                           |
| spec.metrics.victoriaMetrics.cluster.selectReplicas                       |                                                                                                                                             | <code>2</code>                           |
| spec.metrics.victoriaMetrics.cluster.storageReplicas                      |                                                                                                                                             | <code>2</code>                           |
| spec.metrics.thanos.compact.storageSize                                   |                                                                                                                                             | <code>2Gi</code>                         |
| spec.metrics.thanos.store.storageSize                                     |                                                                                                                                             | <code>2Gi</code>                         |
| spec.metrics.thanos.store.ignoreDeletionMarksDelay                        |                                                                                                                                             | <code>24h</code>                         |
| spec.metrics.thanos.store.shardingStrategy.type                           |                                                                                                                                             | <code>block</code>                       |
| spec.metrics.thanos.store.shardingStrategy.shards                         |                                                                                                                                             | <code>1</code>                           |
| spec.metrics.thanos.query.replicas                                        |                                                                                                                                             | <code>1</code>                           |
| spec.metrics.thanos.query.queryFrontend.replicas                          |                                                                                                                                             | <code>1</code>                           |
| spec.metrics.thanos.receive.ingesterSpec.name                             |                                                                                                                                             | <code>default</code>                     |
| spec.metrics.thanos.receive.ingesterSpec.replicas                         |                                                                                                                                             | <code>1</code>                           |
| spec.metrics.thanos.receive.ingesterSpec.storageSize                      |                                                                                                                                             | <code>2Gi</code>                         |
| spec.metrics.thanos.receive.ingesterSpec.tsdbRetention                    |                                                                                                                                             | <code>3h</code>                          |
| spec.metrics.thanos.receive.ingesterSpec.tenancyConfig.tenantMatcherType  |                                                                                                                                             | <code>exact</code>                       |
| spec.metrics.thanos.receive.ingesterSpec.tenancyConfig.tenantHeader       |                                                                                                                                             | <code>THANOS-TENANT</code>               |
| spec.metrics.thanos.receive.ingesterSpec.tenancyConfig.defaultTenantID    |                                                                                                                                             | <code>default</code>                     |
| spec.metrics.thanos.receive.ingesterSpec.tenancyConfig.tenantLabelName    |                                                                                                                                             | <code>tenant_id</code>                   |
| spec.metrics.thanos.receive.routerSpec.replicas                           |                                                                                                                                             | <code>1</code>                           |
| spec.metrics.thanos.receive.routerSpec.replicationFactor                  |                                                                                                                                             | <code>1</code>                           |
| spec.metrics.thanos.receive.routerSpec.externalLabels.receive             |                                                                                                                                             | <code>"true"</code>                      |
| spec.metrics.thanos.ruler.replicas                                        |                                                                                                                                             | <code>1</code>                           |
| spec.metrics.thanos.ruler.storageSize                                     |                                                                                                                                             | <code>2Gi</code>                         |
| spec.metrics.thanos.ruler.alertmanagerURL                                 |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.thanos.ruler.additionalConfig.additionalArgs                 |                                                                                                                                             | <code>[]</code>                          |
| spec.metrics.thanos.ruler.additionalConfig.additionalVolumes              |                                                                                                                                             | <code>[]</code>                          |
| spec.metrics.thanos.ruler.additionalConfig.additionalVolumeMounts         |                                                                                                                                             | <code>[]</code>                          |
| spec.metrics.thanos.s3.bucket                                             |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.thanos.s3.endpoint                                           |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.thanos.s3.region                                             |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.thanos.s3.prefix                                             |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.thanos.s3.accessKey                                          |                                                                                                                                             | <code>""</code>                          |
| spec.metrics.thanos.s3.secretKey                                          |                                                                                                                                             | <code>""</code>                          |
| spec.logs.backend                                                         |                                                                                                                                             | <code>ClickHouse</code>                  |
| spec.logs.victoriaLogs.deploymentMode                                     |                                                                                                                                             | <code>Standalone</code>                  |
| spec.logs.victoriaLogs.version                                            |                                                                                                                                             | <code>""</code>                          |
| spec.logs.victoriaLogs.defaultRetention                                   |                                                                                                                                             | <code>30d</code>                         |
| spec.logs.victoriaLogs.futureRetention                                    |                                                                                                                                             | <code>2d</code>                          |
| spec.logs.victoriaLogs.maxDiskUsagePercent                                |                                                                                                                                             | <code>80</code>                          |
| spec.logs.victoriaLogs.storage.size                                       |                                                                                                                                             | <code>10Gi</code>                        |
| spec.logs.victoriaLogs.storage.storageClassName                           |                                                                                                                                             | <code>""</code>                          |
| spec.logs.victoriaLogs.cluster.insertReplicas                             |                                                                                                                                             | <code>2</code>                           |
| spec.logs.victoriaLogs.cluster.selectReplicas                             |                                                                                                                                             | <code>2</code>                           |
| spec.logs.victoriaLogs.cluster.storageReplicas                            |                                                                                                                                             | <code>2</code>                           |
| spec.logs.enabled                                                         |                                                                                                                                             | <code>true</code>                        |
| spec.logs.deploymentMode                                                  |                                                                                                                                             | <code>Standalone</code>                  |
| spec.logs.version                                                         |                                                                                                                                             | <code>24.4.1</code>                      |
| spec.logs.deletionPolicy                                                  |                                                                                                                                             | <code>Delete</code>                      |
| spec.logs.storage.storageClassName                                        |                                                                                                                                             | <code>""</code>                          |
| spec.logs.storage.size                                                    |                                                                                                                                             | <code>2Gi</code>                         |
| spec.logs.clientCaCertificates                                            |                                                                                                                                             | <code>[]</code>                          |
| spec.logs.clusterTopology.cluster.name                                    |                                                                                                                                             | <code>""</code>                          |
| spec.logs.clusterTopology.cluster.replicas                                |                                                                                                                                             | <code>3</code>                           |
| spec.logs.clusterTopology.cluster.shards                                  |                                                                                                                                             | <code>2</code>                           |
| spec.logs.clusterTopology.cluster.persistence.size                        |                                                                                                                                             | <code>2Gi</code>                         |
| spec.logs.clusterTopology.cluster.persistence.storageClassName            |                                                                                                                                             | <code>""</code>                          |
| spec.logs.clusterTopology.clickHouseKeeper.externallyManaged              |                                                                                                                                             | <code>false</code>                       |
| spec.logs.clusterTopology.clickHouseKeeper.replicas                       |                                                                                                                                             | <code>3</code>                           |
| spec.logs.clusterTopology.clickHouseKeeper.persistence.size               |                                                                                                                                             | <code>2Gi</code>                         |
| spec.logs.clusterTopology.clickHouseKeeper.persistence.storageClassName   |                                                                                                                                             | <code>""</code>                          |
| spec.logs.s3.bucket                                                       |                                                                                                                                             | <code>""</code>                          |
| spec.logs.s3.endpoint                                                     |                                                                                                                                             | <code>""</code>                          |
| spec.logs.s3.region                                                       |                                                                                                                                             | <code>""</code>                          |
| spec.logs.s3.prefix                                                       |                                                                                                                                             | <code>""</code>                          |
| spec.logs.s3.accessKey                                                    |                                                                                                                                             | <code>""</code>                          |
| spec.logs.s3.secretKey                                                    |                                                                                                                                             | <code>""</code>                          |
| spec.traces.backend                                                       |                                                                                                                                             | <code>ClickHouse</code>                  |
| spec.traces.victoriaTraces.deploymentMode                                 |                                                                                                                                             | <code>Standalone</code>                  |
| spec.traces.victoriaTraces.version                                        |                                                                                                                                             | <code>""</code>                          |
| spec.traces.victoriaTraces.defaultRetention                               |                                                                                                                                             | <code>30d</code>                         |
| spec.traces.victoriaTraces.storage.size                                   |                                                                                                                                             | <code>10Gi</code>                        |
| spec.traces.victoriaTraces.storage.storageClassName                       |                                                                                                                                             | <code>""</code>                          |
| spec.traces.victoriaTraces.cluster.insertReplicas                         |                                                                                                                                             | <code>2</code>                           |
| spec.traces.victoriaTraces.cluster.selectReplicas                         |                                                                                                                                             | <code>2</code>                           |
| spec.traces.victoriaTraces.cluster.storageReplicas                        |                                                                                                                                             | <code>2</code>                           |
| spec.traces.enabled                                                       |                                                                                                                                             | <code>false</code>                       |
| spec.traces.deploymentMode                                                |                                                                                                                                             | <code>Standalone</code>                  |
| spec.traces.version                                                       |                                                                                                                                             | <code>24.4.1</code>                      |
| spec.traces.deletionPolicy                                                |                                                                                                                                             | <code>Delete</code>                      |
| spec.traces.storage.storageClassName                                      |                                                                                                                                             | <code>""</code>                          |
| spec.traces.storage.size                                                  |                                                                                                                                             | <code>2Gi</code>                         |
| spec.traces.clientCaCertificates                                          |                                                                                                                                             | <code>[]</code>                          |
| spec.traces.clusterTopology.cluster.name                                  |                                                                                                                                             | <code>""</code>                          |
| spec.traces.clusterTopology.cluster.replicas                              |                                                                                                                                             | <code>3</code>                           |
| spec.traces.clusterTopology.cluster.shards                                |                                                                                                                                             | <code>2</code>                           |
| spec.traces.clusterTopology.cluster.persistence.size                      |                                                                                                                                             | <code>2Gi</code>                         |
| spec.traces.clusterTopology.cluster.persistence.storageClassName          |                                                                                                                                             | <code>""</code>                          |
| spec.traces.clusterTopology.clickHouseKeeper.externallyManaged            |                                                                                                                                             | <code>false</code>                       |
| spec.traces.clusterTopology.clickHouseKeeper.replicas                     |                                                                                                                                             | <code>3</code>                           |
| spec.traces.clusterTopology.clickHouseKeeper.persistence.size             |                                                                                                                                             | <code>2Gi</code>                         |
| spec.traces.clusterTopology.clickHouseKeeper.persistence.storageClassName |                                                                                                                                             | <code>""</code>                          |
| spec.traces.s3.bucket                                                     |                                                                                                                                             | <code>""</code>                          |
| spec.traces.s3.endpoint                                                   |                                                                                                                                             | <code>""</code>                          |
| spec.traces.s3.region                                                     |                                                                                                                                             | <code>""</code>                          |
| spec.traces.s3.prefix                                                     |                                                                                                                                             | <code>""</code>                          |
| spec.traces.s3.accessKey                                                  |                                                                                                                                             | <code>""</code>                          |
| spec.traces.s3.secretKey                                                  |                                                                                                                                             | <code>""</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i monitoringk8sappscodecom-telemetrystack-editor-options appscode/monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system --create-namespace --version=v0.37.0-test --set metadata.resource.group=monitoring.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i monitoringk8sappscodecom-telemetrystack-editor-options appscode/monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system --create-namespace --version=v0.37.0-test --values values.yaml
```
