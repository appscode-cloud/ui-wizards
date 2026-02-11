# AppliedManifestWork Editor

[AppliedManifestWork Editor by AppsCode](https://appscode.com) - AppliedManifestWork Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/workopenclustermanagementio-appliedmanifestwork-editor --version=v0.30.0
$ helm upgrade -i workopenclustermanagementio-appliedmanifestwork-editor appscode/workopenclustermanagementio-appliedmanifestwork-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a AppliedManifestWork Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `workopenclustermanagementio-appliedmanifestwork-editor`:

```bash
$ helm upgrade -i workopenclustermanagementio-appliedmanifestwork-editor appscode/workopenclustermanagementio-appliedmanifestwork-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a AppliedManifestWork Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `workopenclustermanagementio-appliedmanifestwork-editor`:

```bash
$ helm uninstall workopenclustermanagementio-appliedmanifestwork-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `workopenclustermanagementio-appliedmanifestwork-editor` chart and their default values.

|     Parameter      | Description |                     Default                     |
|--------------------|-------------|-------------------------------------------------|
| apiVersion         |             | <code>work.open-cluster-management.io/v1</code> |
| kind               |             | <code>AppliedManifestWork</code>                |
| metadata.name      |             | <code>appliedmanifestwork</code>                |
| metadata.namespace |             | <code>""</code>                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i workopenclustermanagementio-appliedmanifestwork-editor appscode/workopenclustermanagementio-appliedmanifestwork-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=work.open-cluster-management.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i workopenclustermanagementio-appliedmanifestwork-editor appscode/workopenclustermanagementio-appliedmanifestwork-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
