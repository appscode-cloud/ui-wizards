# VaultServerVersion Editor

[VaultServerVersion Editor by AppsCode](https://appscode.com) - VaultServerVersion Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/catalogkubevaultcom-vaultserverversion-editor --version=v0.30.0
$ helm upgrade -i catalogkubevaultcom-vaultserverversion-editor appscode/catalogkubevaultcom-vaultserverversion-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a VaultServerVersion Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `catalogkubevaultcom-vaultserverversion-editor`:

```bash
$ helm upgrade -i catalogkubevaultcom-vaultserverversion-editor appscode/catalogkubevaultcom-vaultserverversion-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a VaultServerVersion Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `catalogkubevaultcom-vaultserverversion-editor`:

```bash
$ helm uninstall catalogkubevaultcom-vaultserverversion-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `catalogkubevaultcom-vaultserverversion-editor` chart and their default values.

|     Parameter      | Description |                   Default                   |
|--------------------|-------------|---------------------------------------------|
| apiVersion         |             | <code>catalog.kubevault.com/v1alpha1</code> |
| kind               |             | <code>VaultServerVersion</code>             |
| metadata.name      |             | <code>vaultserverversion</code>             |
| metadata.namespace |             | <code>""</code>                             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i catalogkubevaultcom-vaultserverversion-editor appscode/catalogkubevaultcom-vaultserverversion-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=catalog.kubevault.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i catalogkubevaultcom-vaultserverversion-editor appscode/catalogkubevaultcom-vaultserverversion-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
