# MemcachedOpsRequest Editor

[MemcachedOpsRequest Editor by AppsCode](https://byte.builders) - MemcachedOpsRequest Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install opskubedbcom-memcachedopsrequest-editor bytebuilders-ui/opskubedbcom-memcachedopsrequest-editor -n default
```

## Introduction

This chart deploys a MemcachedOpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `opskubedbcom-memcachedopsrequest-editor`:

```console
$ helm install opskubedbcom-memcachedopsrequest-editor bytebuilders-ui/opskubedbcom-memcachedopsrequest-editor -n default
```

The command deploys a MemcachedOpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `opskubedbcom-memcachedopsrequest-editor`:

```console
$ helm delete opskubedbcom-memcachedopsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-memcachedopsrequest-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>ops.kubedb.com/v1alpha1</code> |
| kind               |             | <code>MemcachedOpsRequest</code>     |
| metadata.name      |             | <code>memcachedopsrequest</code>     |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install opskubedbcom-memcachedopsrequest-editor bytebuilders-ui/opskubedbcom-memcachedopsrequest-editor -n default --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install opskubedbcom-memcachedopsrequest-editor bytebuilders-ui/opskubedbcom-memcachedopsrequest-editor -n default --values values.yaml
```
