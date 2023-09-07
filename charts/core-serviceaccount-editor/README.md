# ServiceAccount Editor

[ServiceAccount Editor by AppsCode](https://byte.builders) - ServiceAccount Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/core-serviceaccount-editor --version=v0.4.17
$ helm upgrade -i core-serviceaccount-editor bytebuilders-ui/core-serviceaccount-editor -n default --create-namespace --version=v0.4.17
```

## Introduction

This chart deploys a ServiceAccount Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `core-serviceaccount-editor`:

```bash
$ helm upgrade -i core-serviceaccount-editor bytebuilders-ui/core-serviceaccount-editor -n default --create-namespace --version=v0.4.17
```

The command deploys a ServiceAccount Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `core-serviceaccount-editor`:

```bash
$ helm uninstall core-serviceaccount-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `core-serviceaccount-editor` chart and their default values.

|     Parameter      | Description |           Default           |
|--------------------|-------------|-----------------------------|
| apiVersion         |             | <code>v1</code>             |
| kind               |             | <code>ServiceAccount</code> |
| metadata.name      |             | <code>serviceaccount</code> |
| metadata.namespace |             | <code>default</code>        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i core-serviceaccount-editor bytebuilders-ui/core-serviceaccount-editor -n default --create-namespace --version=v0.4.17 --set apiVersion=v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i core-serviceaccount-editor bytebuilders-ui/core-serviceaccount-editor -n default --create-namespace --version=v0.4.17 --values values.yaml
```
