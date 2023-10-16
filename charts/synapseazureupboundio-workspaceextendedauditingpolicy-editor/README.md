# WorkspaceExtendedAuditingPolicy Editor

[WorkspaceExtendedAuditingPolicy Editor by AppsCode](https://byte.builders) - WorkspaceExtendedAuditingPolicy Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/synapseazureupboundio-workspaceextendedauditingpolicy-editor --version=v0.4.18
$ helm upgrade -i synapseazureupboundio-workspaceextendedauditingpolicy-editor bytebuilders-ui/synapseazureupboundio-workspaceextendedauditingpolicy-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a WorkspaceExtendedAuditingPolicy Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `synapseazureupboundio-workspaceextendedauditingpolicy-editor`:

```bash
$ helm upgrade -i synapseazureupboundio-workspaceextendedauditingpolicy-editor bytebuilders-ui/synapseazureupboundio-workspaceextendedauditingpolicy-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a WorkspaceExtendedAuditingPolicy Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `synapseazureupboundio-workspaceextendedauditingpolicy-editor`:

```bash
$ helm uninstall synapseazureupboundio-workspaceextendedauditingpolicy-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `synapseazureupboundio-workspaceextendedauditingpolicy-editor` chart and their default values.

|     Parameter      | Description |                    Default                    |
|--------------------|-------------|-----------------------------------------------|
| apiVersion         |             | <code>synapse.azure.upbound.io/v1beta1</code> |
| kind               |             | <code>WorkspaceExtendedAuditingPolicy</code>  |
| metadata.name      |             | <code>workspaceextendedauditingpolicy</code>  |
| metadata.namespace |             | <code>""</code>                               |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i synapseazureupboundio-workspaceextendedauditingpolicy-editor bytebuilders-ui/synapseazureupboundio-workspaceextendedauditingpolicy-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=synapse.azure.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i synapseazureupboundio-workspaceextendedauditingpolicy-editor bytebuilders-ui/synapseazureupboundio-workspaceextendedauditingpolicy-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
