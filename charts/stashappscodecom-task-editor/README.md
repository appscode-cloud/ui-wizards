# Task Editor

[Task Editor by AppsCode](https://appscode.com) - Task Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/stashappscodecom-task-editor --version=v0.24.0
$ helm upgrade -i stashappscodecom-task-editor appscode/stashappscodecom-task-editor -n default --create-namespace --version=v0.24.0
```

## Introduction

This chart deploys a Task Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-task-editor`:

```bash
$ helm upgrade -i stashappscodecom-task-editor appscode/stashappscodecom-task-editor -n default --create-namespace --version=v0.24.0
```

The command deploys a Task Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-task-editor`:

```bash
$ helm uninstall stashappscodecom-task-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-task-editor` chart and their default values.

|     Parameter      | Description |                 Default                 |
|--------------------|-------------|-----------------------------------------|
| apiVersion         |             | <code>stash.appscode.com/v1beta1</code> |
| kind               |             | <code>Task</code>                       |
| metadata.name      |             | <code>task</code>                       |
| metadata.namespace |             | <code>""</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-task-editor appscode/stashappscodecom-task-editor -n default --create-namespace --version=v0.24.0 --set apiVersion=stash.appscode.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-task-editor appscode/stashappscodecom-task-editor -n default --create-namespace --version=v0.24.0 --values values.yaml
```
