# MongoDB Editor UI Options

[MongoDB Editor UI Options](https://byte.builders) - MongoDB Editor UI Options

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install mongodb-editor-options bytebuilders-ui/mongodb-editor-options -n kube-system
```

## Introduction

This chart deploys a MongoDB Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `mongodb-editor-options`:

```console
$ helm install mongodb-editor-options bytebuilders-ui/mongodb-editor-options -n kube-system
```

The command deploys a MongoDB Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `mongodb-editor-options`:

```console
$ helm delete mongodb-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `mongodb-editor-options` chart and their default values.

|                    Parameter                     |                                                      Description                                                       |   Default    |
|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|--------------|
| metadata.release.name                            | Release name                                                                                                           | ``           |
| metadata.release.namespace                       | Release namespace                                                                                                      | ``           |
| spec.version                                     | List options                                                                                                           | `3.4.17`     |
| spec.mode                                        | Standalone, Replicaset, Sharded                                                                                        | `Standalone` |
| spec.replicas                                    |                                                                                                                        | `3`          |
| spec.replicaSet.name                             |                                                                                                                        | `rs0`        |
| spec.shardTopology.shard.replicas                |                                                                                                                        | `3`          |
| spec.shardTopology.shard.shards                  |                                                                                                                        | `3`          |
| spec.shardTopology.shard.persistence.size        |                                                                                                                        | `10Gi`       |
| spec.shardTopology.configServer.replicas         |                                                                                                                        | `3`          |
| spec.shardTopology.configServer.persistence.size |                                                                                                                        | `2Gi`        |
| spec.shardTopology.mongos.replicas               |                                                                                                                        | `3`          |
| spec.clusterAuthMode                             | "keyFile", "sendKeyFile", "sendX509", "x509"                                                                           | `keyFile`    |
| spec.sslMode                                     | "disabled", "allowSSL", "preferSSL", "requireSSL"                                                                      | `disabled`   |
| spec.terminationPolicy                           |                                                                                                                        | `WipeOut`    |
| spec.storageClass.name                           |                                                                                                                        | `standard`   |
| spec.persistence.size                            |                                                                                                                        | `10Gi`       |
| spec.machine                                     |                                                                                                                        | `db.t.micro` |
| spec.resources                                   |                                                                                                                        | ``           |
| spec.authSecret.create                           |                                                                                                                        | `true`       |
| spec.authSecret.annotations                      |                                                                                                                        | `{}`         |
| spec.authSecret.name                             |                                                                                                                        | `""`         |
| spec.authSecret.password                         |                                                                                                                        | `""`         |
| spec.serviceAccount.create                       | Specifies whether a service account should be created                                                                  | `true`       |
| spec.serviceAccount.annotations                  | Annotations to add to the service account                                                                              | `{}`         |
| spec.serviceAccount.name                         | The name of the service account to use. If not set and create is true, a name is generated using the fullname template | `""`         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install mongodb-editor-options bytebuilders-ui/mongodb-editor-options -n kube-system --set spec.version=3.4.17
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install mongodb-editor-options bytebuilders-ui/mongodb-editor-options -n kube-system --values values.yaml
```
