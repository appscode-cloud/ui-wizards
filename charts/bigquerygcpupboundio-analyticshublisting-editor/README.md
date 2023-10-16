# AnalyticsHubListing Editor

[AnalyticsHubListing Editor by AppsCode](https://byte.builders) - AnalyticsHubListing Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/bigquerygcpupboundio-analyticshublisting-editor --version=v0.4.18
$ helm upgrade -i bigquerygcpupboundio-analyticshublisting-editor bytebuilders-ui/bigquerygcpupboundio-analyticshublisting-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a AnalyticsHubListing Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `bigquerygcpupboundio-analyticshublisting-editor`:

```bash
$ helm upgrade -i bigquerygcpupboundio-analyticshublisting-editor bytebuilders-ui/bigquerygcpupboundio-analyticshublisting-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a AnalyticsHubListing Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `bigquerygcpupboundio-analyticshublisting-editor`:

```bash
$ helm uninstall bigquerygcpupboundio-analyticshublisting-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `bigquerygcpupboundio-analyticshublisting-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>bigquery.gcp.upbound.io/v1beta1</code> |
| kind               |             | <code>AnalyticsHubListing</code>             |
| metadata.name      |             | <code>analyticshublisting</code>             |
| metadata.namespace |             | <code>""</code>                              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i bigquerygcpupboundio-analyticshublisting-editor bytebuilders-ui/bigquerygcpupboundio-analyticshublisting-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=bigquery.gcp.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i bigquerygcpupboundio-analyticshublisting-editor bytebuilders-ui/bigquerygcpupboundio-analyticshublisting-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
