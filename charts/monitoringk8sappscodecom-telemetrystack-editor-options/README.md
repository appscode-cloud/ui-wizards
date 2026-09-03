# TelemetryStack Editor UI Options

[TelemetryStack Editor UI Options](https://byte.builders) - TelemetryStack Editor UI Options

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/monitoringk8sappscodecom-telemetrystack-editor-options --version=v0.37.0
$ helm upgrade -i monitoringk8sappscodecom-telemetrystack-editor-options appscode/monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system --create-namespace --version=v0.37.0
```

## Introduction

This chart deploys a TelemetryStack Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `monitoringk8sappscodecom-telemetrystack-editor-options`:

```bash
$ helm upgrade -i monitoringk8sappscodecom-telemetrystack-editor-options appscode/monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system --create-namespace --version=v0.37.0
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

|                                Parameter                                 |    Description    |                 Default                  |
|--------------------------------------------------------------------------|-------------------|------------------------------------------|
| metadata.resource.group                                                  |                   | <code>monitoring.k8s.appscode.com</code> |
| metadata.resource.kind                                                   |                   | <code>TelemetryStack</code>              |
| metadata.resource.name                                                   |                   | <code>telemetrystacks</code>             |
| metadata.resource.scope                                                  |                   | <code>Cluster</code>                     |
| metadata.resource.version                                                |                   | <code>v1alpha1</code>                    |
| metadata.release.name                                                    | Release name      | <code>telemetry-stack</code>             |
| metadata.release.namespace                                               | Release namespace | <code>monitoring</code>                  |
| spec.metrics.thanos.compact.storageSize                                  |                   | <code>2Gi</code>                         |
| spec.metrics.thanos.store.storageSize                                    |                   | <code>2Gi</code>                         |
| spec.metrics.thanos.store.ignoreDeletionMarksDelay                       |                   | <code>24h</code>                         |
| spec.metrics.thanos.store.shardingStrategy.type                          |                   | <code>block</code>                       |
| spec.metrics.thanos.store.shardingStrategy.shards                        |                   | <code>1</code>                           |
| spec.metrics.thanos.query.replicas                                       |                   | <code>1</code>                           |
| spec.metrics.thanos.receive.ingesterSpec.name                            |                   | <code>default</code>                     |
| spec.metrics.thanos.receive.ingesterSpec.replicas                        |                   | <code>1</code>                           |
| spec.metrics.thanos.receive.ingesterSpec.storageSize                     |                   | <code>2Gi</code>                         |
| spec.metrics.thanos.receive.ingesterSpec.tsdbRetention                   |                   | <code>24h</code>                         |
| spec.metrics.thanos.receive.ingesterSpec.tenancyConfig.tenantMatcherType |                   | <code>exact</code>                       |
| spec.metrics.thanos.receive.ingesterSpec.tenancyConfig.tenantHeader      |                   | <code>THANOS-TENANT</code>               |
| spec.metrics.thanos.receive.ingesterSpec.tenancyConfig.defaultTenantID   |                   | <code>default</code>                     |
| spec.metrics.thanos.receive.ingesterSpec.tenancyConfig.tenantLabelName   |                   | <code>tenant_id</code>                   |
| spec.metrics.thanos.receive.routerSpec.replicas                          |                   | <code>1</code>                           |
| spec.metrics.thanos.receive.routerSpec.replicationFactor                 |                   | <code>1</code>                           |
| spec.metrics.thanos.receive.routerSpec.externalLabels                    |                   | <code>{}</code>                          |
| spec.metrics.thanos.ruler.replicas                                       |                   | <code>1</code>                           |
| spec.metrics.thanos.ruler.storageSize                                    |                   | <code>2Gi</code>                         |
| spec.metrics.thanos.ruler.alertmanagerURL                                |                   | <code>""</code>                          |
| spec.metrics.thanos.ruler.additionalConfig.additionalArgs                |                   | <code>[]</code>                          |
| spec.metrics.thanos.ruler.additionalConfig.additionalVolumes             |                   | <code>[]</code>                          |
| spec.metrics.thanos.ruler.additionalConfig.additionalVolumeMounts        |                   | <code>[]</code>                          |
| spec.metrics.thanos.s3.bucket                                            |                   | <code>""</code>                          |
| spec.metrics.thanos.s3.endpoint                                          |                   | <code>""</code>                          |
| spec.metrics.thanos.s3.region                                            |                   | <code>""</code>                          |
| spec.metrics.thanos.s3.prefix                                            |                   | <code>""</code>                          |
| spec.metrics.thanos.s3.accessKey                                         |                   | <code>""</code>                          |
| spec.metrics.thanos.s3.secretKey                                         |                   | <code>""</code>                          |
| spec.logs.enabled                                                        |                   | <code>true</code>                        |
| spec.logs.deploymentMode                                                 |                   | <code>Standalone</code>                  |
| spec.logs.version                                                        |                   | <code>24.4.1</code>                      |
| spec.logs.deletionPolicy                                                 |                   | <code>Delete</code>                      |
| spec.logs.storage.storageClassName                                       |                   | <code>""</code>                          |
| spec.logs.storage.size                                                   |                   | <code>2Gi</code>                         |
| spec.logs.clientCaCertificates                                           |                   | <code>[]</code>                          |
| spec.logs.clusterTopology.cluster.name                                   |                   | <code>""</code>                          |
| spec.logs.clusterTopology.cluster.replicas                               |                   | <code>3</code>                           |
| spec.logs.clusterTopology.cluster.shards                                 |                   | <code>2</code>                           |
| spec.logs.clusterTopology.cluster.persistence.size                       |                   | <code>2Gi</code>                         |
| spec.logs.clusterTopology.clickHouseKeeper.externallyManaged             |                   | <code>false</code>                       |
| spec.logs.clusterTopology.clickHouseKeeper.replicas                      |                   | <code>3</code>                           |
| spec.logs.clusterTopology.clickHouseKeeper.persistence.size              |                   | <code>2Gi</code>                         |
| spec.logs.s3.bucket                                                      |                   | <code>""</code>                          |
| spec.logs.s3.endpoint                                                    |                   | <code>""</code>                          |
| spec.logs.s3.region                                                      |                   | <code>""</code>                          |
| spec.logs.s3.prefix                                                      |                   | <code>""</code>                          |
| spec.logs.s3.accessKey                                                   |                   | <code>""</code>                          |
| spec.logs.s3.secretKey                                                   |                   | <code>""</code>                          |
| spec.traces.enabled                                                      |                   | <code>false</code>                       |
| spec.traces.deploymentMode                                               |                   | <code>Standalone</code>                  |
| spec.traces.version                                                      |                   | <code>24.4.1</code>                      |
| spec.traces.deletionPolicy                                               |                   | <code>Delete</code>                      |
| spec.traces.storage.storageClassName                                     |                   | <code>""</code>                          |
| spec.traces.storage.size                                                 |                   | <code>2Gi</code>                         |
| spec.traces.clientCaCertificates                                         |                   | <code>[]</code>                          |
| spec.traces.clusterTopology.cluster.name                                 |                   | <code>""</code>                          |
| spec.traces.clusterTopology.cluster.replicas                             |                   | <code>3</code>                           |
| spec.traces.clusterTopology.cluster.shards                               |                   | <code>2</code>                           |
| spec.traces.clusterTopology.cluster.persistence.size                     |                   | <code>2Gi</code>                         |
| spec.traces.clusterTopology.clickHouseKeeper.externallyManaged           |                   | <code>false</code>                       |
| spec.traces.clusterTopology.clickHouseKeeper.replicas                    |                   | <code>3</code>                           |
| spec.traces.clusterTopology.clickHouseKeeper.persistence.size            |                   | <code>2Gi</code>                         |
| spec.traces.s3.bucket                                                    |                   | <code>""</code>                          |
| spec.traces.s3.endpoint                                                  |                   | <code>""</code>                          |
| spec.traces.s3.region                                                    |                   | <code>""</code>                          |
| spec.traces.s3.prefix                                                    |                   | <code>""</code>                          |
| spec.traces.s3.accessKey                                                 |                   | <code>""</code>                          |
| spec.traces.s3.secretKey                                                 |                   | <code>""</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i monitoringk8sappscodecom-telemetrystack-editor-options appscode/monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system --create-namespace --version=v0.37.0 --set metadata.resource.group=monitoring.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i monitoringk8sappscodecom-telemetrystack-editor-options appscode/monitoringk8sappscodecom-telemetrystack-editor-options -n kube-system --create-namespace --version=v0.37.0 --values values.yaml
```
