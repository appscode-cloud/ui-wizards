# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://appscode.com) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/uik8sappscodecom-featureset-opscenter-policy-management-editor --version=v0.5.0
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-policy-management-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-policy-management-editor -n default --create-namespace --version=v0.5.0
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-policy-management-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-policy-management-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-policy-management-editor -n default --create-namespace --version=v0.5.0
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-policy-management-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-policy-management-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-policy-management-editor` chart and their default values.

|                               Parameter                                | Description |                                                                                                                                                                                                                                                                                                                                                                 Default                                                                                                                                                                                                                                                                                                                                                                 |
|------------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                                |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| metadata.resource.version                                              |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| metadata.resource.name                                                 |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| metadata.resource.kind                                                 |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.resource.scope                                                |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| metadata.release.name                                                  |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.release.namespace                                             |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| resources.helmToolkitFluxcdIoHelmRelease_gatekeeper                    |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"gatekeeper"},"name":"gatekeeper","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"gatekeeper","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"3.13.3"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"gatekeeper","storageNamespace":"gatekeeper-system","targetNamespace":"gatekeeper-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}},"values":{"constraintViolationsLimit":100}}}</code>                                        |
| resources.helmToolkitFluxcdIoHelmRelease_gatekeeper_constraints        |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"gatekeeper-constraints"},"name":"gatekeeper-constraints","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"gatekeeper-library","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.10.1"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"gatekeeper-constraints","storageNamespace":"gatekeeper-system","targetNamespace":"gatekeeper-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}},"values":{"enable":"constraints"}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_gatekeeper_grafana_dashboards |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"gatekeeper-grafana-dashboards"},"name":"gatekeeper-grafana-dashboards","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"gatekeeper-grafana-dashboards","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.10.1"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"gatekeeper-grafana-dashboards","storageNamespace":"gatekeeper-system","targetNamespace":"gatekeeper-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>   |
| resources.helmToolkitFluxcdIoHelmRelease_gatekeeper_templates          |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"gatekeeper-templates"},"name":"gatekeeper-templates","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"gatekeeper-library","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.10.1"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"gatekeeper-templates","storageNamespace":"gatekeeper-system","targetNamespace":"gatekeeper-system","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}},"values":{"enable":"templates"}}}</code>         |
| resources.helmToolkitFluxcdIoHelmRelease_kyverno                       |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kyverno"},"name":"kyverno","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kyverno","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"3.2.6"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kyverno","storageNamespace":"kyverno","targetNamespace":"kyverno","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                                                                                    |
| resources.helmToolkitFluxcdIoHelmRelease_kyverno_policies              |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kyverno-policies"},"name":"kyverno-policies","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kyverno-policies","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"3.2.5"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kyverno-policies","storageNamespace":"falco","targetNamespace":"falco","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                                                    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-policy-management-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-policy-management-editor -n default --create-namespace --version=v0.5.0 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-policy-management-editor appscode-charts-oci/uik8sappscodecom-featureset-opscenter-policy-management-editor -n default --create-namespace --version=v0.5.0 --values values.yaml
```