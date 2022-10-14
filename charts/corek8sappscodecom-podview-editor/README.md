# PodView Editor

[PodView Editor by AppsCode](https://byte.builders) - PodView Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/corek8sappscodecom-podview-editor --version=v0.4.11
$ helm upgrade -i corek8sappscodecom-podview-editor bytebuilders-ui/corek8sappscodecom-podview-editor -n default --create-namespace --version=v0.4.11
```

## Introduction

This chart deploys a PodView Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `corek8sappscodecom-podview-editor`:

```bash
$ helm upgrade -i corek8sappscodecom-podview-editor bytebuilders-ui/corek8sappscodecom-podview-editor -n default --create-namespace --version=v0.4.11
```

The command deploys a PodView Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `corek8sappscodecom-podview-editor`:

```bash
$ helm uninstall corek8sappscodecom-podview-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `corek8sappscodecom-podview-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>core.k8s.appscode.com/v1alpha1</code> |
| kind               |             | <code>PodView</code>                        |
| metadata.name      |             | <code>podview</code>                        |
| metadata.namespace |             | <code>default</code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i corek8sappscodecom-podview-editor bytebuilders-ui/corek8sappscodecom-podview-editor -n default --create-namespace --version=v0.4.11 --set apiVersion=core.k8s.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i corek8sappscodecom-podview-editor bytebuilders-ui/corek8sappscodecom-podview-editor -n default --create-namespace --version=v0.4.11 --values values.yaml
```
