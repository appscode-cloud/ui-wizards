# RedisSentinel Editor

[RedisSentinel Editor by AppsCode](https://byte.builders) - RedisSentinel Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install kubedbcom-redissentinel-editor bytebuilders-ui/kubedbcom-redissentinel-editor -n default
```

## Introduction

This chart deploys a RedisSentinel Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `kubedbcom-redissentinel-editor`:

```console
$ helm install kubedbcom-redissentinel-editor bytebuilders-ui/kubedbcom-redissentinel-editor -n default
```

The command deploys a RedisSentinel Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubedbcom-redissentinel-editor`:

```console
$ helm delete kubedbcom-redissentinel-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-redissentinel-editor` chart and their default values.

|                     Parameter                     | Description |                                                                                                                                                                                                                                                                                                                             Default                                                                                                                                                                                                                                                                                                                              |
|---------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                           |             | `kubedb.com`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.resource.version                         |             | `v1alpha2`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| metadata.resource.name                            |             | `redissentinels`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.kind                            |             | `RedisSentinel`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.resource.scope                           |             | `Namespaced`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.release.name                             |             | `RELEASE-NAME`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| metadata.release.namespace                        |             | `default`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| resources.certManagerIoIssuer_redis_ca            |             | `{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"redis-ca","namespace":"demo"},"spec":{"ca":{"secretName":"redis-ca"}}}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| resources.kubedbComRedisSentinel                  |             | `{"apiVersion":"kubedb.com/v1alpha2","kind":"RedisSentinel","metadata":{"name":"redissentinel","namespace":"demo"},"spec":{"authSecret":{"name":"redissentinel-auth"},"configSecret":{"name":"redissentinel-config"},"monitor":{"agent":"prometheus.io","prometheus":{"exporter":{"resources":{"limits":{"cpu":"100m","memory":"128Mi"},"requests":{"cpu":"100m","memory":"128Mi"}}}}},"replicas":3,"storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"1Gi"}},"storageClassName":"standard"},"terminationPolicy":"WipeOut","tls":{"issuerRef":{"apiGroup":"cert-manager.io","kind":"Issuer","name":"redis-ca"}},"version":"6.2.5"}}` |
| resources.monitoringCoreosComServiceMonitor_redis |             | `{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"redis","namespace":"demo"},"spec":{"endpoints":[{"honorLabels":true,"interval":"30s","path":"/metrics","port":"metrics"}],"namespaceSelector":{"matchNames":["demo"]},"selector":{"matchLabels":{"app.kubernetes.io/instance":"redis","app.kubernetes.io/name":"redises.kubedb.com"}}}}`                                                                                                                                                                                                                                                                                   |
| resources.secret_auth                             |             | `{"apiVersion":"v1","kind":"Secret","metadata":{"name":"redissentinel-auth","namespace":"demo"},"stringData":{"password":"thisIs1StrongPassword","username":"root"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| resources.secret_config                           |             | `{"apiVersion":"v1","kind":"Secret","metadata":{"name":"redissentinel-config","namespace":"demo"},"stringData":{"redis.conf":"databases 10\nmaxclients 500\n"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubedbcom-redissentinel-editor bytebuilders-ui/kubedbcom-redissentinel-editor -n default --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubedbcom-redissentinel-editor bytebuilders-ui/kubedbcom-redissentinel-editor -n default --values values.yaml
```
