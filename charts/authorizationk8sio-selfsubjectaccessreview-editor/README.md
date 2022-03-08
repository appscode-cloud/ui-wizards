# SelfSubjectAccessReview Editor

[SelfSubjectAccessReview Editor by AppsCode](https://byte.builders) - SelfSubjectAccessReview Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/authorizationk8sio-selfsubjectaccessreview-editor --version=v0.3.1
$ helm upgrade -i authorizationk8sio-selfsubjectaccessreview-editor bytebuilders-ui/authorizationk8sio-selfsubjectaccessreview-editor -n default --create-namespace --version=v0.3.1
```

## Introduction

This chart deploys a SelfSubjectAccessReview Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `authorizationk8sio-selfsubjectaccessreview-editor`:

```bash
$ helm upgrade -i authorizationk8sio-selfsubjectaccessreview-editor bytebuilders-ui/authorizationk8sio-selfsubjectaccessreview-editor -n default --create-namespace --version=v0.3.1
```

The command deploys a SelfSubjectAccessReview Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `authorizationk8sio-selfsubjectaccessreview-editor`:

```bash
$ helm uninstall authorizationk8sio-selfsubjectaccessreview-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `authorizationk8sio-selfsubjectaccessreview-editor` chart and their default values.

|   Parameter   | Description |               Default                |
|---------------|-------------|--------------------------------------|
| apiVersion    |             | <code>authorization.k8s.io/v1</code> |
| kind          |             | <code>SelfSubjectAccessReview</code> |
| metadata.name |             | <code>selfsubjectaccessreview</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i authorizationk8sio-selfsubjectaccessreview-editor bytebuilders-ui/authorizationk8sio-selfsubjectaccessreview-editor -n default --create-namespace --version=v0.3.1 --set apiVersion=authorization.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i authorizationk8sio-selfsubjectaccessreview-editor bytebuilders-ui/authorizationk8sio-selfsubjectaccessreview-editor -n default --create-namespace --version=v0.3.1 --values values.yaml
```
