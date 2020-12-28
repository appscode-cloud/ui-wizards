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

|                  Parameter                  |                                                      Description                                                       |   Default    |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------|--------------|
| version                                     | List options                                                                                                           | `3.4.17`     |
| mode                                        | Standalone, Replicaset, Sharded                                                                                        | `Standalone` |
| replicas                                    |                                                                                                                        | `3`          |
| replicaSet.name                             |                                                                                                                        | `rs0`        |
| shardTopology.shard.replicas                |                                                                                                                        | `3`          |
| shardTopology.shard.shards                  |                                                                                                                        | `3`          |
| shardTopology.shard.persistence.size        |                                                                                                                        | `10Gi`       |
| shardTopology.configServer.replicas         |                                                                                                                        | `3`          |
| shardTopology.configServer.persistence.size |                                                                                                                        | `2Gi`        |
| shardTopology.mongos.replicas               |                                                                                                                        | `3`          |
| clusterAuthMode                             | "keyFile", "sendKeyFile", "sendX509", "x509"                                                                           | `keyFile`    |
| sslMode                                     | "disabled", "allowSSL", "preferSSL", "requireSSL"                                                                      | `disabled`   |
| terminationPolicy                           |                                                                                                                        | `WipeOut`    |
| storageClass.name                           |                                                                                                                        | `standard`   |
| persistence.size                            |                                                                                                                        | `10Gi`       |
| machine                                     |                                                                                                                        | `db.t.micro` |
| resources                                   |                                                                                                                        | ``           |
| authSecret.create                           |                                                                                                                        | `true`       |
| authSecret.annotations                      |                                                                                                                        | `{}`         |
| authSecret.name                             |                                                                                                                        | `""`         |
| authSecret.password                         |                                                                                                                        | `""`         |
| serviceAccount.create                       | Specifies whether a service account should be created                                                                  | `true`       |
| serviceAccount.annotations                  | Annotations to add to the service account                                                                              | `{}`         |
| serviceAccount.name                         | The name of the service account to use. If not set and create is true, a name is generated using the fullname template | `""`         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install mongodb-editor-options bytebuilders-ui/mongodb-editor-options -n kube-system --set version=3.4.17
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install mongodb-editor-options bytebuilders-ui/mongodb-editor-options -n kube-system --values values.yaml
```
