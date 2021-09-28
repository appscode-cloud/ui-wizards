# LocalSubjectAccessReview Editor

[LocalSubjectAccessReview Editor by AppsCode](https://byte.builders) - LocalSubjectAccessReview Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install authorizationk8sio-localsubjectaccessreview-editor bytebuilders-ui/authorizationk8sio-localsubjectaccessreview-editor -n default
```

## Introduction

This chart deploys a LocalSubjectAccessReview Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `authorizationk8sio-localsubjectaccessreview-editor`:

```console
$ helm install authorizationk8sio-localsubjectaccessreview-editor bytebuilders-ui/authorizationk8sio-localsubjectaccessreview-editor -n default
```

The command deploys a LocalSubjectAccessReview Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `authorizationk8sio-localsubjectaccessreview-editor`:

```console
$ helm delete authorizationk8sio-localsubjectaccessreview-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `authorizationk8sio-localsubjectaccessreview-editor` chart and their default values.

|     Parameter      | Description |          Default           |
|--------------------|-------------|----------------------------|
| apiVersion         |             | `authorization.k8s.io/v1`  |
| kind               |             | `LocalSubjectAccessReview` |
| metadata.name      |             | `localsubjectaccessreview` |
| metadata.namespace |             | `default`                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install authorizationk8sio-localsubjectaccessreview-editor bytebuilders-ui/authorizationk8sio-localsubjectaccessreview-editor -n default --set apiVersion=authorization.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install authorizationk8sio-localsubjectaccessreview-editor bytebuilders-ui/authorizationk8sio-localsubjectaccessreview-editor -n default --values values.yaml
```
