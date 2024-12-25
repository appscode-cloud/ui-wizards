# Recommendation Editor

[Recommendation Editor by AppsCode](https://appscode.com) - Recommendation Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/supervisorappscodecom-recommendation-editor --version=v0.12.0
$ helm upgrade -i supervisorappscodecom-recommendation-editor appscode-charts-oci/supervisorappscodecom-recommendation-editor -n default --create-namespace --version=v0.12.0
```

## Introduction

This chart deploys a Recommendation Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `supervisorappscodecom-recommendation-editor`:

```bash
$ helm upgrade -i supervisorappscodecom-recommendation-editor appscode-charts-oci/supervisorappscodecom-recommendation-editor -n default --create-namespace --version=v0.12.0
```

The command deploys a Recommendation Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `supervisorappscodecom-recommendation-editor`:

```bash
$ helm uninstall supervisorappscodecom-recommendation-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `supervisorappscodecom-recommendation-editor` chart and their default values.

|     Parameter      | Description |                    Default                    |
|--------------------|-------------|-----------------------------------------------|
| apiVersion         |             | <code>supervisor.appscode.com/v1alpha1</code> |
| kind               |             | <code>Recommendation</code>                   |
| metadata.name      |             | <code>recommendation</code>                   |
| metadata.namespace |             | <code>default</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i supervisorappscodecom-recommendation-editor appscode-charts-oci/supervisorappscodecom-recommendation-editor -n default --create-namespace --version=v0.12.0 --set apiVersion=supervisor.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i supervisorappscodecom-recommendation-editor appscode-charts-oci/supervisorappscodecom-recommendation-editor -n default --create-namespace --version=v0.12.0 --values values.yaml
```
