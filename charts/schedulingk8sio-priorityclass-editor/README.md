# PriorityClass Editor

[PriorityClass Editor by AppsCode](https://appscode.com) - PriorityClass Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/schedulingk8sio-priorityclass-editor --version=v0.6.0
$ helm upgrade -i schedulingk8sio-priorityclass-editor appscode-charts-oci/schedulingk8sio-priorityclass-editor -n default --create-namespace --version=v0.6.0
```

## Introduction

This chart deploys a PriorityClass Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `schedulingk8sio-priorityclass-editor`:

```bash
$ helm upgrade -i schedulingk8sio-priorityclass-editor appscode-charts-oci/schedulingk8sio-priorityclass-editor -n default --create-namespace --version=v0.6.0
```

The command deploys a PriorityClass Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `schedulingk8sio-priorityclass-editor`:

```bash
$ helm uninstall schedulingk8sio-priorityclass-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `schedulingk8sio-priorityclass-editor` chart and their default values.

|     Parameter      | Description |              Default              |
|--------------------|-------------|-----------------------------------|
| apiVersion         |             | <code>scheduling.k8s.io/v1</code> |
| kind               |             | <code>PriorityClass</code>        |
| metadata.name      |             | <code>priorityclass</code>        |
| metadata.namespace |             | <code>""</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i schedulingk8sio-priorityclass-editor appscode-charts-oci/schedulingk8sio-priorityclass-editor -n default --create-namespace --version=v0.6.0 --set apiVersion=scheduling.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i schedulingk8sio-priorityclass-editor appscode-charts-oci/schedulingk8sio-priorityclass-editor -n default --create-namespace --version=v0.6.0 --values values.yaml
```
