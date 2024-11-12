# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://appscode.com) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/uik8sappscodecom-featureset-crossplane-editor --version=v0.10.0
$ helm upgrade -i uik8sappscodecom-featureset-crossplane-editor appscode-charts-oci/uik8sappscodecom-featureset-crossplane-editor -n default --create-namespace --version=v0.10.0
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-crossplane-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-crossplane-editor appscode-charts-oci/uik8sappscodecom-featureset-crossplane-editor -n default --create-namespace --version=v0.10.0
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-crossplane-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-crossplane-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-crossplane-editor` chart and their default values.

|                           Parameter                            | Description |                                                                                                                                                                                                                                                                                                                                                Default                                                                                                                                                                                                                                                                                                                                                |
|----------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                        |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.resource.version                                      |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.name                                         |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.kind                                         |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.scope                                        |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.release.name                                          |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.release.namespace                                     |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| resources.helmToolkitFluxcdIoHelmRelease_crossplane            |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"crossplane"},"name":"crossplane","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"crossplane","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"1.14.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"crossplane","storageNamespace":"crossplane-system","targetNamespace":"crossplane-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                 |
| resources.helmToolkitFluxcdIoHelmRelease_kubedb_provider_aws   |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kubedb-provider-aws"},"name":"kubedb-provider-aws","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubedb-provider-aws","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.1.31"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubedb-provider-aws","storageNamespace":"crossplane-system","targetNamespace":"crossplane-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>         |
| resources.helmToolkitFluxcdIoHelmRelease_kubedb_provider_azure |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kubedb-provider-azure"},"name":"kubedb-provider-azure","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubedb-provider-azure","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.1.31"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubedb-provider-azure","storageNamespace":"crossplane-system","targetNamespace":"crossplane-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_kubedb_provider_gcp   |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kubedb-provider-gcp"},"name":"kubedb-provider-gcp","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubedb-provider-gcp","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.1.31"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubedb-provider-gcp","storageNamespace":"crossplane-system","targetNamespace":"crossplane-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-crossplane-editor appscode-charts-oci/uik8sappscodecom-featureset-crossplane-editor -n default --create-namespace --version=v0.10.0 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-crossplane-editor appscode-charts-oci/uik8sappscodecom-featureset-crossplane-editor -n default --create-namespace --version=v0.10.0 --values values.yaml
```
