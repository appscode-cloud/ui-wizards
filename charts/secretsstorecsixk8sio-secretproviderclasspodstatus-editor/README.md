# SecretProviderClassPodStatus Editor

[SecretProviderClassPodStatus Editor by AppsCode](https://appscode.com) - SecretProviderClassPodStatus Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/secretsstorecsixk8sio-secretproviderclasspodstatus-editor --version=v0.30.0
$ helm upgrade -i secretsstorecsixk8sio-secretproviderclasspodstatus-editor appscode/secretsstorecsixk8sio-secretproviderclasspodstatus-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a SecretProviderClassPodStatus Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `secretsstorecsixk8sio-secretproviderclasspodstatus-editor`:

```bash
$ helm upgrade -i secretsstorecsixk8sio-secretproviderclasspodstatus-editor appscode/secretsstorecsixk8sio-secretproviderclasspodstatus-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a SecretProviderClassPodStatus Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `secretsstorecsixk8sio-secretproviderclasspodstatus-editor`:

```bash
$ helm uninstall secretsstorecsixk8sio-secretproviderclasspodstatus-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `secretsstorecsixk8sio-secretproviderclasspodstatus-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>secrets-store.csi.x-k8s.io/v1</code> |
| kind               |             | <code>SecretProviderClassPodStatus</code>  |
| metadata.name      |             | <code>secretproviderclasspodstatus</code>  |
| metadata.namespace |             | <code>default</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i secretsstorecsixk8sio-secretproviderclasspodstatus-editor appscode/secretsstorecsixk8sio-secretproviderclasspodstatus-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=secrets-store.csi.x-k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i secretsstorecsixk8sio-secretproviderclasspodstatus-editor appscode/secretsstorecsixk8sio-secretproviderclasspodstatus-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
