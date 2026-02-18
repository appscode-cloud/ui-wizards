# GatewayPreset Editor

[GatewayPreset Editor by AppsCode](https://appscode.com) - GatewayPreset Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/gatewaycatalogappscodecom-gatewaypreset-editor --version=v0.30.0
$ helm upgrade -i gatewaycatalogappscodecom-gatewaypreset-editor appscode/gatewaycatalogappscodecom-gatewaypreset-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a GatewayPreset Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `gatewaycatalogappscodecom-gatewaypreset-editor`:

```bash
$ helm upgrade -i gatewaycatalogappscodecom-gatewaypreset-editor appscode/gatewaycatalogappscodecom-gatewaypreset-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a GatewayPreset Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `gatewaycatalogappscodecom-gatewaypreset-editor`:

```bash
$ helm uninstall gatewaycatalogappscodecom-gatewaypreset-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `gatewaycatalogappscodecom-gatewaypreset-editor` chart and their default values.

|     Parameter      | Description |                      Default                       |
|--------------------|-------------|----------------------------------------------------|
| apiVersion         |             | <code>gateway.catalog.appscode.com/v1alpha1</code> |
| kind               |             | <code>GatewayPreset</code>                         |
| metadata.name      |             | <code>gatewaypreset</code>                         |
| metadata.namespace |             | <code>default</code>                               |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i gatewaycatalogappscodecom-gatewaypreset-editor appscode/gatewaycatalogappscodecom-gatewaypreset-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=gateway.catalog.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i gatewaycatalogappscodecom-gatewaypreset-editor appscode/gatewaycatalogappscodecom-gatewaypreset-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
