# CertificateRequest Editor

[CertificateRequest Editor by AppsCode](https://byte.builders) - CertificateRequest Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install certmanagerio-certificaterequest-editor bytebuilders-ui-dev/certmanagerio-certificaterequest-editor -n default
```

## Introduction

This chart deploys a CertificateRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `certmanagerio-certificaterequest-editor`:

```console
$ helm install certmanagerio-certificaterequest-editor bytebuilders-ui-dev/certmanagerio-certificaterequest-editor -n default
```

The command deploys a CertificateRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `certmanagerio-certificaterequest-editor`:

```console
$ helm delete certmanagerio-certificaterequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `certmanagerio-certificaterequest-editor` chart and their default values.

|     Parameter      | Description |       Default        |
|--------------------|-------------|----------------------|
| apiVersion         |             | `cert-manager.io/v1` |
| kind               |             | `CertificateRequest` |
| metadata.name      |             | `certificaterequest` |
| metadata.namespace |             | `default`            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install certmanagerio-certificaterequest-editor bytebuilders-ui-dev/certmanagerio-certificaterequest-editor -n default --set apiVersion=cert-manager.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install certmanagerio-certificaterequest-editor bytebuilders-ui-dev/certmanagerio-certificaterequest-editor -n default --values values.yaml
```
