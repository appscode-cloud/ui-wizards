# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://appscode.com) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/uik8sappscodecom-featureset-ocm-spoke-editor --version=v0.30.0
$ helm upgrade -i uik8sappscodecom-featureset-ocm-spoke-editor appscode/uik8sappscodecom-featureset-ocm-spoke-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-ocm-spoke-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-ocm-spoke-editor appscode/uik8sappscodecom-featureset-ocm-spoke-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-ocm-spoke-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-ocm-spoke-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-ocm-spoke-editor` chart and their default values.

|                           Parameter                            | Description |                                                                                                                                                                                                                                                                                                                                                      Default                                                                                                                                                                                                                                                                                                                                                      |
|----------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                        |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.resource.version                                      |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.resource.name                                         |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.kind                                         |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.resource.scope                                        |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.release.name                                          |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata.release.namespace                                     |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| resources.helmToolkitFluxcdIoHelmRelease_cluster_manager_spoke |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"cluster-manager-spoke"},"name":"cluster-manager-spoke","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"cluster-manager-spoke","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2025.7.31"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"cluster-manager-spoke","storageNamespace":"open-cluster-management","targetNamespace":"open-cluster-management","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-ocm-spoke-editor appscode/uik8sappscodecom-featureset-ocm-spoke-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-ocm-spoke-editor appscode/uik8sappscodecom-featureset-ocm-spoke-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
