# Neo4jBinding Editor

[Neo4jBinding Editor by AppsCode](https://appscode.com) - Neo4jBinding Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/catalogappscodecom-neo4jbinding-editor --version=v0.35.0
$ helm upgrade -i catalogappscodecom-neo4jbinding-editor appscode/catalogappscodecom-neo4jbinding-editor -n default --create-namespace --version=v0.35.0
```

## Introduction

This chart deploys a Neo4jBinding Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `catalogappscodecom-neo4jbinding-editor`:

```bash
$ helm upgrade -i catalogappscodecom-neo4jbinding-editor appscode/catalogappscodecom-neo4jbinding-editor -n default --create-namespace --version=v0.35.0
```

The command deploys a Neo4jBinding Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `catalogappscodecom-neo4jbinding-editor`:

```bash
$ helm uninstall catalogappscodecom-neo4jbinding-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogappscodecom-neo4jbinding-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>catalog.appscode.com/v1alpha1</code> |
| kind               |             | <code>Neo4jBinding</code>                  |
| metadata.name      |             | <code>neo4jbinding</code>                  |
| metadata.namespace |             | <code>default</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i catalogappscodecom-neo4jbinding-editor appscode/catalogappscodecom-neo4jbinding-editor -n default --create-namespace --version=v0.35.0 --set apiVersion=catalog.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i catalogappscodecom-neo4jbinding-editor appscode/catalogappscodecom-neo4jbinding-editor -n default --create-namespace --version=v0.35.0 --values values.yaml
```
