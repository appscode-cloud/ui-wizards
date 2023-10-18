# ProjectQuota Editor

[ProjectQuota Editor by AppsCode](https://byte.builders) - ProjectQuota Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/managementk8sappscodecom-projectquota-editor --version=v0.4.18
$ helm upgrade -i managementk8sappscodecom-projectquota-editor bytebuilders-ui/managementk8sappscodecom-projectquota-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a ProjectQuota Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `managementk8sappscodecom-projectquota-editor`:

```bash
$ helm upgrade -i managementk8sappscodecom-projectquota-editor bytebuilders-ui/managementk8sappscodecom-projectquota-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a ProjectQuota Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `managementk8sappscodecom-projectquota-editor`:

```bash
$ helm uninstall managementk8sappscodecom-projectquota-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `managementk8sappscodecom-projectquota-editor` chart and their default values.

|     Parameter      | Description |                      Default                      |
|--------------------|-------------|---------------------------------------------------|
| apiVersion         |             | <code>management.k8s.appscode.com/v1alpha1</code> |
| kind               |             | <code>ProjectQuota</code>                         |
| metadata.name      |             | <code>projectquota</code>                         |
| metadata.namespace |             | <code>""</code>                                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i managementk8sappscodecom-projectquota-editor bytebuilders-ui/managementk8sappscodecom-projectquota-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=management.k8s.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i managementk8sappscodecom-projectquota-editor bytebuilders-ui/managementk8sappscodecom-projectquota-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```