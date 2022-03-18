# Function Editor

[Function Editor by AppsCode](https://byte.builders) - Function Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/stashappscodecom-function-editor --version=v0.4.2
$ helm upgrade -i stashappscodecom-function-editor bytebuilders-ui/stashappscodecom-function-editor -n default --create-namespace --version=v0.4.2
```

## Introduction

This chart deploys a Function Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-function-editor`:

```bash
$ helm upgrade -i stashappscodecom-function-editor bytebuilders-ui/stashappscodecom-function-editor -n default --create-namespace --version=v0.4.2
```

The command deploys a Function Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-function-editor`:

```bash
$ helm uninstall stashappscodecom-function-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-function-editor` chart and their default values.

|   Parameter   | Description |                 Default                 |
|---------------|-------------|-----------------------------------------|
| apiVersion    |             | <code>stash.appscode.com/v1beta1</code> |
| kind          |             | <code>Function</code>                   |
| metadata.name |             | <code>function</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-function-editor bytebuilders-ui/stashappscodecom-function-editor -n default --create-namespace --version=v0.4.2 --set apiVersion=stash.appscode.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-function-editor bytebuilders-ui/stashappscodecom-function-editor -n default --create-namespace --version=v0.4.2 --values values.yaml
```
