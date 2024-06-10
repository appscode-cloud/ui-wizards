# ManagedProxyServiceResolver Editor

[ManagedProxyServiceResolver Editor by AppsCode](https://byte.builders) - ManagedProxyServiceResolver Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/proxyopenclustermanagementio-managedproxyserviceresolver-editor --version=v0.4.21
$ helm upgrade -i proxyopenclustermanagementio-managedproxyserviceresolver-editor appscode-charts-oci/proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default --create-namespace --version=v0.4.21
```

## Introduction

This chart deploys a ManagedProxyServiceResolver Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `proxyopenclustermanagementio-managedproxyserviceresolver-editor`:

```bash
$ helm upgrade -i proxyopenclustermanagementio-managedproxyserviceresolver-editor appscode-charts-oci/proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default --create-namespace --version=v0.4.21
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
$ helm upgrade -i proxyopenclustermanagementio-managedproxyserviceresolver-editor appscode-charts-oci/proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default --create-namespace --version=v0.4.21 --set apiVersion=proxy.open-cluster-management.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i proxyopenclustermanagementio-managedproxyserviceresolver-editor appscode-charts-oci/proxyopenclustermanagementio-managedproxyserviceresolver-editor -n default --create-namespace --version=v0.4.21 --values values.yaml
```
