# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://appscode.com) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/uik8sappscodecom-featureset-opscenter-networking-editor --version=v0.30.0
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-networking-editor appscode/uik8sappscodecom-featureset-opscenter-networking-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-networking-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-networking-editor appscode/uik8sappscodecom-featureset-opscenter-networking-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-networking-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-networking-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-networking-editor` chart and their default values.

|                           Parameter                            | Description |                                                                                                                                                                                                                                                                                                                                      Default                                                                                                                                                                                                                                                                                                                                      |
|----------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                        |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.resource.version                                      |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.resource.name                                         |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.kind                                         |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.resource.scope                                        |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.release.name                                          |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata.release.namespace                                     |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| resources.helmToolkitFluxcdIoHelmRelease_external_dns_operator |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"external-dns-operator"},"name":"external-dns-operator","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"external-dns-operator","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.4.19"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"external-dns-operator","storageNamespace":"kubeops","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_gateway_api           |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"gateway-api"},"name":"gateway-api","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"gateway-api","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2025.3.14"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"gateway-api","storageNamespace":"envoy-gateway-system","targetNamespace":"envoy-gateway-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>               |
| resources.helmToolkitFluxcdIoHelmRelease_voyager               |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"voyager"},"name":"voyager","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"voyager","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.8.30"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"voyager","storageNamespace":"voyager","targetNamespace":"voyager","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                         |
| resources.helmToolkitFluxcdIoHelmRelease_voyager_gateway       |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"voyager-gateway"},"name":"voyager-gateway","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"voyager-gateway","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2025.6.30"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"voyager-gateway","storageNamespace":"gateway-system","targetNamespace":"gateway-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-networking-editor appscode/uik8sappscodecom-featureset-opscenter-networking-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-networking-editor appscode/uik8sappscodecom-featureset-opscenter-networking-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
