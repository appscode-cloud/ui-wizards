# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://appscode.com) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/uik8sappscodecom-featureset-capi-core-editor --version=v0.8.0
$ helm upgrade -i uik8sappscodecom-featureset-capi-core-editor appscode-charts-oci/uik8sappscodecom-featureset-capi-core-editor -n default --create-namespace --version=v0.8.0
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-capi-core-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-capi-core-editor appscode-charts-oci/uik8sappscodecom-featureset-capi-core-editor -n default --create-namespace --version=v0.8.0
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-capi-core-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-capi-core-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-capi-core-editor` chart and their default values.

|                            Parameter                             | Description |                                                                                                                                                                                                                                                                                                                                         Default                                                                                                                                                                                                                                                                                                                                          |
|------------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                          |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata.resource.version                                        |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| metadata.resource.name                                           |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.kind                                           |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.resource.scope                                          |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.release.name                                            |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| metadata.release.namespace                                       |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| resources.helmToolkitFluxcdIoHelmRelease_capi_catalog            |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"capi-catalog"},"name":"capi-catalog","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"capi-catalog","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.7.9"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"capi-catalog","storageNamespace":"capi-cluster","targetNamespace":"capi-cluster","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                   |
| resources.helmToolkitFluxcdIoHelmRelease_capi_ops_manager        |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"capi-ops-manager"},"name":"capi-ops-manager","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"capi-ops-manager","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.5.14"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"capi-ops-manager","storageNamespace":"capi-cluster","targetNamespace":"capi-cluster","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                  |
| resources.helmToolkitFluxcdIoHelmRelease_cluster_presets         |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"cluster-presets"},"name":"cluster-presets","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"cluster-presets","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.8.21"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"cluster-presets","storageNamespace":"capi-cluster","targetNamespace":"capi-cluster","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                      |
| resources.helmToolkitFluxcdIoHelmRelease_docker_machine_operator |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"docker-machine-operator"},"name":"docker-machine-operator","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"docker-machine-operator","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.7.9"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"docker-machine-operator","storageNamespace":"kubeops","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-capi-core-editor appscode-charts-oci/uik8sappscodecom-featureset-capi-core-editor -n default --create-namespace --version=v0.8.0 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-capi-core-editor appscode-charts-oci/uik8sappscodecom-featureset-capi-core-editor -n default --create-namespace --version=v0.8.0 --values values.yaml
```
