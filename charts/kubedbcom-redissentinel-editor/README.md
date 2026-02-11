# RedisSentinel Editor

[RedisSentinel Editor by AppsCode](https://appscode.com) - RedisSentinel Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/kubedbcom-redissentinel-editor --version=v0.30.0
$ helm upgrade -i kubedbcom-redissentinel-editor appscode/kubedbcom-redissentinel-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a RedisSentinel Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-redissentinel-editor`:

```bash
$ helm upgrade -i kubedbcom-redissentinel-editor appscode/kubedbcom-redissentinel-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a RedisSentinel Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-redissentinel-editor`:

```bash
$ helm uninstall kubedbcom-redissentinel-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-redissentinel-editor` chart and their default values.

|                     Parameter                     | Description |                                                                                                                                                                                                                                                                                                                         Default                                                                                                                                                                                                                                                                                                                          |
|---------------------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                           |             | <code>kubedb.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.resource.version                         |             | <code>v1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.name                            |             | <code>redissentinels</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.kind                            |             | <code>RedisSentinel</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.scope                           |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.release.name                             |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| metadata.release.namespace                        |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| resources.certManagerIoIssuer_redis_ca            |             | <code>{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"redis-ca","namespace":"demo"},"spec":{"ca":{"secretName":"redis-ca"}}}</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| resources.gitopsKubedbComRedisSentinel            |             | <code>{"apiVersion":"gitops.kubedb.com/v1alpha1","kind":"RedisSentinel","metadata":{"name":"redissentinel","namespace":"demo"},"spec":{"authSecret":{"name":"redissentinel-auth"},"deletionPolicy":"WipeOut","monitor":{"agent":"prometheus.io","prometheus":{"exporter":{"resources":{"limits":{"cpu":"100m","memory":"128Mi"},"requests":{"cpu":"100m","memory":"128Mi"}}}}},"replicas":3,"storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"1Gi"}},"storageClassName":"standard"},"storageType":"Durable","tls":{"issuerRef":{"apiGroup":"cert-manager.io","kind":"Issuer","name":"redis-ca"}},"version":"6.2.5"}}</code> |
| resources.kubedbComRedisSentinel                  |             | <code>{"apiVersion":"kubedb.com/v1","kind":"RedisSentinel","metadata":{"name":"redissentinel","namespace":"demo"},"spec":{"authSecret":{"name":"redissentinel-auth"},"deletionPolicy":"WipeOut","monitor":{"agent":"prometheus.io","prometheus":{"exporter":{"resources":{"limits":{"cpu":"100m","memory":"128Mi"},"requests":{"cpu":"100m","memory":"128Mi"}}}}},"replicas":3,"storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"1Gi"}},"storageClassName":"standard"},"storageType":"Durable","tls":{"issuerRef":{"apiGroup":"cert-manager.io","kind":"Issuer","name":"redis-ca"}},"version":"6.2.5"}}</code>              |
| resources.monitoringCoreosComServiceMonitor_redis |             | <code>{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"redis","namespace":"demo"},"spec":{"endpoints":[{"honorLabels":true,"interval":"30s","path":"/metrics","port":"metrics"}],"namespaceSelector":{"matchNames":["demo"]},"selector":{"matchLabels":{"app.kubernetes.io/instance":"redis","app.kubernetes.io/name":"redises.kubedb.com"}}}}</code>                                                                                                                                                                                                                                                                |
| resources.secret_auth                             |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"redissentinel-auth","namespace":"demo"},"stringData":{"password":"thisIs1StrongPassword","username":"root"},"type":"Opaque"}</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-redissentinel-editor appscode/kubedbcom-redissentinel-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-redissentinel-editor appscode/kubedbcom-redissentinel-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
