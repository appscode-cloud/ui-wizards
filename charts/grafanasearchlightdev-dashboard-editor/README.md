# Dashboard Editor

[Dashboard Editor by AppsCode](https://byte.builders) - Dashboard Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install grafanasearchlightdev-dashboard-editor bytebuilders-ui-dev/grafanasearchlightdev-dashboard-editor -n default
```

## Introduction

This chart deploys a Dashboard Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `grafanasearchlightdev-dashboard-editor`:

```console
$ helm install grafanasearchlightdev-dashboard-editor bytebuilders-ui-dev/grafanasearchlightdev-dashboard-editor -n default
```

The command deploys a Dashboard Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `grafanasearchlightdev-dashboard-editor`:

```console
$ helm delete grafanasearchlightdev-dashboard-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `grafanasearchlightdev-dashboard-editor` chart and their default values.

|     Parameter      | Description |              Default               |
|--------------------|-------------|------------------------------------|
| apiVersion         |             | `grafana.searchlight.dev/v1alpha1` |
| kind               |             | `Dashboard`                        |
| metadata.name      |             | `dashboard`                        |
| metadata.namespace |             | `default`                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install grafanasearchlightdev-dashboard-editor bytebuilders-ui-dev/grafanasearchlightdev-dashboard-editor -n default --set apiVersion=grafana.searchlight.dev/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install grafanasearchlightdev-dashboard-editor bytebuilders-ui-dev/grafanasearchlightdev-dashboard-editor -n default --values values.yaml
```
