# TokenReview Editor

[TokenReview Editor by AppsCode](https://byte.builders) - TokenReview Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install authenticationk8sio-tokenreview-editor bytebuilders-ui-dev/authenticationk8sio-tokenreview-editor -n default
```

## Introduction

This chart deploys a TokenReview Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `authenticationk8sio-tokenreview-editor`:

```console
$ helm install authenticationk8sio-tokenreview-editor bytebuilders-ui-dev/authenticationk8sio-tokenreview-editor -n default
```

The command deploys a TokenReview Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `authenticationk8sio-tokenreview-editor`:

```console
$ helm delete authenticationk8sio-tokenreview-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `authenticationk8sio-tokenreview-editor` chart and their default values.

|   Parameter   | Description |          Default           |
|---------------|-------------|----------------------------|
| apiVersion    |             | `authentication.k8s.io/v1` |
| kind          |             | `TokenReview`              |
| metadata.name |             | `tokenreview`              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install authenticationk8sio-tokenreview-editor bytebuilders-ui-dev/authenticationk8sio-tokenreview-editor -n default --set apiVersion=authentication.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install authenticationk8sio-tokenreview-editor bytebuilders-ui-dev/authenticationk8sio-tokenreview-editor -n default --values values.yaml
```
