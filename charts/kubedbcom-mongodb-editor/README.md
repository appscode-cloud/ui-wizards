# Mongodb Editor

[Mongodb Editor by AppsCode](https://byte.builders) - Mongodb Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install kubedbcom-mongodb-editor bytebuilders-ui/kubedbcom-mongodb-editor -n default --version=v0.1.0
```

## Introduction

This chart deploys a Mongodb Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `kubedbcom-mongodb-editor`:

```console
$ helm install kubedbcom-mongodb-editor bytebuilders-ui/kubedbcom-mongodb-editor -n default --version=v0.1.0
```

The command deploys a Mongodb Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubedbcom-mongodb-editor`:

```console
$ helm delete kubedbcom-mongodb-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-mongodb-editor` chart and their default values.

|                   Parameter                   | Description |                                                                                                                                                                                                                                                                                                                                                Default                                                                                                                                                                                                                                                                                                                                                |
|-----------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                       |             | `kubedb.com`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.version                     |             | `v1alpha2`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.resource.name                        |             | `mongodbs`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.resource.kind                        |             | `MongoDB`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.resource.scope                       |             | `Namespaced`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.release.name                         |             | `RELEASE-NAME`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| metadata.release.namespace                    |             | `default`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| resources.certManagerIoIssuer                 |             | `{"apiVersion":"cert-manager.io/v1","kind":"Issuer","metadata":{"name":"kubedbcom-mongodb-editor","namespace":"demo"},"spec":{"ca":{"secretName":"kubedbcom-mongodb-editor-ca"}}}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| resources.kubedbComMongoDB                    |             | `{"apiVersion":"kubedb.com/v1alpha2","kind":"MongoDB","metadata":{"name":"kubedbcom-mongodb-editor","namespace":"demo"},"spec":{"authSecret":{"name":"kubedbcom-mongodb-editor-auth"},"configSecret":{"name":"kubedbcom-mongodb-editor-config"},"init":{"waitForInitialRestore":true},"monitor":{"agent":"prometheus.io","prometheus":{"exporter":{"resources":{"limits":{"cpu":"100m","memory":"128Mi"},"requests":{"cpu":"100m","memory":"128Mi"}}}}},"sslMode":"requireSSL","storage":{"resources":{"requests":{"storage":"1Gi"}},"storageClassName":"standard"},"storageType":"Durable","terminationPolicy":"WipeOut","tls":{"issuerRef":{"apiGroup":"cert-manager.io","kind":"Issuer","name":"mongo-ca"}},"version":"4.2.3"}}` |
| resources.monitoringCoreosComServiceMonitor   |             | `{"apiVersion":"monitoring.coreos.com/v1","kind":"ServiceMonitor","metadata":{"name":"kubedbcom-mongodb-editor","namespace":"demo"},"spec":{"endpoints":[{"honorLabels":true,"interval":"30s","path":"/metrics","port":"metrics"}],"namespaceSelector":{"matchNames":["demo"]},"selector":{"matchLabels":{"app.kubernetes.io/instance":"kubedbcom-mongodb-editor","app.kubernetes.io/name":"mongodbs.kubedb.com"}}}}`                                                                                                                                                                                                                                                                                                     |
| resources.secretAuth                          |             | `{"apiVersion":"v1","kind":"Secret","metadata":{"name":"kubedbcom-mongodb-editor-auth","namespace":"demo"},"stringData":{"password":"thisIs1StrongPassword","username":"root"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| resources.secretConfig                        |             | `{"apiVersion":"v1","kind":"Secret","metadata":{"name":"kubedbcom-mongodb-editor-config","namespace":"demo"},"stringData":{"mongod.conf":"net:\n  maxIncomingConnections: 20000\n"},"type":"Opaque"}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| resources.stashAppscodeComBackupConfiguration |             | `{"apiVersion":"stash.appscode.com/v1beta1","kind":"BackupConfiguration","metadata":{"name":"kubedbcom-mongodb-editor","namespace":"demo"},"spec":{"repository":{"name":"kubedbcom-mongodb-editor-repo"},"retentionPolicy":{"keepLast":5,"name":"keep-last-5","prune":true},"schedule":"*/5 * * * *","target":{"ref":{"apiVersion":"appcatalog.appscode.com/v1alpha1","kind":"AppBinding","name":"kubedbcom-mongodb-editor"}},"task":{"name":"mongodb-backup-4.2.3-v5"}}}`                                                                                                                                                                                                                                                          |
| resources.stashAppscodeComRepositoryInitRepo  |             | `{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"kubedbcom-mongodb-editor-init-repo","namespace":"demo"},"spec":{"backend":{"gcs":{"bucket":"stash-testing","prefix":"/demo/kubedbcom-mongodb-editor"},"storageSecretName":"gcs-secret"}}}`                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| resources.stashAppscodeComRepositoryRepo      |             | `{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"kubedbcom-mongodb-editor-repo","namespace":"demo"},"spec":{"backend":{"gcs":{"bucket":"stash-testing","prefix":"/demo/kubedbcom-mongodb-editor"},"storageSecretName":"gcs-secret"}}}`                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| resources.stashAppscodeComRestoreSessionInit  |             | `{"apiVersion":"stash.appscode.com/v1beta1","kind":"RestoreSession","metadata":{"name":"kubedbcom-mongodb-editor-init","namespace":"demo"},"spec":{"repository":{"name":"kubedbcom-mongodb-editor-init-repo"},"rules":[{"snapshots":["latest"]}],"target":{"ref":{"apiVersion":"appcatalog.appscode.com/v1alpha1","kind":"AppBinding","name":"kubedbcom-mongodb-editor"}},"task":{"name":"mongodb-restore-4.2.3-v5"}}}`                                                                                                                                                                                                                                                                                                             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubedbcom-mongodb-editor bytebuilders-ui/kubedbcom-mongodb-editor -n default --version=v0.1.0 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubedbcom-mongodb-editor bytebuilders-ui/kubedbcom-mongodb-editor -n default --version=v0.1.0 --values values.yaml
```
