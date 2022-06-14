# ClusterIssuer Editor

[ClusterIssuer Editor by AppsCode](https://byte.builders) - ClusterIssuer Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/certmanagerio-clusterissuer-editor --version=v0.4.8
$ helm upgrade -i certmanagerio-clusterissuer-editor bytebuilders-ui/certmanagerio-clusterissuer-editor -n default --create-namespace --version=v0.4.8
```

## Introduction

This chart deploys a ClusterIssuer Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `certmanagerio-clusterissuer-editor`:

```bash
$ helm upgrade -i certmanagerio-clusterissuer-editor bytebuilders-ui/certmanagerio-clusterissuer-editor -n default --create-namespace --version=v0.4.8
```

The command deploys a ClusterIssuer Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `certmanagerio-clusterissuer-editor`:

```bash
$ helm uninstall certmanagerio-clusterissuer-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `certmanagerio-clusterissuer-editor` chart and their default values.

|     Parameter      | Description |             Default             |
|--------------------|-------------|---------------------------------|
| apiVersion         |             | <code>cert-manager.io/v1</code> |
| kind               |             | <code>ClusterIssuer</code>      |
| metadata.name      |             | <code>clusterissuer</code>      |
| metadata.namespace |             | <code>""</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i certmanagerio-clusterissuer-editor bytebuilders-ui/certmanagerio-clusterissuer-editor -n default --create-namespace --version=v0.4.8 --set apiVersion=cert-manager.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i certmanagerio-clusterissuer-editor bytebuilders-ui/certmanagerio-clusterissuer-editor -n default --create-namespace --version=v0.4.8 --values values.yaml
```
