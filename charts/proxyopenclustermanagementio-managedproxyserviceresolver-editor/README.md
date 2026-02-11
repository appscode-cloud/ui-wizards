# ManagedProxyServiceResolver Editor

[ManagedProxyServiceResolver Editor by AppsCode](https://appscode.com) - ManagedProxyServiceResolver Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/proxyopenclustermanagementio-managedproxyserviceresolver-editor --version=v0.30.0
$ helm upgrade -i proxyopenclustermanagementio-managedproxyserviceresolver-editor appscode/proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a ManagedProxyServiceResolver Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `proxyopenclustermanagementio-managedproxyserviceresolver-editor`:

```bash
$ helm upgrade -i proxyopenclustermanagementio-managedproxyserviceresolver-editor appscode/proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a ManagedProxyServiceResolver Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `proxyopenclustermanagementio-managedproxyserviceresolver-editor`:

```bash
$ helm uninstall proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `proxyopenclustermanagementio-managedproxyserviceresolver-editor` chart and their default values.

|     Parameter      | Description |                        Default                         |
|--------------------|-------------|--------------------------------------------------------|
| apiVersion         |             | <code>proxy.open-cluster-management.io/v1alpha1</code> |
| kind               |             | <code>ManagedProxyServiceResolver</code>               |
| metadata.name      |             | <code>managedproxyserviceresolver</code>               |
| metadata.namespace |             | <code>""</code>                                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i proxyopenclustermanagementio-managedproxyserviceresolver-editor appscode/proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=proxy.open-cluster-management.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i proxyopenclustermanagementio-managedproxyserviceresolver-editor appscode/proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
