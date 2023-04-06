# SecretAccessRequest Editor

[SecretAccessRequest Editor by AppsCode](https://byte.builders) - SecretAccessRequest Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/enginekubevaultcom-secretaccessrequest-editor --version=v0.4.14
$ helm upgrade -i enginekubevaultcom-secretaccessrequest-editor bytebuilders-ui/enginekubevaultcom-secretaccessrequest-editor -n default --create-namespace --version=v0.4.14
```

## Introduction

This chart deploys a SecretAccessRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `enginekubevaultcom-secretaccessrequest-editor`:

```bash
$ helm upgrade -i enginekubevaultcom-secretaccessrequest-editor bytebuilders-ui/enginekubevaultcom-secretaccessrequest-editor -n default --create-namespace --version=v0.4.14
```

The command deploys a SecretAccessRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `enginekubevaultcom-secretaccessrequest-editor`:

```bash
$ helm uninstall enginekubevaultcom-secretaccessrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `enginekubevaultcom-secretaccessrequest-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>engine.kubevault.com/v1alpha1</code> |
| kind               |             | <code>SecretAccessRequest</code>           |
| metadata.name      |             | <code>secretaccessrequest</code>           |
| metadata.namespace |             | <code>default</code>                       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i enginekubevaultcom-secretaccessrequest-editor bytebuilders-ui/enginekubevaultcom-secretaccessrequest-editor -n default --create-namespace --version=v0.4.14 --set apiVersion=engine.kubevault.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i enginekubevaultcom-secretaccessrequest-editor bytebuilders-ui/enginekubevaultcom-secretaccessrequest-editor -n default --create-namespace --version=v0.4.14 --values values.yaml
```
