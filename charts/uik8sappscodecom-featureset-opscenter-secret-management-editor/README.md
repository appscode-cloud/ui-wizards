# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://byte.builders) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/uik8sappscodecom-featureset-opscenter-secret-management-editor --version=v0.4.18
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-secret-management-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-secret-management-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-secret-management-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-secret-management-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-secret-management-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-secret-management-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-secret-management-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-secret-management-editor` chart and their default values.

|                          Parameter                           | Description |                                                                                                                                                                                                                                                                                                                                         Default                                                                                                                                                                                                                                                                                                                                          |
|--------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                      |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata.resource.version                                    |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| metadata.resource.name                                       |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.kind                                       |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.resource.scope                                      |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.release.name                                        |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| metadata.release.namespace                                   |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| resources.helmToolkitFluxcdIoHelmRelease_config_syncer       |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"config-syncer"},"name":"config-syncer","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"config-syncer","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v0.14.3"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"config-syncer","storageNamespace":"kubeops","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}},"values":{"mode":"enterprise"}}}</code>       |
| resources.helmToolkitFluxcdIoHelmRelease_kubevault           |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kubevault"},"name":"kubevault","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubevault","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.10.26-rc.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubevault","storageNamespace":"kubevault","targetNamespace":"kubevault","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                         |
| resources.helmToolkitFluxcdIoHelmRelease_kubevault_opscenter |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kubevault-opscenter"},"name":"kubevault-opscenter","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubevault-opscenter","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.10.26-rc.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubevault-opscenter","storageNamespace":"kubevault","targetNamespace":"kubevault","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_reloader            |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"reloader"},"name":"reloader","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"reloader","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"1.0.50"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"reloader","storageNamespace":"kubeops","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-secret-management-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-secret-management-editor -n default --create-namespace --version=v0.4.18 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-secret-management-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-secret-management-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
