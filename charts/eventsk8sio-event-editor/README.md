# Event Editor

[Event Editor by AppsCode](https://byte.builders) - Event Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/eventsk8sio-event-editor --version=v0.4.20
$ helm upgrade -i eventsk8sio-event-editor appscode-charts-oci/eventsk8sio-event-editor -n default --create-namespace --version=v0.4.20
```

## Introduction

This chart deploys a Event Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `eventsk8sio-event-editor`:

```bash
$ helm upgrade -i eventsk8sio-event-editor appscode-charts-oci/eventsk8sio-event-editor -n default --create-namespace --version=v0.4.20
```

The command deploys a Event Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `eventsk8sio-event-editor`:

```bash
$ helm uninstall eventsk8sio-event-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `eventsk8sio-event-editor` chart and their default values.

|     Parameter      | Description |            Default            |
|--------------------|-------------|-------------------------------|
| apiVersion         |             | <code>events.k8s.io/v1</code> |
| kind               |             | <code>Event</code>            |
| metadata.name      |             | <code>event</code>            |
| metadata.namespace |             | <code>default</code>          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i eventsk8sio-event-editor appscode-charts-oci/eventsk8sio-event-editor -n default --create-namespace --version=v0.4.20 --set apiVersion=events.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i eventsk8sio-event-editor appscode-charts-oci/eventsk8sio-event-editor -n default --create-namespace --version=v0.4.20 --values values.yaml
```
