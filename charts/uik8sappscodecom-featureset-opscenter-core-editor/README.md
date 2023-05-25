# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://byte.builders) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/uik8sappscodecom-featureset-opscenter-core-editor --version=v0.4.16
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-core-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-core-editor -n default --create-namespace --version=v0.4.16
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-core-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-core-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-core-editor -n default --create-namespace --version=v0.4.16
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-core-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-core-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-core-editor` chart and their default values.

|                        Parameter                        | Description |                                                                                                                                                                                                                                                                          Default                                                                                                                                                                                                                                                                          |
|---------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                 |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.version                               |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.resource.name                                  |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.resource.kind                                  |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| metadata.resource.scope                                 |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.release.name                                   |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.release.namespace                              |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| resources.helmToolkitFluxcdIoHelmRelease_kube_ui_server |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"kube-ui-server","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kube-ui-server","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v2023.03.23"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kube-ui-server","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_supervisor     |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"supervisor","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"supervisor","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v2023.03.23"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"supervisor","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>             |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-core-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-core-editor -n default --create-namespace --version=v0.4.16 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-core-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-core-editor -n default --create-namespace --version=v0.4.16 --values values.yaml
```
