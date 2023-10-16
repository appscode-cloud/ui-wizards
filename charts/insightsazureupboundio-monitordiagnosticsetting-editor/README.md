# MonitorDiagnosticSetting Editor

[MonitorDiagnosticSetting Editor by AppsCode](https://byte.builders) - MonitorDiagnosticSetting Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/insightsazureupboundio-monitordiagnosticsetting-editor --version=v0.4.18
$ helm upgrade -i insightsazureupboundio-monitordiagnosticsetting-editor bytebuilders-ui/insightsazureupboundio-monitordiagnosticsetting-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a MonitorDiagnosticSetting Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `insightsazureupboundio-monitordiagnosticsetting-editor`:

```bash
$ helm upgrade -i insightsazureupboundio-monitordiagnosticsetting-editor bytebuilders-ui/insightsazureupboundio-monitordiagnosticsetting-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a MonitorDiagnosticSetting Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `insightsazureupboundio-monitordiagnosticsetting-editor`:

```bash
$ helm uninstall insightsazureupboundio-monitordiagnosticsetting-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `insightsazureupboundio-monitordiagnosticsetting-editor` chart and their default values.

|     Parameter      | Description |                    Default                     |
|--------------------|-------------|------------------------------------------------|
| apiVersion         |             | <code>insights.azure.upbound.io/v1beta1</code> |
| kind               |             | <code>MonitorDiagnosticSetting</code>          |
| metadata.name      |             | <code>monitordiagnosticsetting</code>          |
| metadata.namespace |             | <code>""</code>                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i insightsazureupboundio-monitordiagnosticsetting-editor bytebuilders-ui/insightsazureupboundio-monitordiagnosticsetting-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=insights.azure.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i insightsazureupboundio-monitordiagnosticsetting-editor bytebuilders-ui/insightsazureupboundio-monitordiagnosticsetting-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
