# APIService Editor

[APIService Editor by AppsCode](https://byte.builders) - APIService Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install apiregistrationk8sio-apiservice-editor bytebuilders-ui-dev/apiregistrationk8sio-apiservice-editor -n default
```

## Introduction

This chart deploys a APIService Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `apiregistrationk8sio-apiservice-editor`:

```console
$ helm install apiregistrationk8sio-apiservice-editor bytebuilders-ui-dev/apiregistrationk8sio-apiservice-editor -n default
```

The command deploys a APIService Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `apiregistrationk8sio-apiservice-editor`:

```console
$ helm delete apiregistrationk8sio-apiservice-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `apiregistrationk8sio-apiservice-editor` chart and their default values.

|   Parameter   | Description |           Default           |
|---------------|-------------|-----------------------------|
| apiVersion    |             | `apiregistration.k8s.io/v1` |
| kind          |             | `APIService`                |
| metadata.name |             | `apiservice`                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install apiregistrationk8sio-apiservice-editor bytebuilders-ui-dev/apiregistrationk8sio-apiservice-editor -n default --set apiVersion=apiregistration.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install apiregistrationk8sio-apiservice-editor bytebuilders-ui-dev/apiregistrationk8sio-apiservice-editor -n default --values values.yaml
```
