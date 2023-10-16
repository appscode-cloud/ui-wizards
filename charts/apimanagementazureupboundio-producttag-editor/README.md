# ProductTag Editor

[ProductTag Editor by AppsCode](https://byte.builders) - ProductTag Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/apimanagementazureupboundio-producttag-editor --version=v0.4.18
$ helm upgrade -i apimanagementazureupboundio-producttag-editor bytebuilders-ui/apimanagementazureupboundio-producttag-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a ProductTag Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `apimanagementazureupboundio-producttag-editor`:

```bash
$ helm upgrade -i apimanagementazureupboundio-producttag-editor bytebuilders-ui/apimanagementazureupboundio-producttag-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a ProductTag Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `apimanagementazureupboundio-producttag-editor`:

```bash
$ helm uninstall apimanagementazureupboundio-producttag-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `apimanagementazureupboundio-producttag-editor` chart and their default values.

|     Parameter      | Description |                       Default                       |
|--------------------|-------------|-----------------------------------------------------|
| apiVersion         |             | <code>apimanagement.azure.upbound.io/v1beta1</code> |
| kind               |             | <code>ProductTag</code>                             |
| metadata.name      |             | <code>producttag</code>                             |
| metadata.namespace |             | <code>""</code>                                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i apimanagementazureupboundio-producttag-editor bytebuilders-ui/apimanagementazureupboundio-producttag-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=apimanagement.azure.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i apimanagementazureupboundio-producttag-editor bytebuilders-ui/apimanagementazureupboundio-producttag-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
