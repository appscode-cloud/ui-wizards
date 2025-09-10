# SelfSubjectNamespaceAccessReview Editor

[SelfSubjectNamespaceAccessReview Editor by AppsCode](https://appscode.com) - SelfSubjectNamespaceAccessReview Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor --version=v0.24.0
$ helm upgrade -i identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor appscode/identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor -n default --create-namespace --version=v0.24.0
```

## Introduction

This chart deploys a SelfSubjectNamespaceAccessReview Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor`:

```bash
$ helm upgrade -i identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor appscode/identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor -n default --create-namespace --version=v0.24.0
```

The command deploys a SelfSubjectNamespaceAccessReview Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor`:

```bash
$ helm uninstall identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor` chart and their default values.

|     Parameter      | Description |                     Default                     |
|--------------------|-------------|-------------------------------------------------|
| apiVersion         |             | <code>identity.k8s.appscode.com/v1alpha1</code> |
| kind               |             | <code>SelfSubjectNamespaceAccessReview</code>   |
| metadata.name      |             | <code>selfsubjectnamespaceaccessreview</code>   |
| metadata.namespace |             | <code>""</code>                                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor appscode/identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor -n default --create-namespace --version=v0.24.0 --set apiVersion=identity.k8s.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor appscode/identityk8sappscodecom-selfsubjectnamespaceaccessreview-editor -n default --create-namespace --version=v0.24.0 --values values.yaml
```
