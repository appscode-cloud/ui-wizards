# MutatingWebhookConfiguration Editor

[MutatingWebhookConfiguration Editor by AppsCode](https://byte.builders) - MutatingWebhookConfiguration Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor --version=v0.4.7
$ helm upgrade -i admissionregistrationk8sio-mutatingwebhookconfiguration-editor bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default --create-namespace --version=v0.4.7
```

## Introduction

This chart deploys a MutatingWebhookConfiguration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `admissionregistrationk8sio-mutatingwebhookconfiguration-editor`:

```bash
$ helm upgrade -i admissionregistrationk8sio-mutatingwebhookconfiguration-editor bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default --create-namespace --version=v0.4.7
```

The command deploys a MutatingWebhookConfiguration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `admissionregistrationk8sio-mutatingwebhookconfiguration-editor`:

```bash
$ helm uninstall admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `admissionregistrationk8sio-mutatingwebhookconfiguration-editor` chart and their default values.

|     Parameter      | Description |                   Default                    |
|--------------------|-------------|----------------------------------------------|
| apiVersion         |             | <code>admissionregistration.k8s.io/v1</code> |
| kind               |             | <code>MutatingWebhookConfiguration</code>    |
| metadata.name      |             | <code>mutatingwebhookconfiguration</code>    |
| metadata.namespace |             | <code>""</code>                              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i admissionregistrationk8sio-mutatingwebhookconfiguration-editor bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default --create-namespace --version=v0.4.7 --set apiVersion=admissionregistration.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i admissionregistrationk8sio-mutatingwebhookconfiguration-editor bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default --create-namespace --version=v0.4.7 --values values.yaml
```
