# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://appscode.com) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/uik8sappscodecom-featureset-capi-capa-editor --version=v0.6.0
$ helm upgrade -i uik8sappscodecom-featureset-capi-capa-editor appscode-charts-oci/uik8sappscodecom-featureset-capi-capa-editor -n default --create-namespace --version=v0.6.0
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-capi-capa-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-capi-capa-editor appscode-charts-oci/uik8sappscodecom-featureset-capi-capa-editor -n default --create-namespace --version=v0.6.0
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-capi-capa-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-capi-capa-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-capi-capa-editor` chart and their default values.

|                             Parameter                              | Description |                                                                                                                                                                                                                                                                                                                                                                                                                        Default                                                                                                                                                                                                                                                                                                                                                                                                                        |
|--------------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                            |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.resource.version                                          |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.name                                             |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.kind                                             |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.resource.scope                                            |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.release.name                                              |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.release.namespace                                         |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| resources.helmToolkitFluxcdIoHelmRelease_aws_ebs_csi_driver        |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"aws-ebs-csi-driver"},"name":"aws-ebs-csi-driver","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"aws-ebs-csi-driver","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"2.23.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"aws-ebs-csi-driver","storageNamespace":"kube-system","targetNamespace":"kube-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                                                                                                                                             |
| resources.helmToolkitFluxcdIoHelmRelease_capa_vpc_peering_operator |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"capa-vpc-peering-operator"},"name":"capa-vpc-peering-operator","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"capa-vpc-peering-operator","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.12.11"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"capa-vpc-peering-operator","storageNamespace":"crossplane-system","targetNamespace":"crossplane-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                                                                                                |
| resources.helmToolkitFluxcdIoHelmRelease_cluster_autoscaler        |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"cluster-autoscaler"},"name":"cluster-autoscaler","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"cluster-autoscaler","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"9.29.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"cluster-autoscaler","storageNamespace":"capi-cluster","targetNamespace":"capi-cluster","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}},"values":{"autoscalingGroups":[{"maxSize":6,"minSize":1,"name":"default"}],"cloudProvider":"clusterapi","extraArgs":{"logtostderr":null,"stderrthreshold":null,"v":null}}}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-capi-capa-editor appscode-charts-oci/uik8sappscodecom-featureset-capi-capa-editor -n default --create-namespace --version=v0.6.0 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-capi-capa-editor appscode-charts-oci/uik8sappscodecom-featureset-capi-capa-editor -n default --create-namespace --version=v0.6.0 --values values.yaml
```
