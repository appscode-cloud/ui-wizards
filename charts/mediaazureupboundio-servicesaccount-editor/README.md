# ServicesAccount Editor

[ServicesAccount Editor by AppsCode](https://byte.builders) - ServicesAccount Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/mediaazureupboundio-servicesaccount-editor --version=v0.4.18
$ helm upgrade -i mediaazureupboundio-servicesaccount-editor bytebuilders-ui/mediaazureupboundio-servicesaccount-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a ServicesAccount Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `mediaazureupboundio-servicesaccount-editor`:

```bash
$ helm upgrade -i mediaazureupboundio-servicesaccount-editor bytebuilders-ui/mediaazureupboundio-servicesaccount-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a ServicesAccount Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `mediaazureupboundio-servicesaccount-editor`:

```bash
$ helm uninstall mediaazureupboundio-servicesaccount-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `mediaazureupboundio-servicesaccount-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>media.azure.upbound.io/v1beta1</code> |
| kind               |             | <code>ServicesAccount</code>                |
| metadata.name      |             | <code>servicesaccount</code>                |
| metadata.namespace |             | <code>""</code>                             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i mediaazureupboundio-servicesaccount-editor bytebuilders-ui/mediaazureupboundio-servicesaccount-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=media.azure.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i mediaazureupboundio-servicesaccount-editor bytebuilders-ui/mediaazureupboundio-servicesaccount-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
