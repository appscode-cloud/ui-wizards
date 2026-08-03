# Weaviate Editor

[Weaviate Editor by AppsCode](https://appscode.com) - Weaviate Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-weaviate-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-weaviate-editor appscode/kubedbcom-weaviate-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a Weaviate Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-weaviate-editor`:

```bash
$ helm upgrade -i kubedbcom-weaviate-editor appscode/kubedbcom-weaviate-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a Weaviate Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-weaviate-editor`:

```bash
$ helm uninstall kubedbcom-weaviate-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-weaviate-editor` chart and their default values.

|                                 Parameter                                 | Description |                                                                   Default                                                                   |
|---------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                           |             | <code>{}</code>                                                                                                                             |
| form.alert.annotations                                                    |             | <code>{}</code>                                                                                                                             |
| form.alert.enabled                                                        |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.enabled                                        |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.diskAlmostFull.duration                  |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.diskAlmostFull.enabled                   |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.diskAlmostFull.severity                  |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.diskAlmostFull.val                       |             | <code>95</code>                                                                                                                             |
| form.alert.groups.database.rules.diskUsageHigh.duration                   |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.diskUsageHigh.enabled                    |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.diskUsageHigh.severity                   |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.diskUsageHigh.val                        |             | <code>80</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateGRPCErrorRateHigh.duration       |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateGRPCErrorRateHigh.enabled        |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateGRPCErrorRateHigh.severity       |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateGRPCErrorRateHigh.val            |             | <code>5</code>                                                                                                                              |
| form.alert.groups.database.rules.weaviateGRPCP95LatencyHigh.duration      |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateGRPCP95LatencyHigh.enabled       |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateGRPCP95LatencyHigh.severity      |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateGRPCP95LatencyHigh.val           |             | <code>1</code>                                                                                                                              |
| form.alert.groups.database.rules.weaviateGoroutinesExplosion.duration     |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateGoroutinesExplosion.enabled      |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateGoroutinesExplosion.severity     |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateGoroutinesExplosion.val          |             | <code>1000</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateHTTPErrorRateHigh.duration       |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHTTPErrorRateHigh.enabled        |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateHTTPErrorRateHigh.severity       |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateHTTPErrorRateHigh.val            |             | <code>5</code>                                                                                                                              |
| form.alert.groups.database.rules.weaviateHTTPP95LatencyHigh.duration      |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHTTPP95LatencyHigh.enabled       |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateHTTPP95LatencyHigh.severity      |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateHTTPP95LatencyHigh.val           |             | <code>1</code>                                                                                                                              |
| form.alert.groups.database.rules.weaviateHighCPUUsage.duration            |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHighCPUUsage.enabled             |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateHighCPUUsage.severity            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateHighCPUUsage.val                 |             | <code>80</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHighFDsUsage.duration            |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHighFDsUsage.enabled             |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateHighFDsUsage.severity            |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateHighFDsUsage.val                 |             | <code>80</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHighMemoryUsage.duration         |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHighMemoryUsage.enabled          |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateHighMemoryUsage.severity         |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateHighMemoryUsage.val              |             | <code>80</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHighProcessMemoryUsage.duration  |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHighProcessMemoryUsage.enabled   |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateHighProcessMemoryUsage.severity  |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateHighProcessMemoryUsage.val       |             | <code>1.073741824e+09</code>                                                                                                                |
| form.alert.groups.database.rules.weaviateHighThreadPressure.duration      |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateHighThreadPressure.enabled       |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateHighThreadPressure.severity      |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateHighThreadPressure.val           |             | <code>100</code>                                                                                                                            |
| form.alert.groups.database.rules.weaviateInstanceDown.duration            |             | <code>30s</code>                                                                                                                            |
| form.alert.groups.database.rules.weaviateInstanceDown.enabled             |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateInstanceDown.severity            |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.weaviateReplicationEngineDown.duration   |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateReplicationEngineDown.enabled    |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateReplicationEngineDown.severity   |             | <code>critical</code>                                                                                                                       |
| form.alert.groups.database.rules.weaviateReplicationFailuresHigh.duration |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateReplicationFailuresHigh.enabled  |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateReplicationFailuresHigh.severity |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateReplicationFailuresHigh.val      |             | <code>0</code>                                                                                                                              |
| form.alert.groups.database.rules.weaviateReplicationQueueHigh.duration    |             | <code>5m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateReplicationQueueHigh.enabled     |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateReplicationQueueHigh.severity    |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateReplicationQueueHigh.val         |             | <code>10</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateRestarted.duration               |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.database.rules.weaviateRestarted.enabled                |             | <code>true</code>                                                                                                                           |
| form.alert.groups.database.rules.weaviateRestarted.severity               |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.database.rules.weaviateRestarted.val                    |             | <code>180</code>                                                                                                                            |
| form.alert.groups.provisioner.enabled                                     |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration             |             | <code>15m</code>                                                                                                                            |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled              |             | <code>true</code>                                                                                                                           |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity             |             | <code>warning</code>                                                                                                                        |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration             |             | <code>1m</code>                                                                                                                             |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled              |             | <code>true</code>                                                                                                                           |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity             |             | <code>critical</code>                                                                                                                       |
| form.alert.labels.release                                                 |             | <code>prometheus</code>                                                                                                                     |
| metadata.resource.group                                                   |             | <code>kubedb.com</code>                                                                                                                     |
| metadata.resource.version                                                 |             | <code>v1alpha2</code>                                                                                                                       |
| metadata.resource.name                                                    |             | <code>weaviates</code>                                                                                                                      |
| metadata.resource.kind                                                    |             | <code>Weaviate</code>                                                                                                                       |
| metadata.resource.scope                                                   |             | <code>Namespaced</code>                                                                                                                     |
| metadata.release.name                                                     |             | <code>RELEASE-NAME</code>                                                                                                                   |
| metadata.release.namespace                                                |             | <code>default</code>                                                                                                                        |
| resources.autoscalingKubedbComWeaviateAutoscaler                          |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"WeaviateAutoscaler","metadata":{"name":"weaviate","namespace":"demo"}}</code> |
| resources.catalogAppscodeComWeaviateBinding                               |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"WeaviateBinding","metadata":{"name":"weaviate","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                          |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"weaviate-ca","namespace":"demo"}}</code>                       |
| resources.kubedbComWeaviate                                               |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"Weaviate","metadata":{"name":"weaviate","namespace":"default"}}</code>                    |
| resources.monitoringCoreosComServiceMonitor                               |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"weaviate","namespace":"demo"}}</code>            |
| resources.secret_auth                                                     |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"weaviate-auth","namespace":"demo"}}</code>                                     |
| resources.secret_config                                                   |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"weaviate-config","namespace":"demo"}}</code>                                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-weaviate-editor appscode/kubedbcom-weaviate-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-weaviate-editor appscode/kubedbcom-weaviate-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
