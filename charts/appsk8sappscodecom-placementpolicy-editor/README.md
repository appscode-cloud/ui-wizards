# PlacementPolicy Editor

[PlacementPolicy Editor by AppsCode](https://appscode.com) - PlacementPolicy Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/appsk8sappscodecom-placementpolicy-editor --version=v0.7.0
$ helm upgrade -i appsk8sappscodecom-placementpolicy-editor appscode-charts-oci/appsk8sappscodecom-placementpolicy-editor -n default --create-namespace --version=v0.7.0
```

## Introduction

This chart deploys a PlacementPolicy Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `appsk8sappscodecom-placementpolicy-editor`:

```bash
$ helm upgrade -i appsk8sappscodecom-placementpolicy-editor appscode-charts-oci/appsk8sappscodecom-placementpolicy-editor -n default --create-namespace --version=v0.7.0
```

The command deploys a PlacementPolicy Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `appsk8sappscodecom-placementpolicy-editor`:

```bash
$ helm uninstall appsk8sappscodecom-placementpolicy-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `appsk8sappscodecom-placementpolicy-editor` chart and their default values.

|     Parameter      | Description |                Default                |
|--------------------|-------------|---------------------------------------|
| apiVersion         |             | <code>apps.k8s.appscode.com/v1</code> |
| kind               |             | <code>PlacementPolicy</code>          |
| metadata.name      |             | <code>placementpolicy</code>          |
| metadata.namespace |             | <code>""</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i appsk8sappscodecom-placementpolicy-editor appscode-charts-oci/appsk8sappscodecom-placementpolicy-editor -n default --create-namespace --version=v0.7.0 --set apiVersion=apps.k8s.appscode.com/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i appsk8sappscodecom-placementpolicy-editor appscode-charts-oci/appsk8sappscodecom-placementpolicy-editor -n default --create-namespace --version=v0.7.0 --values values.yaml
```
