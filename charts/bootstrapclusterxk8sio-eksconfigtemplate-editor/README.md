# EKSConfigTemplate Editor

[EKSConfigTemplate Editor by AppsCode](https://byte.builders) - EKSConfigTemplate Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/bootstrapclusterxk8sio-eksconfigtemplate-editor --version=v0.4.14
$ helm upgrade -i bootstrapclusterxk8sio-eksconfigtemplate-editor bytebuilders-ui/bootstrapclusterxk8sio-eksconfigtemplate-editor -n default --create-namespace --version=v0.4.14
```

## Introduction

This chart deploys a EKSConfigTemplate Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `bootstrapclusterxk8sio-eksconfigtemplate-editor`:

```bash
$ helm upgrade -i bootstrapclusterxk8sio-eksconfigtemplate-editor bytebuilders-ui/bootstrapclusterxk8sio-eksconfigtemplate-editor -n default --create-namespace --version=v0.4.14
```

The command deploys a EKSConfigTemplate Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `bootstrapclusterxk8sio-eksconfigtemplate-editor`:

```bash
$ helm uninstall bootstrapclusterxk8sio-eksconfigtemplate-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `bootstrapclusterxk8sio-eksconfigtemplate-editor` chart and their default values.

|     Parameter      | Description |                     Default                     |
|--------------------|-------------|-------------------------------------------------|
| apiVersion         |             | <code>bootstrap.cluster.x-k8s.io/v1beta2</code> |
| kind               |             | <code>EKSConfigTemplate</code>                  |
| metadata.name      |             | <code>eksconfigtemplate</code>                  |
| metadata.namespace |             | <code>default</code>                            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i bootstrapclusterxk8sio-eksconfigtemplate-editor bytebuilders-ui/bootstrapclusterxk8sio-eksconfigtemplate-editor -n default --create-namespace --version=v0.4.14 --set apiVersion=bootstrap.cluster.x-k8s.io/v1beta2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i bootstrapclusterxk8sio-eksconfigtemplate-editor bytebuilders-ui/bootstrapclusterxk8sio-eksconfigtemplate-editor -n default --create-namespace --version=v0.4.14 --values values.yaml
```
