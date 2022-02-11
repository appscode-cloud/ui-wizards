# DashboardTemplate Editor

[DashboardTemplate Editor by AppsCode](https://byte.builders) - DashboardTemplate Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install grafanasearchlightdev-dashboardtemplate-editor bytebuilders-ui/grafanasearchlightdev-dashboardtemplate-editor -n default
```

## Introduction

This chart deploys a DashboardTemplate Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `grafanasearchlightdev-dashboardtemplate-editor`:

```console
$ helm install grafanasearchlightdev-dashboardtemplate-editor bytebuilders-ui/grafanasearchlightdev-dashboardtemplate-editor -n default
```

The command deploys a DashboardTemplate Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `grafanasearchlightdev-dashboardtemplate-editor`:

```console
$ helm delete grafanasearchlightdev-dashboardtemplate-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `grafanasearchlightdev-dashboardtemplate-editor` chart and their default values.

|   Parameter   | Description |                    Default                    |
|---------------|-------------|-----------------------------------------------|
| apiVersion    |             | <code>grafana.searchlight.dev/v1alpha1</code> |
| kind          |             | <code>DashboardTemplate</code>                |
| metadata.name |             | <code>dashboardtemplate</code>                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install grafanasearchlightdev-dashboardtemplate-editor bytebuilders-ui/grafanasearchlightdev-dashboardtemplate-editor -n default --set apiVersion=grafana.searchlight.dev/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install grafanasearchlightdev-dashboardtemplate-editor bytebuilders-ui/grafanasearchlightdev-dashboardtemplate-editor -n default --values values.yaml
```
