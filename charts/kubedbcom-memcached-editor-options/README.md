# Memcached Editor UI Options

[Memcached Editor UI Options](https://byte.builders) - Memcached Editor UI Options

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system
```

## Introduction

This chart deploys a Memcached Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `kubedbcom-memcached-editor-options`:

```console
$ helm install kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system
```

The command deploys a Memcached Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubedbcom-memcached-editor-options`:

```console
$ helm delete kubedbcom-memcached-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-memcached-editor-options` chart and their default values.

|          Parameter           |                    Description                     |   Default    |
|------------------------------|----------------------------------------------------|--------------|
| metadata.resource.group      |                                                    | `kubedb.com` |
| metadata.resource.kind       |                                                    | `Memcached`  |
| metadata.resource.name       |                                                    | `memcacheds` |
| metadata.resource.scope      |                                                    | `Namespaced` |
| metadata.resource.version    |                                                    | `v1alpha2`   |
| metadata.release.name        | Release name                                       | `""`         |
| metadata.release.namespace   | Release namespace                                  | `""`         |
| spec.version                 | List options                                       | `1.5.4-v1`   |
| spec.annotations             | Annotations to add to the database custom resource | `{}`         |
| spec.labels                  | Labels to add to all the template objects          | `{}`         |
| spec.mode                    | Standalone                                         | `Standalone` |
| spec.replicas                |                                                    | `1`          |
| spec.terminationPolicy       |                                                    | `WipeOut`    |
| spec.machine                 |                                                    | `""`         |
| spec.resources.limits.cpu    |                                                    | `".5"`       |
| spec.resources.limits.memory |                                                    | `1024Mi`     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --values values.yaml
```
