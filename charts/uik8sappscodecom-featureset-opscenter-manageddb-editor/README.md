# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://byte.builders) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/uik8sappscodecom-featureset-opscenter-manageddb-editor --version=v0.4.16
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-manageddb-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-manageddb-editor -n default --create-namespace --version=v0.4.16
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-manageddb-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-manageddb-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-manageddb-editor -n default --create-namespace --version=v0.4.16
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-manageddb-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-manageddb-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-manageddb-editor` chart and their default values.

|                            Parameter                             | Description |                                                                                                                                                                                                                                                                                                                Default                                                                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                          |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.resource.version                                        |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.name                                           |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.kind                                           |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.scope                                          |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.release.name                                            |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.release.namespace                                       |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| resources.helmToolkitFluxcdIoHelmRelease_capi_ui_presets         |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"capi-ui-presets","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"capi-ui-presets","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v2023.03.23"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"capi-ui-presets","storageNamespace":"kubeops","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                             |
| resources.helmToolkitFluxcdIoHelmRelease_crossplane              |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"crossplane","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"crossplane","sourceRef":{"kind":"HelmRepository","name":"crossplane","namespace":"kubeops"},"version":"1.12.2"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"crossplane","storageNamespace":"crossplane-system","targetNamespace":"crossplane-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                           |
| resources.helmToolkitFluxcdIoHelmRelease_external_dns_operator   |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"external-dns-operator","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"external-dns-operator","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v2022.06.14"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"external-dns-operator","storageNamespace":"kubeops","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                           |
| resources.helmToolkitFluxcdIoHelmRelease_kubedb_gateway          |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"kubedb-gateway","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"gateway-helm","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v0.0.0-latest"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubedb-gateway","storageNamespace":"gateway-system","targetNamespace":"gateway-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                  |
| resources.helmToolkitFluxcdIoHelmRelease_kubeform_provider_azure |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"kubeform-provider-azure","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubeform-provider-azure","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v2023.06.27"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubeform-provider-azure","storageNamespace":"crossplane-system","targetNamespace":"crossplane-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_kubeform_provider_gcp   |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"kubeform-provider-gcp","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubeform-provider-gcp","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v2023.06.27"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubeform-provider-gcp","storageNamespace":"crossplane-system","targetNamespace":"crossplane-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>       |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-manageddb-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-manageddb-editor -n default --create-namespace --version=v0.4.16 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-manageddb-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-manageddb-editor -n default --create-namespace --version=v0.4.16 --values values.yaml
```
