# Event Editor

[Event Editor by AppsCode](https://byte.builders) - Event Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install eventsk8sio-event-editor bytebuilders-ui-dev/eventsk8sio-event-editor -n default
```

## Introduction

This chart deploys a Event Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `eventsk8sio-event-editor`:

```console
$ helm install eventsk8sio-event-editor bytebuilders-ui-dev/eventsk8sio-event-editor -n default
```

The command deploys a Event Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `eventsk8sio-event-editor`:

```console
$ helm delete eventsk8sio-event-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `eventsk8sio-event-editor` chart and their default values.

|     Parameter      | Description |      Default       |
|--------------------|-------------|--------------------|
| apiVersion         |             | `events.k8s.io/v1` |
| kind               |             | `Event`            |
| metadata.name      |             | `event`            |
| metadata.namespace |             | `default`          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install eventsk8sio-event-editor bytebuilders-ui-dev/eventsk8sio-event-editor -n default --set apiVersion=events.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install eventsk8sio-event-editor bytebuilders-ui-dev/eventsk8sio-event-editor -n default --values values.yaml
```
