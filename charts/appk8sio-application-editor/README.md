# Application Editor

[Application Editor by AppsCode](https://byte.builders) - Application Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/appk8sio-application-editor --version=v0.4.18
$ helm upgrade -i appk8sio-application-editor appscode-charts-oci/appk8sio-application-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a Application Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `appk8sio-application-editor`:

```bash
$ helm upgrade -i appk8sio-application-editor appscode-charts-oci/appk8sio-application-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a Application Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `appk8sio-application-editor`:

```bash
$ helm uninstall appk8sio-application-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `appk8sio-application-editor` chart and their default values.

|     Parameter      | Description |             Default             |
|--------------------|-------------|---------------------------------|
| apiVersion         |             | <code>app.k8s.io/v1beta1</code> |
| kind               |             | <code>Application</code>        |
| metadata.name      |             | <code>application</code>        |
| metadata.namespace |             | <code>default</code>            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i appk8sio-application-editor appscode-charts-oci/appk8sio-application-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=app.k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i appk8sio-application-editor appscode-charts-oci/appk8sio-application-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
