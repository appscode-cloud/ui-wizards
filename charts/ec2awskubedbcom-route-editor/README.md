# Route Editor

[Route Editor by AppsCode](https://appscode.com) - Route Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/ec2awskubedbcom-route-editor --version=v0.30.0
$ helm upgrade -i ec2awskubedbcom-route-editor appscode/ec2awskubedbcom-route-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a Route Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `ec2awskubedbcom-route-editor`:

```bash
$ helm upgrade -i ec2awskubedbcom-route-editor appscode/ec2awskubedbcom-route-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a Route Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `ec2awskubedbcom-route-editor`:

```bash
$ helm uninstall ec2awskubedbcom-route-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `ec2awskubedbcom-route-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>ec2.aws.kubedb.com/v1alpha1</code> |
| kind               |             | <code>Route</code>                       |
| metadata.name      |             | <code>route</code>                       |
| metadata.namespace |             | <code>""</code>                          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i ec2awskubedbcom-route-editor appscode/ec2awskubedbcom-route-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=ec2.aws.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i ec2awskubedbcom-route-editor appscode/ec2awskubedbcom-route-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
