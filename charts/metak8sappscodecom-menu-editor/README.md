# Menu Editor

[Menu Editor by AppsCode](https://byte.builders) - Menu Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/metak8sappscodecom-menu-editor --version=v0.4.8
$ helm upgrade -i metak8sappscodecom-menu-editor bytebuilders-ui/metak8sappscodecom-menu-editor -n default --create-namespace --version=v0.4.8
```

## Introduction

This chart deploys a Menu Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `metak8sappscodecom-menu-editor`:

```bash
$ helm upgrade -i metak8sappscodecom-menu-editor bytebuilders-ui/metak8sappscodecom-menu-editor -n default --create-namespace --version=v0.4.8
```

The command deploys a Menu Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `metak8sappscodecom-menu-editor`:

```bash
$ helm uninstall metak8sappscodecom-menu-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `metak8sappscodecom-menu-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>meta.k8s.appscode.com/v1alpha1</code> |
| kind               |             | <code>Menu</code>                           |
| metadata.name      |             | <code>menu</code>                           |
| metadata.namespace |             | <code>default</code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i metak8sappscodecom-menu-editor bytebuilders-ui/metak8sappscodecom-menu-editor -n default --create-namespace --version=v0.4.8 --set apiVersion=meta.k8s.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i metak8sappscodecom-menu-editor bytebuilders-ui/metak8sappscodecom-menu-editor -n default --create-namespace --version=v0.4.8 --values values.yaml
```
