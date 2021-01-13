# Mongodb Editor

[Mongodb Editor by AppsCode](https://byte.builders) - Mongodb Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install mongodb-editor bytebuilders-ui/mongodb-editor -n default --version=v0.1.0
```

## Introduction

This chart deploys a Mongodb Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `mongodb-editor`:

```console
$ helm install mongodb-editor bytebuilders-ui/mongodb-editor -n default --version=v0.1.0
```

The command deploys a Mongodb Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `mongodb-editor`:

```console
$ helm delete mongodb-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `mongodb-editor` chart and their default values.

|              Parameter              | Description |                                                                                                                                                                                                                                                                                                                                                                                                                                                       Default                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|-------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| appApplication                      |             | `{"apiVersion":"app.k8s.io/v1beta1","kind":"Application","metadata":{"name":"mongodb-editor","namespace":"default"},"spec":{"assemblyPhase":"Ready","componentKinds":[{"group":"app.k8s.io","kind":"Application"},{"group":"kubedb.com","kind":"MongoDB"},{"group":"","kind":"ServiceAccount"},{"group":"stash.appscode.com","kind":"BackupConfiguration"},{"group":"stash.appscode.com","kind":"Repository"},{"group":"","kind":"Secret"}],"descriptor":{"description":"MongoDB Editor UI Options","icons":[{"src":"https://cdn.appscode.com/images/products/kubedb/kubedb-community-icon.png","type":"image/png"}],"links":[{"description":"website","url":"https://byte.builders"}],"maintainers":[{"email":"support@appscode.com","name":"appscode"}],"type":"mongodbs.kubedb.com"},"selector":{"matchLabels":{"app.kubernetes.io/instance":"mongodb-editor","app.kubernetes.io/name":"mongodbs.kubedb.com"}}}}` |
| kubedbComMongoDB                    |             | `{"apiVersion":"kubedb.com/v1alpha2","kind":"MongoDB","metadata":{"name":"mongodb-editor","namespace":"default"},"spec":{"clusterAuthMode":"keyFile","shardTopology":{"configServer":{"replicas":3,"storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"10Gi"}}}},"mongos":{"replicas":2},"shard":{"replicas":3,"shards":3,"storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"10Gi"}}}}},"sslMode":"disabled","storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"10Gi"}}},"storageType":"Durable","terminationPolicy":"WipeOut","version":"3.4.17"}}`                                                                                                                                                                                                                                                                              |
| secret                              |             | `{"apiVersion":"v1","data":null,"kind":"Secret","metadata":{"name":"mongodb-editor","namespace":"default"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| serviceAccount                      |             | `{"apiVersion":"v1","kind":"ServiceAccount","metadata":{"name":"mongodb-editor","namespace":"default"}}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| stashAppscodeComBackupConfiguration |             | `{"apiVersion":"stash.appscode.com/v1beta1","kind":"BackupConfiguration","metadata":{"name":"mongodb-editor","namespace":"default"},"spec":{"repository":{"name":"mongodb-editor"},"retentionPolicy":{"keepLast":5,"name":"keep-last-5","prune":true},"runtimeSettings":{"container":{"resources":{},"securityContext":{}},"pod":{"securityContext":{}}},"schedule":"0 */8 * * *","target":{"ref":{"apiVersion":"appcatalog.appscode.com/v1alpha1","kind":"AppBinding","name":"mongodb-editor"}},"task":{"name":"mongodb-backup-3.4.17"}}}`                                                                                                                                                                                                                                                                                                                                                                          |
| stashAppscodeComRepository          |             | `{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"mongodb-editor","namespace":"default"},"spec":{"backend":{"s3":{"bucket":"kubedb-demo","prefix":"/profiles"},"storageSecretName":"mongodb-editor"}}}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install mongodb-editor bytebuilders-ui/mongodb-editor -n default --version=v0.1.0 --set appApplication={"apiVersion":"app.k8s.io/v1beta1","kind":"Application","metadata":{"name":"mongodb-editor","namespace":"default"},"spec":{"assemblyPhase":"Ready","componentKinds":[{"group":"app.k8s.io","kind":"Application"},{"group":"kubedb.com","kind":"MongoDB"},{"group":"","kind":"ServiceAccount"},{"group":"stash.appscode.com","kind":"BackupConfiguration"},{"group":"stash.appscode.com","kind":"Repository"},{"group":"","kind":"Secret"}],"descriptor":{"description":"MongoDB Editor UI Options","icons":[{"src":"https://cdn.appscode.com/images/products/kubedb/kubedb-community-icon.png","type":"image/png"}],"links":[{"description":"website","url":"https://byte.builders"}],"maintainers":[{"email":"support@appscode.com","name":"appscode"}],"type":"mongodbs.kubedb.com"},"selector":{"matchLabels":{"app.kubernetes.io/instance":"mongodb-editor","app.kubernetes.io/name":"mongodbs.kubedb.com"}}}}
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install mongodb-editor bytebuilders-ui/mongodb-editor -n default --version=v0.1.0 --values values.yaml
```
