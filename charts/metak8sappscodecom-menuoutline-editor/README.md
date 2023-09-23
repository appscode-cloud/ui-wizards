# MenuOutline Editor

[MenuOutline Editor by AppsCode](https://byte.builders) - MenuOutline Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/metak8sappscodecom-menuoutline-editor --version=v0.4.18
$ helm upgrade -i metak8sappscodecom-menuoutline-editor bytebuilders-ui/metak8sappscodecom-menuoutline-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a MenuOutline Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `metak8sappscodecom-menuoutline-editor`:

```bash
$ helm upgrade -i metak8sappscodecom-menuoutline-editor bytebuilders-ui/metak8sappscodecom-menuoutline-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a MenuOutline Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `metak8sappscodecom-menuoutline-editor`:

```bash
$ helm uninstall metak8sappscodecom-menuoutline-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `metak8sappscodecom-menuoutline-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>meta.k8s.appscode.com/v1alpha1</code> |
| kind               |             | <code>MenuOutline</code>                    |
| metadata.name      |             | <code>menuoutline</code>                    |
| metadata.namespace |             | <code>default</code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i metak8sappscodecom-menuoutline-editor bytebuilders-ui/metak8sappscodecom-menuoutline-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=meta.k8s.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i metak8sappscodecom-menuoutline-editor bytebuilders-ui/metak8sappscodecom-menuoutline-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
