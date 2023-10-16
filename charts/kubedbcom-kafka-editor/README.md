# Kafka Editor

[Kafka Editor by AppsCode](https://byte.builders) - Kafka Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-kafka-editor --version=v0.4.18
$ helm upgrade -i kubedbcom-kafka-editor bytebuilders-ui/kubedbcom-kafka-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a Kafka Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-kafka-editor`:

```bash
$ helm upgrade -i kubedbcom-kafka-editor bytebuilders-ui/kubedbcom-kafka-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a Kafka Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-kafka-editor`:

```bash
$ helm uninstall kubedbcom-kafka-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-kafka-editor` chart and their default values.

|                  Parameter                  | Description |                                                                                                                                                                                                                                                                                                                                                                                                         Default                                                                                                                                                                                                                                                                                                                                                                                                         |
|---------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                     |             | <code>kubedb.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.version                   |             | <code>v1alpha2</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| metadata.resource.name                      |             | <code>kafkas</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.resource.kind                      |             | <code>Kafka</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.resource.scope                     |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.release.name                       |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.release.namespace                  |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| resources.kubedbComKafka                    |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"Kafka","metadata":{"name":"kafka","namespace":"demo"},"spec":{"authSecret":{"name":"kafka-admin-cred"},"enableSSL":true,"monitor":{"agent":"prometheus.io/operator","prometheus":{"exporter":{"port":9091},"serviceMonitor":{"interval":"10s","labels":{"release":"prometheus"}}}},"storageType":"Ephemeral","terminationPolicy":"WipeOut","tls":{"issuerRef":{"apiGroup":"cert-manager.io","kind":"Issuer","name":"kafka-ca"}},"topology":{"broker":{"replicas":3,"storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"1Gi"}},"storageClassName":"standard"}},"controller":{"replicas":2,"storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"1Gi"}},"storageClassName":"standard"}}},"version":"3.3.2"}}</code> |
| resources.monitoringCoreosComServiceMonitor |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"kafka","namespace":"demo"},"spec":{"endpoints":[{"honorLabels":true,"interval":"10s","path":"/metrics","port":"metrics"}],"namespaceSelector":{"matchNames":["demo"]},"selector":{"matchLabels":{"app.kubernetes.io/instance":"kafka","app.kubernetes.io/name":"kafkas.kubedb.com"}}}}</code>                                                                                                                                                                                                                                                                                                                                                                                                                                |
| resources.secret_admin_cred                 |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"kafka-admin-cred","namespace":"demo"},"stringData":{"password":"WeakPassword","username":"admin"},"type":"kubernetes.io/basic-auth"}</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-kafka-editor bytebuilders-ui/kubedbcom-kafka-editor -n default --create-namespace --version=v0.4.18 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-kafka-editor bytebuilders-ui/kubedbcom-kafka-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
