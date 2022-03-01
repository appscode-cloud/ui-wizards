# SecretRoleBinding Editor

[SecretRoleBinding Editor by AppsCode](https://byte.builders) - SecretRoleBinding Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/enginekubevaultcom-secretrolebinding-editor --version=v0.3.0
$ helm upgrade -i enginekubevaultcom-secretrolebinding-editor bytebuilders-ui/enginekubevaultcom-secretrolebinding-editor -n default --create-namespace --version=v0.3.0
```

## Introduction

This chart deploys a SecretRoleBinding Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `enginekubevaultcom-secretrolebinding-editor`:

```bash
$ helm upgrade -i enginekubevaultcom-secretrolebinding-editor bytebuilders-ui/enginekubevaultcom-secretrolebinding-editor -n default --create-namespace --version=v0.3.0
```

The command deploys a SecretRoleBinding Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `enginekubevaultcom-secretrolebinding-editor`:

```bash
$ helm uninstall enginekubevaultcom-secretrolebinding-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `enginekubevaultcom-secretrolebinding-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>engine.kubevault.com/v1alpha1</code> |
| kind               |             | <code>SecretRoleBinding</code>             |
| metadata.name      |             | <code>secretrolebinding</code>             |
| metadata.namespace |             | <code>default</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i enginekubevaultcom-secretrolebinding-editor bytebuilders-ui/enginekubevaultcom-secretrolebinding-editor -n default --create-namespace --version=v0.3.0 --set apiVersion=engine.kubevault.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i enginekubevaultcom-secretrolebinding-editor bytebuilders-ui/enginekubevaultcom-secretrolebinding-editor -n default --create-namespace --version=v0.3.0 --values values.yaml
```
