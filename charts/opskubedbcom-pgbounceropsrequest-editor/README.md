# PgBouncerOpsRequest Editor

[PgBouncerOpsRequest Editor by AppsCode](https://byte.builders) - PgBouncerOpsRequest Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/opskubedbcom-pgbounceropsrequest-editor --version=v0.3.0
$ helm upgrade -i opskubedbcom-pgbounceropsrequest-editor bytebuilders-ui/opskubedbcom-pgbounceropsrequest-editor -n default --create-namespace --version=v0.3.0
```

## Introduction

This chart deploys a PgBouncerOpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `opskubedbcom-pgbounceropsrequest-editor`:

```bash
$ helm upgrade -i opskubedbcom-pgbounceropsrequest-editor bytebuilders-ui/opskubedbcom-pgbounceropsrequest-editor -n default --create-namespace --version=v0.3.0
```

The command deploys a PgBouncerOpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `opskubedbcom-pgbounceropsrequest-editor`:

```bash
$ helm uninstall opskubedbcom-pgbounceropsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-pgbounceropsrequest-editor` chart and their default values.

|     Parameter      | Description |               Default                |
|--------------------|-------------|--------------------------------------|
| apiVersion         |             | <code>ops.kubedb.com/v1alpha1</code> |
| kind               |             | <code>PgBouncerOpsRequest</code>     |
| metadata.name      |             | <code>pgbounceropsrequest</code>     |
| metadata.namespace |             | <code>default</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i opskubedbcom-pgbounceropsrequest-editor bytebuilders-ui/opskubedbcom-pgbounceropsrequest-editor -n default --create-namespace --version=v0.3.0 --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i opskubedbcom-pgbounceropsrequest-editor bytebuilders-ui/opskubedbcom-pgbounceropsrequest-editor -n default --create-namespace --version=v0.3.0 --values values.yaml
```
