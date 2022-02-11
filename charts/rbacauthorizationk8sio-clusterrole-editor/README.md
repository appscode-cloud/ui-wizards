# ClusterRole Editor

[ClusterRole Editor by AppsCode](https://byte.builders) - ClusterRole Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install rbacauthorizationk8sio-clusterrole-editor bytebuilders-ui/rbacauthorizationk8sio-clusterrole-editor -n default
```

## Introduction

This chart deploys a ClusterRole Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `rbacauthorizationk8sio-clusterrole-editor`:

```console
$ helm install rbacauthorizationk8sio-clusterrole-editor bytebuilders-ui/rbacauthorizationk8sio-clusterrole-editor -n default
```

The command deploys a ClusterRole Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `rbacauthorizationk8sio-clusterrole-editor`:

```console
$ helm delete rbacauthorizationk8sio-clusterrole-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `rbacauthorizationk8sio-clusterrole-editor` chart and their default values.

|   Parameter   | Description |                  Default                  |
|---------------|-------------|-------------------------------------------|
| apiVersion    |             | <code>rbac.authorization.k8s.io/v1</code> |
| kind          |             | <code>ClusterRole</code>                  |
| metadata.name |             | <code>clusterrole</code>                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install rbacauthorizationk8sio-clusterrole-editor bytebuilders-ui/rbacauthorizationk8sio-clusterrole-editor -n default --set apiVersion=rbac.authorization.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install rbacauthorizationk8sio-clusterrole-editor bytebuilders-ui/rbacauthorizationk8sio-clusterrole-editor -n default --values values.yaml
```
