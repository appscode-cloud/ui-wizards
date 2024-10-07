# FluxCDConfig Editor

[FluxCDConfig Editor by AppsCode](https://appscode.com) - FluxCDConfig Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/fluxcdopenclustermanagementio-fluxcdconfig-editor --version=v0.7.0
$ helm upgrade -i fluxcdopenclustermanagementio-fluxcdconfig-editor appscode-charts-oci/fluxcdopenclustermanagementio-fluxcdconfig-editor -n default --create-namespace --version=v0.7.0
```

## Introduction

This chart deploys a FluxCDConfig Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `fluxcdopenclustermanagementio-fluxcdconfig-editor`:

```bash
$ helm upgrade -i fluxcdopenclustermanagementio-fluxcdconfig-editor appscode-charts-oci/fluxcdopenclustermanagementio-fluxcdconfig-editor -n default --create-namespace --version=v0.7.0
```

The command deploys a FluxCDConfig Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `fluxcdopenclustermanagementio-fluxcdconfig-editor`:

```bash
$ helm uninstall fluxcdopenclustermanagementio-fluxcdconfig-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `fluxcdopenclustermanagementio-fluxcdconfig-editor` chart and their default values.

|     Parameter      | Description |                         Default                         |
|--------------------|-------------|---------------------------------------------------------|
| apiVersion         |             | <code>fluxcd.open-cluster-management.io/v1alpha1</code> |
| kind               |             | <code>FluxCDConfig</code>                               |
| metadata.name      |             | <code>fluxcdconfig</code>                               |
| metadata.namespace |             | <code>default</code>                                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i fluxcdopenclustermanagementio-fluxcdconfig-editor appscode-charts-oci/fluxcdopenclustermanagementio-fluxcdconfig-editor -n default --create-namespace --version=v0.7.0 --set apiVersion=fluxcd.open-cluster-management.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i fluxcdopenclustermanagementio-fluxcdconfig-editor appscode-charts-oci/fluxcdopenclustermanagementio-fluxcdconfig-editor -n default --create-namespace --version=v0.7.0 --values values.yaml
```
