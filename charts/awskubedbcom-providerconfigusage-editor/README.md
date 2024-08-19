# ProviderConfigUsage Editor

[ProviderConfigUsage Editor by AppsCode](https://byte.builders) - ProviderConfigUsage Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/awskubedbcom-providerconfigusage-editor --version=v0.5.0
$ helm upgrade -i awskubedbcom-providerconfigusage-editor appscode-charts-oci/awskubedbcom-providerconfigusage-editor -n default --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys a ProviderConfigUsage Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `awskubedbcom-providerconfigusage-editor`:

```bash
$ helm upgrade -i awskubedbcom-providerconfigusage-editor appscode-charts-oci/awskubedbcom-providerconfigusage-editor -n default --create-namespace --version=v0.5.0
```

The command deploys a ProviderConfigUsage Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `awskubedbcom-providerconfigusage-editor`:

```bash
$ helm uninstall awskubedbcom-providerconfigusage-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `awskubedbcom-providerconfigusage-editor` chart and their default values.

|     Parameter      | Description |               Default               |
|--------------------|-------------|-------------------------------------|
| apiVersion         |             | <code>aws.kubedb.com/v1beta1</code> |
| kind               |             | <code>ProviderConfigUsage</code>    |
| metadata.name      |             | <code>providerconfigusage</code>    |
| metadata.namespace |             | <code>""</code>                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i awskubedbcom-providerconfigusage-editor appscode-charts-oci/awskubedbcom-providerconfigusage-editor -n default --create-namespace --version=v0.5.0 --set apiVersion=aws.kubedb.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i awskubedbcom-providerconfigusage-editor appscode-charts-oci/awskubedbcom-providerconfigusage-editor -n default --create-namespace --version=v0.5.0 --values values.yaml
```
