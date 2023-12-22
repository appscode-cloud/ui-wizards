# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://byte.builders) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/uik8sappscodecom-featureset-vcluster-editor --version=v0.4.18
$ helm upgrade -i uik8sappscodecom-featureset-vcluster-editor appscode-charts-oci/uik8sappscodecom-featureset-vcluster-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-vcluster-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-vcluster-editor appscode-charts-oci/uik8sappscodecom-featureset-vcluster-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-vcluster-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-vcluster-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-vcluster-editor` chart and their default values.

|                           Parameter                            | Description |                                                                                                                                                                                                                                                                                                                                                                                                Default                                                                                                                                                                                                                                                                                                                                                                                                |
|----------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                        |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.resource.version                                      |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.name                                         |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.kind                                         |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.scope                                        |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.release.name                                          |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.release.namespace                                     |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| resources.helmToolkitFluxcdIoHelmRelease_cluster_manager_spoke |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"ace.appscode.com/feature":"cluster-manager-spoke"},"name":"cluster-manager-spoke","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"cluster-manager-spoke","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"0.1.0"}},"dependsOn":[{"name":"vcluster"}],"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"cluster-manager-spoke","storageNamespace":"open-cluster-management","targetNamespace":"open-cluster-management","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                      |
| resources.helmToolkitFluxcdIoHelmRelease_vcluster              |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"ace.appscode.com/feature":"vcluster"},"name":"vcluster","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"vcluster","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"0.16.4"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"vcluster","storageNamespace":"open-cluster-management","targetNamespace":"open-cluster-management","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}},"values":{"sync":{"hoststorageclasses":{"enabled":true}},"telemetry":{"disabled":"true"},"vcluster":{"image":"rancher/k3s:v1.23.5-k3s1"}}}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-vcluster-editor appscode-charts-oci/uik8sappscodecom-featureset-vcluster-editor -n default --create-namespace --version=v0.4.18 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-vcluster-editor appscode-charts-oci/uik8sappscodecom-featureset-vcluster-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
