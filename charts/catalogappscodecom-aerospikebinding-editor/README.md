# AerospikeBinding Editor

[AerospikeBinding Editor by AppsCode](https://appscode.com) - AerospikeBinding Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/catalogappscodecom-aerospikebinding-editor --version=v0.35.0
$ helm upgrade -i catalogappscodecom-aerospikebinding-editor appscode/catalogappscodecom-aerospikebinding-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a AerospikeBinding Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `catalogappscodecom-aerospikebinding-editor`:

```bash
$ helm upgrade -i catalogappscodecom-aerospikebinding-editor appscode/catalogappscodecom-aerospikebinding-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a AerospikeBinding Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `catalogappscodecom-aerospikebinding-editor`:

```bash
$ helm uninstall catalogappscodecom-aerospikebinding-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogappscodecom-aerospikebinding-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>catalog.appscode.com/v1alpha1</code> |
| kind               |             | <code>AerospikeBinding</code>              |
| metadata.name      |             | <code>aerospikebinding</code>              |
| metadata.namespace |             | <code>default</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i catalogappscodecom-aerospikebinding-editor appscode/catalogappscodecom-aerospikebinding-editor -n default --create-namespace --version=v0.35.0 --set apiVersion=catalog.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i catalogappscodecom-aerospikebinding-editor appscode/catalogappscodecom-aerospikebinding-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
