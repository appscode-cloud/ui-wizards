# ReplicationController Editor

[ReplicationController Editor by AppsCode](https://byte.builders) - ReplicationController Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/core-replicationcontroller-editor --version=v0.4.4
$ helm upgrade -i core-replicationcontroller-editor bytebuilders-ui/core-replicationcontroller-editor -n default --create-namespace --version=v0.4.4
```

## Introduction

This chart deploys a ReplicationController Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `core-replicationcontroller-editor`:

```bash
$ helm upgrade -i core-replicationcontroller-editor bytebuilders-ui/core-replicationcontroller-editor -n default --create-namespace --version=v0.4.4
```

The command deploys a ReplicationController Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `core-replicationcontroller-editor`:

```bash
$ helm uninstall core-replicationcontroller-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `core-replicationcontroller-editor` chart and their default values.

|     Parameter      | Description |              Default               |
|--------------------|-------------|------------------------------------|
| apiVersion         |             | <code>v1</code>                    |
| kind               |             | <code>ReplicationController</code> |
| metadata.name      |             | <code>replicationcontroller</code> |
| metadata.namespace |             | <code>default</code>               |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i core-replicationcontroller-editor bytebuilders-ui/core-replicationcontroller-editor -n default --create-namespace --version=v0.4.4 --set apiVersion=v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i core-replicationcontroller-editor bytebuilders-ui/core-replicationcontroller-editor -n default --create-namespace --version=v0.4.4 --values values.yaml
```
