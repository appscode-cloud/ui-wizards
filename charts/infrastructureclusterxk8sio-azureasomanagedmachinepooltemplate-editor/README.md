# AzureASOManagedMachinePoolTemplate Editor

[AzureASOManagedMachinePoolTemplate Editor by AppsCode](https://byte.builders) - AzureASOManagedMachinePoolTemplate Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor --version=v0.4.20
$ helm upgrade -i infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor appscode-charts-oci/infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor -n default --create-namespace --version=v0.4.20
```

## Introduction

This chart deploys a AzureASOManagedMachinePoolTemplate Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor`:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor appscode-charts-oci/infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor -n default --create-namespace --version=v0.4.20
```

The command deploys a AzureASOManagedMachinePoolTemplate Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor`:

```bash
$ helm uninstall infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor` chart and their default values.

|     Parameter      | Description |                        Default                        |
|--------------------|-------------|-------------------------------------------------------|
| apiVersion         |             | <code>infrastructure.cluster.x-k8s.io/v1alpha1</code> |
| kind               |             | <code>AzureASOManagedMachinePoolTemplate</code>       |
| metadata.name      |             | <code>azureasomanagedmachinepooltemplate</code>       |
| metadata.namespace |             | <code>default</code>                                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor appscode-charts-oci/infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor -n default --create-namespace --version=v0.4.20 --set apiVersion=infrastructure.cluster.x-k8s.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor appscode-charts-oci/infrastructureclusterxk8sio-azureasomanagedmachinepooltemplate-editor -n default --create-namespace --version=v0.4.20 --values values.yaml
```