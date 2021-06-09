# AWSRole Editor

[AWSRole Editor by AppsCode](https://byte.builders) - AWSRole Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install enginekubevaultcom-awsrole-editor bytebuilders-ui-dev/enginekubevaultcom-awsrole-editor -n default
```

## Introduction

This chart deploys a AWSRole Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `enginekubevaultcom-awsrole-editor`:

```console
$ helm install enginekubevaultcom-awsrole-editor bytebuilders-ui-dev/enginekubevaultcom-awsrole-editor -n default
```

The command deploys a AWSRole Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `enginekubevaultcom-awsrole-editor`:

```console
$ helm delete enginekubevaultcom-awsrole-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `enginekubevaultcom-awsrole-editor` chart and their default values.

|     Parameter      | Description |             Default             |
|--------------------|-------------|---------------------------------|
| apiVersion         |             | `engine.kubevault.com/v1alpha1` |
| kind               |             | `AWSRole`                       |
| metadata.name      |             | `awsrole`                       |
| metadata.namespace |             | `default`                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install enginekubevaultcom-awsrole-editor bytebuilders-ui-dev/enginekubevaultcom-awsrole-editor -n default --set apiVersion=engine.kubevault.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install enginekubevaultcom-awsrole-editor bytebuilders-ui-dev/enginekubevaultcom-awsrole-editor -n default --values values.yaml
```
