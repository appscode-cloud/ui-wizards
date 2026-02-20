# ResourceDescriptor Editor

[ResourceDescriptor Editor by AppsCode](https://byte.builders) - ResourceDescriptor Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/metaappscodecom-resourcedescriptor-editor --version=v0.30.0
$ helm upgrade -i metaappscodecom-resourcedescriptor-editor appscode/metaappscodecom-resourcedescriptor-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a ResourceDescriptor Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `metaappscodecom-resourcedescriptor-editor`:

```bash
$ helm upgrade -i metaappscodecom-resourcedescriptor-editor appscode/metaappscodecom-resourcedescriptor-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a ResourceDescriptor Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `metaappscodecom-resourcedescriptor-editor`:

```bash
$ helm uninstall metaappscodecom-resourcedescriptor-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `metaappscodecom-resourcedescriptor-editor` chart and their default values.

|     Parameter      | Description |                 Default                 |
|--------------------|-------------|-----------------------------------------|
| apiVersion         |             | <code>meta.appscode.com/v1alpha1</code> |
| kind               |             | <code>ResourceDescriptor</code>         |
| metadata.name      |             | <code>resourcedescriptor</code>         |
| metadata.namespace |             | <code>default</code>                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i metaappscodecom-resourcedescriptor-editor appscode/metaappscodecom-resourcedescriptor-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=meta.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i metaappscodecom-resourcedescriptor-editor appscode/metaappscodecom-resourcedescriptor-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
