# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://appscode.com) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/uik8sappscodecom-featureset-opscenter-storage-editor --version=v0.30.0
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-storage-editor appscode/uik8sappscodecom-featureset-opscenter-storage-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-storage-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-storage-editor appscode/uik8sappscodecom-featureset-opscenter-storage-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-storage-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-storage-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-storage-editor` chart and their default values.

|                          Parameter                           | Description |                                                                                                                                                                                                                                                                                                                               Default                                                                                                                                                                                                                                                                                                                                |
|--------------------------------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                      |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.resource.version                                    |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| metadata.resource.name                                       |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.resource.kind                                       |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.scope                                      |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.release.name                                        |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.release.namespace                                   |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| resources.helmToolkitFluxcdIoHelmRelease_csi_driver_nfs      |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"csi-driver-nfs"},"name":"csi-driver-nfs","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"csi-driver-nfs","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v4.7.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"csi-driver-nfs","storageNamespace":"kube-system","targetNamespace":"kube-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>            |
| resources.helmToolkitFluxcdIoHelmRelease_longhorn            |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"longhorn"},"name":"longhorn","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"longhorn","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"1.7.2"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"longhorn","storageNamespace":"longhorn-system","targetNamespace":"longhorn-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                             |
| resources.helmToolkitFluxcdIoHelmRelease_snapshot_controller |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"snapshot-controller"},"name":"snapshot-controller","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"snapshot-controller","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"3.0.6"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"snapshot-controller","storageNamespace":"kubeops","targetNamespace":"kubeops","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_topolvm             |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"topolvm"},"name":"topolvm","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"topolvm","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"15.0.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"topolvm","storageNamespace":"topolvm-system","targetNamespace":"topolvm-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-storage-editor appscode/uik8sappscodecom-featureset-opscenter-storage-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-storage-editor appscode/uik8sappscodecom-featureset-opscenter-storage-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
