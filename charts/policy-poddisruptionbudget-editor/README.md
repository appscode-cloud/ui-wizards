# PodDisruptionBudget Editor

[PodDisruptionBudget Editor by AppsCode](https://byte.builders) - PodDisruptionBudget Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/policy-poddisruptionbudget-editor --version=v0.4.9
$ helm upgrade -i policy-poddisruptionbudget-editor bytebuilders-ui/policy-poddisruptionbudget-editor -n default --create-namespace --version=v0.4.9
```

## Introduction

This chart deploys a PodDisruptionBudget Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `policy-poddisruptionbudget-editor`:

```bash
$ helm upgrade -i policy-poddisruptionbudget-editor bytebuilders-ui/policy-poddisruptionbudget-editor -n default --create-namespace --version=v0.4.9
```

The command deploys a PodDisruptionBudget Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `policy-poddisruptionbudget-editor`:

```bash
$ helm uninstall policy-poddisruptionbudget-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `policy-poddisruptionbudget-editor` chart and their default values.

|     Parameter      | Description |             Default              |
|--------------------|-------------|----------------------------------|
| apiVersion         |             | <code>policy/v1beta1</code>      |
| kind               |             | <code>PodDisruptionBudget</code> |
| metadata.name      |             | <code>poddisruptionbudget</code> |
| metadata.namespace |             | <code>default</code>             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i policy-poddisruptionbudget-editor bytebuilders-ui/policy-poddisruptionbudget-editor -n default --create-namespace --version=v0.4.9 --set apiVersion=policy/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i policy-poddisruptionbudget-editor bytebuilders-ui/policy-poddisruptionbudget-editor -n default --create-namespace --version=v0.4.9 --values values.yaml
```
