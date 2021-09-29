# FlowSchema Editor

[FlowSchema Editor by AppsCode](https://byte.builders) - FlowSchema Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install flowcontrolapiserverk8sio-flowschema-editor bytebuilders-ui/flowcontrolapiserverk8sio-flowschema-editor -n default
```

## Introduction

This chart deploys a FlowSchema Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `flowcontrolapiserverk8sio-flowschema-editor`:

```console
$ helm install flowcontrolapiserverk8sio-flowschema-editor bytebuilders-ui/flowcontrolapiserverk8sio-flowschema-editor -n default
```

The command deploys a FlowSchema Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `flowcontrolapiserverk8sio-flowschema-editor`:

```console
$ helm delete flowcontrolapiserverk8sio-flowschema-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `flowcontrolapiserverk8sio-flowschema-editor` chart and their default values.

|     Parameter      | Description |                Default                 |
|--------------------|-------------|----------------------------------------|
| apiVersion         |             | `flowcontrol.apiserver.k8s.io/v1beta1` |
| kind               |             | `FlowSchema`                           |
| metadata.name      |             | `flowschema`                           |
| metadata.namespace |             | `default`                              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install flowcontrolapiserverk8sio-flowschema-editor bytebuilders-ui/flowcontrolapiserverk8sio-flowschema-editor -n default --set apiVersion=flowcontrol.apiserver.k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install flowcontrolapiserverk8sio-flowschema-editor bytebuilders-ui/flowcontrolapiserverk8sio-flowschema-editor -n default --values values.yaml
```
