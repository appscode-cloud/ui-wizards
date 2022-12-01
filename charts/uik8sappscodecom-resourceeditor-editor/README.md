# ResourceEditor Editor

[ResourceEditor Editor by AppsCode](https://byte.builders) - ResourceEditor Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/uik8sappscodecom-resourceeditor-editor --version=v0.4.12
$ helm upgrade -i uik8sappscodecom-resourceeditor-editor bytebuilders-ui/uik8sappscodecom-resourceeditor-editor -n default --create-namespace --version=v0.4.12
```

## Introduction

This chart deploys a ResourceEditor Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-resourceeditor-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-resourceeditor-editor bytebuilders-ui/uik8sappscodecom-resourceeditor-editor -n default --create-namespace --version=v0.4.12
```

The command deploys a ResourceEditor Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-resourceeditor-editor`:

```bash
$ helm uninstall uik8sappscodecom-resourceeditor-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-resourceeditor-editor` chart and their default values.

|     Parameter      | Description |                  Default                  |
|--------------------|-------------|-------------------------------------------|
| apiVersion         |             | <code>ui.k8s.appscode.com/v1alpha1</code> |
| kind               |             | <code>ResourceEditor</code>               |
| metadata.name      |             | <code>resourceeditor</code>               |
| metadata.namespace |             | <code>""</code>                           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-resourceeditor-editor bytebuilders-ui/uik8sappscodecom-resourceeditor-editor -n default --create-namespace --version=v0.4.12 --set apiVersion=ui.k8s.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-resourceeditor-editor bytebuilders-ui/uik8sappscodecom-resourceeditor-editor -n default --create-namespace --version=v0.4.12 --values values.yaml
```
