# SelfSubjectRulesReview Editor

[SelfSubjectRulesReview Editor by AppsCode](https://byte.builders) - SelfSubjectRulesReview Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install authorizationk8sio-selfsubjectrulesreview-editor bytebuilders-ui/authorizationk8sio-selfsubjectrulesreview-editor -n default
```

## Introduction

This chart deploys a SelfSubjectRulesReview Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `authorizationk8sio-selfsubjectrulesreview-editor`:

```console
$ helm install authorizationk8sio-selfsubjectrulesreview-editor bytebuilders-ui/authorizationk8sio-selfsubjectrulesreview-editor -n default
```

The command deploys a SelfSubjectRulesReview Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `authorizationk8sio-selfsubjectrulesreview-editor`:

```console
$ helm delete authorizationk8sio-selfsubjectrulesreview-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `authorizationk8sio-selfsubjectrulesreview-editor` chart and their default values.

|   Parameter   | Description |          Default          |
|---------------|-------------|---------------------------|
| apiVersion    |             | `authorization.k8s.io/v1` |
| kind          |             | `SelfSubjectRulesReview`  |
| metadata.name |             | `selfsubjectrulesreview`  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install authorizationk8sio-selfsubjectrulesreview-editor bytebuilders-ui/authorizationk8sio-selfsubjectrulesreview-editor -n default --set apiVersion=authorization.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install authorizationk8sio-selfsubjectrulesreview-editor bytebuilders-ui/authorizationk8sio-selfsubjectrulesreview-editor -n default --values values.yaml
```
