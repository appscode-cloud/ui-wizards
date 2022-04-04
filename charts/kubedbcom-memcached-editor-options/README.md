# Memcached Editor UI Options

[Memcached Editor UI Options](https://byte.builders) - Memcached Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-memcached-editor-options --version=v0.4.2
$ helm upgrade -i kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --create-namespace --version=v0.4.2
```

## Introduction

This chart deploys a Memcached Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-memcached-editor-options`:

```bash
$ helm upgrade -i kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --create-namespace --version=v0.4.2
```

The command deploys a Memcached Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-memcached-editor-options`:

```bash
$ helm uninstall kubedbcom-memcached-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-memcached-editor-options` chart and their default values.

|          Parameter           |                    Description                     |         Default         |
|------------------------------|----------------------------------------------------|-------------------------|
| metadata.resource.group      |                                                    | <code>kubedb.com</code> |
| metadata.resource.kind       |                                                    | <code>Memcached</code>  |
| metadata.resource.name       |                                                    | <code>memcacheds</code> |
| metadata.resource.scope      |                                                    | <code>Namespaced</code> |
| metadata.resource.version    |                                                    | <code>v1alpha2</code>   |
| metadata.release.name        | Release name                                       | <code>""</code>         |
| metadata.release.namespace   | Release namespace                                  | <code>""</code>         |
| spec.version                 | List options                                       | <code>1.5.4-v1</code>   |
| spec.annotations             | Annotations to add to the database custom resource | <code>{}</code>         |
| spec.labels                  | Labels to add to all the template objects          | <code>{}</code>         |
| spec.replicas                | Standalone mode: Standalone                        | <code>1</code>          |
| spec.terminationPolicy       |                                                    | <code>WipeOut</code>    |
| spec.machine                 |                                                    | <code>""</code>         |
| spec.resources.limits.cpu    |                                                    | <code>500m</code>       |
| spec.resources.limits.memory |                                                    | <code>1Gi</code>        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --create-namespace --version=v0.4.2 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-memcached-editor-options bytebuilders-ui/kubedbcom-memcached-editor-options -n kube-system --create-namespace --version=v0.4.2 --values values.yaml
```
