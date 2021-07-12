# MutatingWebhookConfiguration Editor

[MutatingWebhookConfiguration Editor by AppsCode](https://byte.builders) - MutatingWebhookConfiguration Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install admissionregistrationk8sio-mutatingwebhookconfiguration-editor bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default
```

## Introduction

This chart deploys a MutatingWebhookConfiguration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `admissionregistrationk8sio-mutatingwebhookconfiguration-editor`:

```console
$ helm install admissionregistrationk8sio-mutatingwebhookconfiguration-editor bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default
```

The command deploys a MutatingWebhookConfiguration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `admissionregistrationk8sio-mutatingwebhookconfiguration-editor`:

```console
$ helm delete admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `admissionregistrationk8sio-mutatingwebhookconfiguration-editor` chart and their default values.

|   Parameter   | Description |              Default              |
|---------------|-------------|-----------------------------------|
| apiVersion    |             | `admissionregistration.k8s.io/v1` |
| kind          |             | `MutatingWebhookConfiguration`    |
| metadata.name |             | `mutatingwebhookconfiguration`    |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install admissionregistrationk8sio-mutatingwebhookconfiguration-editor bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default --set apiVersion=admissionregistration.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install admissionregistrationk8sio-mutatingwebhookconfiguration-editor bytebuilders-ui/admissionregistrationk8sio-mutatingwebhookconfiguration-editor -n default --values values.yaml
```
