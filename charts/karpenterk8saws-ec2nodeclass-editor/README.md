# EC2NodeClass Editor

[EC2NodeClass Editor by AppsCode](https://appscode.com) - EC2NodeClass Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/karpenterk8saws-ec2nodeclass-editor --version=v0.30.0
$ helm upgrade -i karpenterk8saws-ec2nodeclass-editor appscode/karpenterk8saws-ec2nodeclass-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a EC2NodeClass Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `karpenterk8saws-ec2nodeclass-editor`:

```bash
$ helm upgrade -i karpenterk8saws-ec2nodeclass-editor appscode/karpenterk8saws-ec2nodeclass-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a EC2NodeClass Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `karpenterk8saws-ec2nodeclass-editor`:

```bash
$ helm uninstall karpenterk8saws-ec2nodeclass-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `karpenterk8saws-ec2nodeclass-editor` chart and their default values.

|     Parameter      | Description |                Default                 |
|--------------------|-------------|----------------------------------------|
| apiVersion         |             | <code>karpenter.k8s.aws/v1beta1</code> |
| kind               |             | <code>EC2NodeClass</code>              |
| metadata.name      |             | <code>ec2nodeclass</code>              |
| metadata.namespace |             | <code>""</code>                        |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i karpenterk8saws-ec2nodeclass-editor appscode/karpenterk8saws-ec2nodeclass-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=karpenter.k8s.aws/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i karpenterk8saws-ec2nodeclass-editor appscode/karpenterk8saws-ec2nodeclass-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
