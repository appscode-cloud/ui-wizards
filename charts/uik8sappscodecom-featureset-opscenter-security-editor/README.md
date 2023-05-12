# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://byte.builders) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/uik8sappscodecom-featureset-opscenter-security-editor --version=v0.4.15
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-security-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-security-editor -n default --create-namespace --version=v0.4.15
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-security-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-security-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-security-editor -n default --create-namespace --version=v0.4.15
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-security-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-security-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-security-editor` chart and their default values.

|                          Parameter                           | Description |                                                                                                                                                                                                                                                                                      Default                                                                                                                                                                                                                                                                                       |
|--------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                      |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| metadata.resource.version                                    |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.name                                       |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.resource.kind                                       |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.resource.scope                                      |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.release.name                                        |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.release.namespace                                   |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| resources.helmToolkitFluxcdIoHelmRelease_cert_manager        |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"cert-manager","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"cert-manager","sourceRef":{"kind":"HelmRepository","name":"jetstack","namespace":"kubeops"},"version":"v1.11.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"cert-manager","targetNamespace":"cert-manager","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}},"values":{"installCRDs":true}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_kubevault           |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"kubevault","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubevault","sourceRef":{"kind":"HelmRepository","name":"kubevault","namespace":"kubeops"},"version":"v2023.03.03"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubevault","targetNamespace":"kubevault","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                      |
| resources.helmToolkitFluxcdIoHelmRelease_kubevault_opscenter |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"kubevault-opscenter","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubevault-opscenter","sourceRef":{"kind":"HelmRepository","name":"kubevault","namespace":"kubeops"},"version":"v2023.03.03"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubevault-opscenter","targetNamespace":"kubevault","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>        |
| resources.helmToolkitFluxcdIoHelmRelease_scanner             |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"scanner","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"scanner","sourceRef":{"kind":"HelmRepository","name":"kubeops","namespace":"kubeops"},"version":"v2023.03.23"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"scanner","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-security-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-security-editor -n default --create-namespace --version=v0.4.15 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-security-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-security-editor -n default --create-namespace --version=v0.4.15 --values values.yaml
```
