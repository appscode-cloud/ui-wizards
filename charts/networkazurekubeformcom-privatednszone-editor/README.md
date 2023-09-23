# PrivateDNSZone Editor

[PrivateDNSZone Editor by AppsCode](https://byte.builders) - PrivateDNSZone Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/networkazurekubeformcom-privatednszone-editor --version=v0.4.18
$ helm upgrade -i networkazurekubeformcom-privatednszone-editor bytebuilders-ui/networkazurekubeformcom-privatednszone-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a PrivateDNSZone Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `networkazurekubeformcom-privatednszone-editor`:

```bash
$ helm upgrade -i networkazurekubeformcom-privatednszone-editor bytebuilders-ui/networkazurekubeformcom-privatednszone-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a PrivateDNSZone Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `networkazurekubeformcom-privatednszone-editor`:

```bash
$ helm uninstall networkazurekubeformcom-privatednszone-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `networkazurekubeformcom-privatednszone-editor` chart and their default values.

|     Parameter      | Description |                     Default                      |
|--------------------|-------------|--------------------------------------------------|
| apiVersion         |             | <code>network.azure.kubeform.com/v1alpha1</code> |
| kind               |             | <code>PrivateDNSZone</code>                      |
| metadata.name      |             | <code>privatednszone</code>                      |
| metadata.namespace |             | <code>""</code>                                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i networkazurekubeformcom-privatednszone-editor bytebuilders-ui/networkazurekubeformcom-privatednszone-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=network.azure.kubeform.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i networkazurekubeformcom-privatednszone-editor bytebuilders-ui/networkazurekubeformcom-privatednszone-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
