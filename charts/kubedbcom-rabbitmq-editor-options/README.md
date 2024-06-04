# RabbitMQ Editor UI Options

[RabbitMQ Editor UI Options](https://byte.builders) - RabbitMQ Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-rabbitmq-editor-options --version=v0.4.19
$ helm upgrade -i kubedbcom-rabbitmq-editor-options bytebuilders-ui/kubedbcom-rabbitmq-editor-options -n kube-system --create-namespace --version=v0.4.19
```

## Introduction

This chart deploys a RabbitMQ Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-rabbitmq-editor-options`:

```bash
$ helm upgrade -i kubedbcom-rabbitmq-editor-options bytebuilders-ui/kubedbcom-rabbitmq-editor-options -n kube-system --create-namespace --version=v0.4.19
```

The command deploys a RabbitMQ Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-rabbitmq-editor-options`:

```bash
$ helm uninstall kubedbcom-rabbitmq-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-rabbitmq-editor-options` chart and their default values.

|                                            Parameter                                             |                                                                                Description                                                                                |                     Default                      |
|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| metadata.resource.group                                                                          |                                                                                                                                                                           | <code>kubedb.com</code>                          |
| metadata.resource.kind                                                                           |                                                                                                                                                                           | <code>RabbitMQ</code>                            |
| metadata.resource.name                                                                           |                                                                                                                                                                           | <code>rabbitmqs</code>                           |
| metadata.resource.scope                                                                          |                                                                                                                                                                           | <code>Namespaced</code>                          |
| metadata.resource.version                                                                        |                                                                                                                                                                           | <code>v1alpha2</code>                            |
| metadata.release.name                                                                            | Release name                                                                                                                                                              | <code>""</code>                                  |
| metadata.release.namespace                                                                       | Release namespace                                                                                                                                                         | <code>""</code>                                  |
| spec.version                                                                                     | List options                                                                                                                                                              | <code>"3.12.12"</code>                           |
| spec.annotations                                                                                 | Annotations to add to the database custom resource                                                                                                                        | <code>{}</code>                                  |
| spec.labels                                                                                      | Labels to add to all the template objects                                                                                                                                 | <code>{}</code>                                  |
| spec.mode                                                                                        | Standalone, Cluster                                                                                                                                                       | <code>Standalone</code>                          |
| spec.replicas                                                                                    |                                                                                                                                                                           | <code>1</code>                                   |
| spec.terminationPolicy                                                                           |                                                                                                                                                                           | <code>WipeOut</code>                             |
| spec.storageClass.name                                                                           |                                                                                                                                                                           | <code>standard</code>                            |
| spec.persistence.size                                                                            |                                                                                                                                                                           | <code>10Gi</code>                                |
| spec.podResources.machine                                                                        |                                                                                                                                                                           | <code>""</code>                                  |
| spec.podResources.resources.requests.cpu                                                         |                                                                                                                                                                           | <code>500m</code>                                |
| spec.podResources.resources.requests.memory                                                      |                                                                                                                                                                           | <code>1Gi</code>                                 |
| spec.podResources.resources.limits.cpu                                                           |                                                                                                                                                                           | <code>500m</code>                                |
| spec.podResources.resources.limits.memory                                                        |                                                                                                                                                                           | <code>1Gi</code>                                 |
| spec.authSecret.name                                                                             |                                                                                                                                                                           | <code>""</code>                                  |
| spec.authSecret.password                                                                         |                                                                                                                                                                           | <code>""</code>                                  |
| spec.monitoring.agent                                                                            | Name of monitoring agent (one of "prometheus.io", "prometheus.io/operator", "prometheus.io/builtin")                                                                      | <code>prometheus.io/operator</code>              |
| spec.monitoring.serviceMonitor.labels                                                            | Specify the labels for ServiceMonitor. Prometheus crd will select ServiceMonitor using these labels. Only usable when monitoring agent is `prometheus.io/webhook server`. | <code>{}</code>                                  |
| form.alert.enabled                                                                               | # Enable PrometheusRule alerts                                                                                                                                            | <code>warning</code>                             |
| form.alert.labels                                                                                | # Labels for default rules                                                                                                                                                | <code>{"release":"kube-prometheus-stack"}</code> |
| form.alert.annotations                                                                           | # Annotations for default rules                                                                                                                                           | <code>{}</code>                                  |
| form.alert.additionalRuleLabels                                                                  | # Additional labels for PrometheusRule alerts                                                                                                                             | <code>{}</code>                                  |
| form.alert.groups.database.enabled                                                               |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.rabbitmqPhaseCritical.enabled                                   |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqPhaseCritical.duration                                  |                                                                                                                                                                           | <code>"3m"</code>                                |
| form.alert.groups.database.rules.rabbitmqPhaseCritical.severity                                  |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.rabbitmqDown.enabled                                            |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqDown.duration                                           |                                                                                                                                                                           | <code>"30s"</code>                               |
| form.alert.groups.database.rules.rabbitmqDown.severity                                           |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.database.rules.rabbitmqFileDescriptorsNearLimit.enabled                        |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqFileDescriptorsNearLimit.duration                       |                                                                                                                                                                           | <code>"30s"</code>                               |
| form.alert.groups.database.rules.rabbitmqFileDescriptorsNearLimit.severity                       |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.rabbitmqHighConnectionChurn.enabled                             |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqHighConnectionChurn.duration                            |                                                                                                                                                                           | <code>"30s"</code>                               |
| form.alert.groups.database.rules.rabbitmqHighConnectionChurn.severity                            |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.rabbitmqInsufficientEstablishedErlangDistributionLinks.enabled  |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqInsufficientEstablishedErlangDistributionLinks.duration |                                                                                                                                                                           | <code>"30s"</code>                               |
| form.alert.groups.database.rules.rabbitmqInsufficientEstablishedErlangDistributionLinks.severity |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.rabbitmqLowDiskWatermarkPredicted.enabled                       |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqLowDiskWatermarkPredicted.duration                      |                                                                                                                                                                           | <code>"30s"</code>                               |
| form.alert.groups.database.rules.rabbitmqLowDiskWatermarkPredicted.severity                      |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.rabbitmqUnroutableMessages.enabled                              |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqUnroutableMessages.duration                             |                                                                                                                                                                           | <code>"30s"</code>                               |
| form.alert.groups.database.rules.rabbitmqUnroutableMessages.severity                             |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.rabbitmqTCPSocketsNearLimit.enabled                             |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqTCPSocketsNearLimit.duration                            |                                                                                                                                                                           | <code>"30s"</code>                               |
| form.alert.groups.database.rules.rabbitmqTCPSocketsNearLimit.severity                            |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.rabbitmqQueueIsGrowing.enabled                                  |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.rabbitmqQueueIsGrowing.duration                                 |                                                                                                                                                                           | <code>"30s"</code>                               |
| form.alert.groups.database.rules.rabbitmqQueueIsGrowing.severity                                 |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.diskUsageHigh.enabled                                           |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.diskUsageHigh.val                                               |                                                                                                                                                                           | <code>80</code>                                  |
| form.alert.groups.database.rules.diskUsageHigh.duration                                          |                                                                                                                                                                           | <code>"1m"</code>                                |
| form.alert.groups.database.rules.diskUsageHigh.severity                                          |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.database.rules.diskAlmostFull.enabled                                          |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.database.rules.diskAlmostFull.val                                              |                                                                                                                                                                           | <code>95</code>                                  |
| form.alert.groups.database.rules.diskAlmostFull.duration                                         |                                                                                                                                                                           | <code>"1m"</code>                                |
| form.alert.groups.database.rules.diskAlmostFull.severity                                         |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.provisioner.enabled                                                            |                                                                                                                                                                           | <code>warning</code>                             |
| form.alert.groups.provisioner.rules.appPhaseNotReady.enabled                                     |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.provisioner.rules.appPhaseNotReady.duration                                    |                                                                                                                                                                           | <code>"1m"</code>                                |
| form.alert.groups.provisioner.rules.appPhaseNotReady.severity                                    |                                                                                                                                                                           | <code>critical</code>                            |
| form.alert.groups.provisioner.rules.appPhaseCritical.enabled                                     |                                                                                                                                                                           | <code>true</code>                                |
| form.alert.groups.provisioner.rules.appPhaseCritical.duration                                    |                                                                                                                                                                           | <code>"15m"</code>                               |
| form.alert.groups.provisioner.rules.appPhaseCritical.severity                                    |                                                                                                                                                                           | <code>warning</code>                             |
| form.capi.provider                                                                               |                                                                                                                                                                           | <code>""</code>                                  |
| form.capi.namespace                                                                              |                                                                                                                                                                           | <code>""</code>                                  |
| form.capi.clusterName                                                                            |                                                                                                                                                                           | <code>""</code>                                  |
| form.capi.dedicated                                                                              |                                                                                                                                                                           | <code>false</code>                               |
| form.capi.nodes                                                                                  |                                                                                                                                                                           | <code>1</code>                                   |
| form.capi.sku                                                                                    |                                                                                                                                                                           | <code>""</code>                                  |
| form.capi.zones                                                                                  |                                                                                                                                                                           | <code>[]</code>                                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-rabbitmq-editor-options bytebuilders-ui/kubedbcom-rabbitmq-editor-options -n kube-system --create-namespace --version=v0.4.19 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-rabbitmq-editor-options bytebuilders-ui/kubedbcom-rabbitmq-editor-options -n kube-system --create-namespace --version=v0.4.19 --values values.yaml
```
