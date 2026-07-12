# Hazelcast Editor

[Hazelcast Editor by AppsCode](https://appscode.com) - Hazelcast Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-hazelcast-editor --version=v0.36.0
$ helm upgrade -i kubedbcom-hazelcast-editor appscode/kubedbcom-hazelcast-editor -n default --create-namespace --version=v0.36.0
```

## Introduction

This chart deploys a Hazelcast Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-hazelcast-editor`:

```bash
$ helm upgrade -i kubedbcom-hazelcast-editor appscode/kubedbcom-hazelcast-editor -n default --create-namespace --version=v0.36.0
```

The command deploys a Hazelcast Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-hazelcast-editor`:

```bash
$ helm uninstall kubedbcom-hazelcast-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-hazelcast-editor` chart and their default values.

|                                   Parameter                                   | Description |                                                                    Default                                                                    |
|-------------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| form.alert.additionalRuleLabels                                               |             | <code>{}</code>                                                                                                                               |
| form.alert.annotations                                                        |             | <code>{}</code>                                                                                                                               |
| form.alert.enabled                                                            |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.enabled                                            |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.diskAlmostFull.duration                      |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.diskAlmostFull.enabled                       |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.diskAlmostFull.severity                      |             | <code>critical</code>                                                                                                                         |
| form.alert.groups.database.rules.diskAlmostFull.val                           |             | <code>95</code>                                                                                                                               |
| form.alert.groups.database.rules.diskUsageHigh.duration                       |             | <code>1m</code>                                                                                                                               |
| form.alert.groups.database.rules.diskUsageHigh.enabled                        |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.diskUsageHigh.severity                       |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.diskUsageHigh.val                            |             | <code>80</code>                                                                                                                               |
| form.alert.groups.database.rules.hazelcastDown.duration                       |             | <code>30s</code>                                                                                                                              |
| form.alert.groups.database.rules.hazelcastDown.enabled                        |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.hazelcastDown.severity                       |             | <code>critical</code>                                                                                                                         |
| form.alert.groups.database.rules.hazelcastHighHeapPercentage.duration         |             | <code>30s</code>                                                                                                                              |
| form.alert.groups.database.rules.hazelcastHighHeapPercentage.enabled          |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.hazelcastHighHeapPercentage.severity         |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.hazelcastHighHeapPercentage.val              |             | <code>80</code>                                                                                                                               |
| form.alert.groups.database.rules.hazelcastHighLatency.duration                |             | <code>30s</code>                                                                                                                              |
| form.alert.groups.database.rules.hazelcastHighLatency.enabled                 |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.hazelcastHighLatency.severity                |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.hazelcastHighLatency.val                     |             | <code>2.5</code>                                                                                                                              |
| form.alert.groups.database.rules.hazelcastHighMemoryUsage.duration            |             | <code>30s</code>                                                                                                                              |
| form.alert.groups.database.rules.hazelcastHighMemoryUsage.enabled             |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.hazelcastHighMemoryUsage.severity            |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.hazelcastHighMemoryUsage.val                 |             | <code>80</code>                                                                                                                               |
| form.alert.groups.database.rules.hazelcastHighPhysicalMemoryUsage.duration    |             | <code>30s</code>                                                                                                                              |
| form.alert.groups.database.rules.hazelcastHighPhysicalMemoryUsage.enabled     |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.hazelcastHighPhysicalMemoryUsage.severity    |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.hazelcastHighPhysicalMemoryUsage.val         |             | <code>50</code>                                                                                                                               |
| form.alert.groups.database.rules.hazelcastPartitionCountExceed.duration       |             | <code>30s</code>                                                                                                                              |
| form.alert.groups.database.rules.hazelcastPartitionCountExceed.enabled        |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.hazelcastPartitionCountExceed.severity       |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.hazelcastPartitionCountExceed.val            |             | <code>92</code>                                                                                                                               |
| form.alert.groups.database.rules.hazelcastPhaseCritical.duration              |             | <code>3m</code>                                                                                                                               |
| form.alert.groups.database.rules.hazelcastPhaseCritical.enabled               |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.hazelcastPhaseCritical.severity              |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.hazelcastSystemCPULoadExceed.duration        |             | <code>30s</code>                                                                                                                              |
| form.alert.groups.database.rules.hazelcastSystemCPULoadExceed.enabled         |             | <code>true</code>                                                                                                                             |
| form.alert.groups.database.rules.hazelcastSystemCPULoadExceed.severity        |             | <code>warning</code>                                                                                                                          |
| form.alert.groups.database.rules.hazelcastSystemCPULoadExceed.val             |             | <code>5</code>                                                                                                                                |
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
| form.alert.labels.release                                                     |             | <code>kube-prometheus-stack</code>                                                                                                            |
| metadata.resource.group                                                       |             | <code>kubedb.com</code>                                                                                                                       |
| metadata.resource.version                                                     |             | <code>v1alpha2</code>                                                                                                                         |
| metadata.resource.name                                                        |             | <code>hazelcasts</code>                                                                                                                       |
| metadata.resource.kind                                                        |             | <code>Hazelcast</code>                                                                                                                        |
| metadata.resource.scope                                                       |             | <code>Namespaced</code>                                                                                                                       |
| metadata.release.name                                                         |             | <code>RELEASE-NAME</code>                                                                                                                     |
| metadata.release.namespace                                                    |             | <code>default</code>                                                                                                                          |
| resources.autoscalingKubedbComHazelcastAutoscaler                             |             | <code>{"apiVersion":"autoscaling.kubedb.com/v1alpha1","kind":"HazelcastAutoscaler","metadata":{"name":"hazelcast","namespace":"demo"}}</code> |
| resources.catalogAppscodeComHazelcastBinding                                  |             | <code>{"apiVersion":"catalog.appscode.com/v1alpha1","kind":"HazelcastBinding","metadata":{"name":"hazelcast","namespace":"demo"}}</code>      |
| resources.certManagerIoIssuer_ca                                              |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"hazelcast-ca","namespace":"demo"}}</code>                        |
| resources.kubedbComHazelcast                                                  |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"Hazelcast","metadata":{"name":"hazelcast","namespace":"hazelcast"}}</code>                  |
| resources.monitoringCoreosComServiceMonitor                                   |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"hazelcast","namespace":"demo"}}</code>             |
| resources.secret_auth                                                         |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"hazelcast-auth","namespace":"demo"}}</code>                                      |
| resources.secret_config                                                       |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"hazelcast-config","namespace":"demo"}}</code>                                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-hazelcast-editor appscode/kubedbcom-hazelcast-editor -n default --create-namespace --version=v0.36.0 --set form.alert.enabled=warning
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-hazelcast-editor appscode/kubedbcom-hazelcast-editor -n default --create-namespace --version=v0.36.0 --values values.yaml
```
