# PerconaXtraDB Editor

[PerconaXtraDB Editor by AppsCode](https://byte.builders) - PerconaXtraDB Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install kubedbcom-perconaxtradb-editor bytebuilders-ui/kubedbcom-perconaxtradb-editor -n default
```

## Introduction

This chart deploys a PerconaXtraDB Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `kubedbcom-perconaxtradb-editor`:

```console
$ helm install kubedbcom-perconaxtradb-editor bytebuilders-ui/kubedbcom-perconaxtradb-editor -n default
```

The command deploys a PerconaXtraDB Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubedbcom-perconaxtradb-editor`:

```console
$ helm delete kubedbcom-perconaxtradb-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-perconaxtradb-editor` chart and their default values.

|     Parameter      | Description |             Default              |
|--------------------|-------------|----------------------------------|
| apiVersion         |             | <code>kubedb.com/v1alpha2</code> |
| kind               |             | <code>PerconaXtraDB</code>       |
| metadata.name      |             | <code>perconaxtradb</code>       |
| metadata.namespace |             | <code>default</code>             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubedbcom-perconaxtradb-editor bytebuilders-ui/kubedbcom-perconaxtradb-editor -n default --set apiVersion=kubedb.com/v1alpha2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubedbcom-perconaxtradb-editor bytebuilders-ui/kubedbcom-perconaxtradb-editor -n default --values values.yaml
```
