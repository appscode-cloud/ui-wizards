# MongoDBOpsRequest Editor

[MongoDBOpsRequest Editor by AppsCode](https://byte.builders) - MongoDBOpsRequest Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/opskubedbcom-mongodbopsrequest-editor --version=v0.4.15
$ helm upgrade -i opskubedbcom-mongodbopsrequest-editor bytebuilders-ui/opskubedbcom-mongodbopsrequest-editor -n default --create-namespace --version=v0.4.15
```

## Introduction

This chart deploys a MongoDBOpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `opskubedbcom-mongodbopsrequest-editor`:

```bash
$ helm upgrade -i opskubedbcom-mongodbopsrequest-editor bytebuilders-ui/opskubedbcom-mongodbopsrequest-editor -n default --create-namespace --version=v0.4.15
```

The command deploys a MongoDBOpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `opskubedbcom-mongodbopsrequest-editor`:

```bash
$ helm uninstall opskubedbcom-mongodbopsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-mongodbopsrequest-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>ops.kubedb.com/v1alpha1</code> |
| kind               |             | <code>MongoDBOpsRequest</code>       |
| metadata.name      |             | <code>mongodbopsrequest</code>       |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i opskubedbcom-mongodbopsrequest-editor bytebuilders-ui/opskubedbcom-mongodbopsrequest-editor -n default --create-namespace --version=v0.4.15 --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i opskubedbcom-mongodbopsrequest-editor bytebuilders-ui/opskubedbcom-mongodbopsrequest-editor -n default --create-namespace --version=v0.4.15 --values values.yaml
```
