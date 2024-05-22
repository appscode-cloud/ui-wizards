# PrometheusRule Editor

[PrometheusRule Editor by AppsCode](https://byte.builders) - PrometheusRule Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/monitoringcoreoscom-prometheusrule-editor --version=v0.4.19
$ helm upgrade -i monitoringcoreoscom-prometheusrule-editor appscode-charts-oci/monitoringcoreoscom-prometheusrule-editor -n default --create-namespace --version=v0.4.19
```

## Introduction

This chart deploys a PrometheusRule Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `monitoringcoreoscom-prometheusrule-editor`:

```bash
$ helm upgrade -i monitoringcoreoscom-prometheusrule-editor appscode-charts-oci/monitoringcoreoscom-prometheusrule-editor -n default --create-namespace --version=v0.4.19
```

The command deploys a PrometheusRule Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `monitoringcoreoscom-prometheusrule-editor`:

```bash
$ helm uninstall monitoringcoreoscom-prometheusrule-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `monitoringcoreoscom-prometheusrule-editor` chart and their default values.

|     Parameter      | Description |                Default                |
|--------------------|-------------|---------------------------------------|
| apiVersion         |             | <code>monitoring.coreos.com/v1</code> |
| kind               |             | <code>PrometheusRule</code>           |
| metadata.name      |             | <code>prometheusrule</code>           |
| metadata.namespace |             | <code>default</code>                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i monitoringcoreoscom-prometheusrule-editor appscode-charts-oci/monitoringcoreoscom-prometheusrule-editor -n default --create-namespace --version=v0.4.19 --set apiVersion=monitoring.coreos.com/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i monitoringcoreoscom-prometheusrule-editor appscode-charts-oci/monitoringcoreoscom-prometheusrule-editor -n default --create-namespace --version=v0.4.19 --values values.yaml
```
