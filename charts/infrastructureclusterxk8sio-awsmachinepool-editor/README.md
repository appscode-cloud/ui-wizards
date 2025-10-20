# AWSMachinePool Editor

[AWSMachinePool Editor by AppsCode](https://appscode.com) - AWSMachinePool Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/infrastructureclusterxk8sio-awsmachinepool-editor --version=v0.26.0
$ helm upgrade -i infrastructureclusterxk8sio-awsmachinepool-editor appscode/infrastructureclusterxk8sio-awsmachinepool-editor -n default --create-namespace --version=v0.26.0
```

## Introduction

This chart deploys a AWSMachinePool Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `infrastructureclusterxk8sio-awsmachinepool-editor`:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-awsmachinepool-editor appscode/infrastructureclusterxk8sio-awsmachinepool-editor -n default --create-namespace --version=v0.26.0
```

The command deploys a AWSMachinePool Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `infrastructureclusterxk8sio-awsmachinepool-editor`:

```bash
$ helm uninstall infrastructureclusterxk8sio-awsmachinepool-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `infrastructureclusterxk8sio-awsmachinepool-editor` chart and their default values.

|     Parameter      | Description |                       Default                        |
|--------------------|-------------|------------------------------------------------------|
| apiVersion         |             | <code>infrastructure.cluster.x-k8s.io/v1beta2</code> |
| kind               |             | <code>AWSMachinePool</code>                          |
| metadata.name      |             | <code>awsmachinepool</code>                          |
| metadata.namespace |             | <code>default</code>                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-awsmachinepool-editor appscode/infrastructureclusterxk8sio-awsmachinepool-editor -n default --create-namespace --version=v0.26.0 --set apiVersion=infrastructure.cluster.x-k8s.io/v1beta2
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-awsmachinepool-editor appscode/infrastructureclusterxk8sio-awsmachinepool-editor -n default --create-namespace --version=v0.26.0 --values values.yaml
```
