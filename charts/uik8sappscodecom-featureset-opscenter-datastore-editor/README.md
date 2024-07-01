# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://byte.builders) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/uik8sappscodecom-featureset-opscenter-datastore-editor --version=v0.4.21
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-datastore-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-datastore-editor -n default --create-namespace --version=v0.4.21
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-datastore-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-datastore-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-datastore-editor -n default --create-namespace --version=v0.4.21
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-datastore-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-datastore-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-datastore-editor` chart and their default values.

|                         Parameter                          | Description |                                                                                                                                                                                                                                                                                                                                                                                                           Default                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                    |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.resource.version                                  |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| metadata.resource.name                                     |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.resource.kind                                     |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.resource.scope                                    |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata.release.name                                      |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| metadata.release.namespace                                 |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| resources.helmToolkitFluxcdIoHelmRelease_kubedb            |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kubedb"},"name":"kubedb","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubedb","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.4.27"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubedb","storageNamespace":"kubedb","targetNamespace":"kubedb","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}},"values":{"kubedb-autoscaler":{"enabled":true},"kubedb-dashboard":{"enabled":true},"kubedb-ops-manager":{"enabled":true},"kubedb-provisioner":{"enabled":true},"kubedb-schema-manager":{"enabled":true}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_kubedb_opscenter  |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kubedb-opscenter"},"name":"kubedb-opscenter","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubedb-opscenter","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.4.27"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubedb-opscenter","storageNamespace":"kubedb","targetNamespace":"kubedb","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                                                                                                                                  |
| resources.helmToolkitFluxcdIoHelmRelease_kubedb_ui_presets |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kubedb-ui-presets"},"name":"kubedb-ui-presets","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kubedb-ui-presets","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2024.6.18"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kubedb-ui-presets","storageNamespace":"kubedb","targetNamespace":"kubedb","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                                                                                                                              |
| resources.helmToolkitFluxcdIoHelmRelease_prepare_cluster   |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"prepare-cluster"},"name":"prepare-cluster","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"prepare-cluster","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.12.21"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"prepare-cluster","storageNamespace":"kubedb","targetNamespace":"kubedb","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                                                                                                                                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-datastore-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-datastore-editor -n default --create-namespace --version=v0.4.21 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-datastore-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-datastore-editor -n default --create-namespace --version=v0.4.21 --values values.yaml
```
