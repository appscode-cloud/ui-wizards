# CustomResourceDefinition Editor

[CustomResourceDefinition Editor by AppsCode](https://byte.builders) - CustomResourceDefinition Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/apiextensionsk8sio-customresourcedefinition-editor --version=v0.4.20
$ helm upgrade -i apiextensionsk8sio-customresourcedefinition-editor appscode-charts-oci/apiextensionsk8sio-customresourcedefinition-editor -n default --create-namespace --version=v0.4.20
```

## Introduction

This chart deploys a CustomResourceDefinition Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `apiextensionsk8sio-customresourcedefinition-editor`:

```bash
$ helm upgrade -i apiextensionsk8sio-customresourcedefinition-editor appscode-charts-oci/apiextensionsk8sio-customresourcedefinition-editor -n default --create-namespace --version=v0.4.20
```

The command deploys a CustomResourceDefinition Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `apiextensionsk8sio-customresourcedefinition-editor`:

```bash
$ helm uninstall apiextensionsk8sio-customresourcedefinition-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `apiextensionsk8sio-customresourcedefinition-editor` chart and their default values.

|     Parameter      | Description |                Default                |
|--------------------|-------------|---------------------------------------|
| apiVersion         |             | <code>apiextensions.k8s.io/v1</code>  |
| kind               |             | <code>CustomResourceDefinition</code> |
| metadata.name      |             | <code>customresourcedefinition</code> |
| metadata.namespace |             | <code>""</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i apiextensionsk8sio-customresourcedefinition-editor appscode-charts-oci/apiextensionsk8sio-customresourcedefinition-editor -n default --create-namespace --version=v0.4.20 --set apiVersion=apiextensions.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i apiextensionsk8sio-customresourcedefinition-editor appscode-charts-oci/apiextensionsk8sio-customresourcedefinition-editor -n default --create-namespace --version=v0.4.20 --values values.yaml
```
