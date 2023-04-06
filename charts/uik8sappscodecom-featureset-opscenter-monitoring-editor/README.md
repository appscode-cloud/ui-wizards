# FeatureSet Editor

[FeatureSet Editor by AppsCode](https://byte.builders) - FeatureSet Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/uik8sappscodecom-featureset-opscenter-monitoring-editor --version=v0.4.14
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-monitoring-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-monitoring-editor -n default --create-namespace --version=v0.4.14
```

## Introduction

This chart deploys a FeatureSet Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `uik8sappscodecom-featureset-opscenter-monitoring-editor`:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-monitoring-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-monitoring-editor -n default --create-namespace --version=v0.4.14
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

|                           Parameter                            | Description |                                                                                                                                                                                                                                                                                                                                              Default                                                                                                                                                                                                                                                                                                                                               |
|----------------------------------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group                                        |             | <code>ui.k8s.appscode.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| metadata.resource.version                                      |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| metadata.resource.name                                         |             | <code>featuresets</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| metadata.resource.kind                                         |             | <code>FeatureSet</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| metadata.resource.scope                                        |             | <code>Cluster</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| metadata.release.name                                          |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.release.namespace                                     |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| resources.helmToolkitFluxcdIoHelmRelease_grafana_opscenter     |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"grafana-opscenter","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"grafana-opscenter","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v2023.03.23"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":5}},"interval":"5m","releaseName":"grafana-opscenter","targetNamespace":"monitoring","timeout":"10m","upgrade":{"crds":"CreateReplace","remediation":{"retries":5}},"values":{"grafana-operator":{"enabled":true},"grafana-ui-server":{"enabled":true},"kube-grafana-dashboards":{"enabled":true}}}}</code> |
| resources.helmToolkitFluxcdIoHelmRelease_kube_prometheus_stack |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"kube-prometheus-stack","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"kube-prometheus-stack","sourceRef":{"kind":"HelmRepository","name":"prometheus-community","namespace":"kubeops"},"version":"45.0.0"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":5}},"interval":"5m","releaseName":"kube-prometheus-stack","targetNamespace":"monitoring","timeout":"10m","upgrade":{"crds":"CreateReplace","remediation":{"retries":5}}}}</code>                                                                                                             |
| resources.helmToolkitFluxcdIoHelmRelease_monitoring_config     |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"monitoring-config","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"monitoring-config","sourceRef":{"kind":"HelmRepository","name":"bytebuilders","namespace":"kubeops"},"version":"v2023.03.23"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":5}},"interval":"5m","releaseName":"monitoring-config","targetNamespace":"monitoring","timeout":"10m","upgrade":{"crds":"CreateReplace","remediation":{"retries":5}}}}</code>                                                                                                                            |
| resources.helmToolkitFluxcdIoHelmRelease_panopticon            |             | <code>{"apiVersion":"helm.toolkit.fluxcd.io/v2beta1","kind":"HelmRelease","metadata":{"name":"panopticon","namespace":"kubeops"},"spec":{"chart":{"spec":{"chart":"panopticon","sourceRef":{"kind":"HelmRepository","name":"appscode","namespace":"kubeops"},"version":"v2023.03.23"}},"install":{"crds":"CreateReplace","createNamespace":true,"remediation":{"retries":5}},"interval":"5m","releaseName":"panopticon","targetNamespace":"monitoring","timeout":"10m","upgrade":{"crds":"CreateReplace","remediation":{"retries":5}}}}</code>                                                                                                                                                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-monitoring-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-monitoring-editor -n default --create-namespace --version=v0.4.14 --set metadata.resource.group=ui.k8s.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i uik8sappscodecom-featureset-opscenter-monitoring-editor bytebuilders-ui/uik8sappscodecom-featureset-opscenter-monitoring-editor -n default --create-namespace --version=v0.4.14 --values values.yaml
```
