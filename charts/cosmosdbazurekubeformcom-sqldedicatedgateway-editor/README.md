# SQLDedicatedGateway Editor

[SQLDedicatedGateway Editor by AppsCode](https://byte.builders) - SQLDedicatedGateway Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/cosmosdbazurekubeformcom-sqldedicatedgateway-editor --version=v0.4.17
$ helm upgrade -i cosmosdbazurekubeformcom-sqldedicatedgateway-editor bytebuilders-ui/cosmosdbazurekubeformcom-sqldedicatedgateway-editor -n default --create-namespace --version=v0.4.17
```

## Introduction

This chart deploys a SQLDedicatedGateway Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `cosmosdbazurekubeformcom-sqldedicatedgateway-editor`:

```bash
$ helm upgrade -i cosmosdbazurekubeformcom-sqldedicatedgateway-editor bytebuilders-ui/cosmosdbazurekubeformcom-sqldedicatedgateway-editor -n default --create-namespace --version=v0.4.17
```

The command deploys a SQLDedicatedGateway Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `cosmosdbazurekubeformcom-sqldedicatedgateway-editor`:

```bash
$ helm uninstall cosmosdbazurekubeformcom-sqldedicatedgateway-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `cosmosdbazurekubeformcom-sqldedicatedgateway-editor` chart and their default values.

|     Parameter      | Description |                      Default                      |
|--------------------|-------------|---------------------------------------------------|
| apiVersion         |             | <code>cosmosdb.azure.kubeform.com/v1alpha1</code> |
| kind               |             | <code>SQLDedicatedGateway</code>                  |
| metadata.name      |             | <code>sqldedicatedgateway</code>                  |
| metadata.namespace |             | <code>""</code>                                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i cosmosdbazurekubeformcom-sqldedicatedgateway-editor bytebuilders-ui/cosmosdbazurekubeformcom-sqldedicatedgateway-editor -n default --create-namespace --version=v0.4.17 --set apiVersion=cosmosdb.azure.kubeform.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i cosmosdbazurekubeformcom-sqldedicatedgateway-editor bytebuilders-ui/cosmosdbazurekubeformcom-sqldedicatedgateway-editor -n default --create-namespace --version=v0.4.17 --values values.yaml
```
