# MySQL Editor UI Options

[MySQL Editor UI Options](https://byte.builders) - MySQL Editor UI Options

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install kubedbcom-mysql-editor-options bytebuilders-ui/kubedbcom-mysql-editor-options -n kube-system
```

## Introduction

This chart deploys a MySQL Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `kubedbcom-mysql-editor-options`:

```console
$ helm install kubedbcom-mysql-editor-options bytebuilders-ui/kubedbcom-mysql-editor-options -n kube-system
```

The command deploys a MySQL Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubedbcom-mysql-editor-options`:

```console
$ helm delete kubedbcom-mysql-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-mysql-editor-options` chart and their default values.

|             Parameter              |                    Description                     |         Default         |
|------------------------------------|----------------------------------------------------|-------------------------|
| metadata.resource.group            |                                                    | <code>kubedb.com</code> |
| metadata.resource.kind             |                                                    | <code>MySQL</code>      |
| metadata.resource.name             |                                                    | <code>mysqls</code>     |
| metadata.resource.scope            |                                                    | <code>Namespaced</code> |
| metadata.resource.version          |                                                    | <code>v1alpha2</code>   |
| metadata.release.name              | Release name                                       | <code>""</code>         |
| metadata.release.namespace         | Release namespace                                  | <code>""</code>         |
| spec.version                       | List options                                       | <code>8.0.23-v1</code>  |
| spec.annotations                   | Annotations to add to the database custom resource | <code>{}</code>         |
| spec.labels                        | Labels to add to all the template objects          | <code>{}</code>         |
| spec.mode                          | Standalone, GroupReplication, InnoDBCluster        | <code>Standalone</code> |
| spec.replicas                      |                                                    | <code>3</code>          |
| spec.innoDBCluster.router.replicas |                                                    | <code>3</code>          |
| spec.terminationPolicy             |                                                    | <code>WipeOut</code>    |
| spec.storageClass.name             |                                                    | <code>standard</code>   |
| spec.persistence.size              |                                                    | <code>10Gi</code>       |
| spec.machine                       |                                                    | <code>""</code>         |
| spec.resources.limits.cpu          |                                                    | <code>".5"</code>       |
| spec.resources.limits.memory       |                                                    | <code>1024Mi</code>     |
| spec.authSecret.name               |                                                    | <code>""</code>         |
| spec.authSecret.password           |                                                    | <code>""</code>         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubedbcom-mysql-editor-options bytebuilders-ui/kubedbcom-mysql-editor-options -n kube-system --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubedbcom-mysql-editor-options bytebuilders-ui/kubedbcom-mysql-editor-options -n kube-system --values values.yaml
```
