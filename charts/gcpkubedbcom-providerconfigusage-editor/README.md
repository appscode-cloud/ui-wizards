# ProviderConfigUsage Editor

[ProviderConfigUsage Editor by AppsCode](https://appscode.com) - ProviderConfigUsage Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/gcpkubedbcom-providerconfigusage-editor --version=v0.9.0
$ helm upgrade -i gcpkubedbcom-providerconfigusage-editor appscode-charts-oci/gcpkubedbcom-providerconfigusage-editor -n default --create-namespace --version=v0.9.0
```

## Introduction

This chart deploys a ProviderConfigUsage Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `gcpkubedbcom-providerconfigusage-editor`:

```bash
$ helm upgrade -i gcpkubedbcom-providerconfigusage-editor appscode-charts-oci/gcpkubedbcom-providerconfigusage-editor -n default --create-namespace --version=v0.9.0
```

The command deploys a ProviderConfigUsage Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `gcpkubedbcom-providerconfigusage-editor`:

```bash
$ helm uninstall gcpkubedbcom-providerconfigusage-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `gcpkubedbcom-providerconfigusage-editor` chart and their default values.

|     Parameter      | Description |               Default               |
|--------------------|-------------|-------------------------------------|
| apiVersion         |             | <code>gcp.kubedb.com/v1beta1</code> |
| kind               |             | <code>ProviderConfigUsage</code>    |
| metadata.name      |             | <code>providerconfigusage</code>    |
| metadata.namespace |             | <code>""</code>                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i gcpkubedbcom-providerconfigusage-editor appscode-charts-oci/gcpkubedbcom-providerconfigusage-editor -n default --create-namespace --version=v0.9.0 --set apiVersion=gcp.kubedb.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i gcpkubedbcom-providerconfigusage-editor appscode-charts-oci/gcpkubedbcom-providerconfigusage-editor -n default --create-namespace --version=v0.9.0 --values values.yaml
```
