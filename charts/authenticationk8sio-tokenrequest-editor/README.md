# TokenRequest Editor

[TokenRequest Editor by AppsCode](https://appscode.com) - TokenRequest Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/authenticationk8sio-tokenrequest-editor --version=v0.30.0
$ helm upgrade -i authenticationk8sio-tokenrequest-editor appscode/authenticationk8sio-tokenrequest-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a TokenRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `authenticationk8sio-tokenrequest-editor`:

```bash
$ helm upgrade -i authenticationk8sio-tokenrequest-editor appscode/authenticationk8sio-tokenrequest-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a TokenRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `authenticationk8sio-tokenrequest-editor`:

```bash
$ helm uninstall authenticationk8sio-tokenrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `authenticationk8sio-tokenrequest-editor` chart and their default values.

|     Parameter      | Description |                Default                |
|--------------------|-------------|---------------------------------------|
| apiVersion         |             | <code>authentication.k8s.io/v1</code> |
| kind               |             | <code>TokenRequest</code>             |
| metadata.name      |             | <code>tokenrequest</code>             |
| metadata.namespace |             | <code>default</code>                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i authenticationk8sio-tokenrequest-editor appscode/authenticationk8sio-tokenrequest-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=authentication.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i authenticationk8sio-tokenrequest-editor appscode/authenticationk8sio-tokenrequest-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
