# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://byte.builders) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/uik8sappscodecom-featureset-opscenter-monitoring-editor --version=v0.30.0
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-monitoring-editor appscode/uik8sappscodecom-featureset-opscenter-monitoring-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-monitoring-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-monitoring-editor appscode/uik8sappscodecom-featureset-opscenter-monitoring-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a FeatureSet Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `uik8sappscodecom-featureset-opscenter-monitoring-editor`:

```bash
$ helm uninstall uik8sappscodecom-featureset-opscenter-monitoring-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `uik8sappscodecom-featureset-opscenter-monitoring-editor` chart and their default values.

|                            Parameter                             | Description |                                                                                                                                                                                                                                                                                                                                               Default                                                                                                                                                                                                                                                                                                                                                |
|------------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                          |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.resource.version                                        |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| metadata.resource.name                                           |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| metadata.resource.kind                                           |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.scope                                          |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| metadata.release.name                                            |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.release.namespace                                       |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| resources.helmToolkitFluxcdIoHelmRelease_grafana_operator        |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"grafana-operator"},"name":"grafana-operator","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"grafana-operator","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v0.0.3"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"grafana-operator","storageNamespace":"monitoring","targetNamespace":"monitoring","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                 |
| resources.helmToolkitFluxcdIoHelmRelease_kube_grafana_dashboards |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kube-grafana-dashboards"},"name":"kube-grafana-dashboards","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kube-grafana-dashboards","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.10.1"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kube-grafana-dashboards","storageNamespace":"monitoring","targetNamespace":"monitoring","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_kube_prometheus_stack   |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"kube-prometheus-stack"},"name":"kube-prometheus-stack","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kube-prometheus-stack","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"52.1.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"kube-prometheus-stack","storageNamespace":"monitoring","targetNamespace":"monitoring","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>             |
| resources.helmToolkitFluxcdIoHelmRelease_metrics_server          |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"metrics-server"},"name":"metrics-server","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"metrics-server","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v0.0.3"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"metrics-server","storageNamespace":"monitoring","targetNamespace":"monitoring","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                         |
| resources.helmToolkitFluxcdIoHelmRelease_monitoring_operator     |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"monitoring-operator"},"name":"monitoring-operator","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"monitoring-operator","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v0.0.3"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"monitoring-operator","storageNamespace":"monitoring","targetNamespace":"monitoring","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                     |
| resources.helmToolkitFluxcdIoHelmRelease_panopticon              |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"panopticon"},"name":"panopticon","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"panopticon","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v2023.10.1"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"panopticon","storageNamespace":"monitoring","targetNamespace":"monitoring","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                                                     |
| resources.helmToolkitFluxcdIoHelmRelease_prometheus_adapter      |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta2","kind":"HelmRelease","metadata":{"labels":{"app.kubernetes.io/component":"prometheus-adapter"},"name":"prometheus-adapter","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"prometheus-adapter","sourceRef":{"kind":"HelmRepository","name":"appscode-charts-oci","namespace":"kubeops"},"version":"v0.0.3"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":-1}},"interval":"5m","releaseName":"prometheus-adapter","storageNamespace":"monitoring","targetNamespace":"monitoring","timeout":"30m","upgrade":{"crds":"CreateReplace","remediation":{"retries":-1}}}}</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-monitoring-editor appscode/uik8sappscodecom-featureset-opscenter-monitoring-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-monitoring-editor appscode/uik8sappscodecom-featureset-opscenter-monitoring-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
