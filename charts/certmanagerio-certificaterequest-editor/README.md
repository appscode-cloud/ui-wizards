# CertificateRequest Editor

[CertificateRequest Editor by AppsCode](https://appscode.com) - CertificateRequest Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/certmanagerio-certificaterequest-editor --version=v0.30.0
$ helm upgrade -i certmanagerio-certificaterequest-editor appscode/certmanagerio-certificaterequest-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a CertificateRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `certmanagerio-certificaterequest-editor`:

```bash
$ helm upgrade -i certmanagerio-certificaterequest-editor appscode/certmanagerio-certificaterequest-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a CertificateRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `certmanagerio-certificaterequest-editor`:

```bash
$ helm uninstall certmanagerio-certificaterequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `certmanagerio-certificaterequest-editor` chart and their default values.

|     Parameter      | Description |             Default             |
|--------------------|-------------|---------------------------------|
| apiVersion         |             | <code>cert-manager.io/v1</code> |
| kind               |             | <code>CertificateRequest</code> |
| metadata.name      |             | <code>certificaterequest</code> |
| metadata.namespace |             | <code>default</code>            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i certmanagerio-certificaterequest-editor appscode/certmanagerio-certificaterequest-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=cert-manager.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i certmanagerio-certificaterequest-editor appscode/certmanagerio-certificaterequest-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
