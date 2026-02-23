# CertificateSigningRequest Editor

[CertificateSigningRequest Editor by AppsCode](https://appscode.com) - CertificateSigningRequest Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/certificatesk8sio-certificatesigningrequest-editor --version=v0.30.0
$ helm upgrade -i certificatesk8sio-certificatesigningrequest-editor appscode/certificatesk8sio-certificatesigningrequest-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a CertificateSigningRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `certificatesk8sio-certificatesigningrequest-editor`:

```bash
$ helm upgrade -i certificatesk8sio-certificatesigningrequest-editor appscode/certificatesk8sio-certificatesigningrequest-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a CertificateSigningRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `certificatesk8sio-certificatesigningrequest-editor`:

```bash
$ helm uninstall certificatesk8sio-certificatesigningrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `certificatesk8sio-certificatesigningrequest-editor` chart and their default values.

|     Parameter      | Description |                Default                 |
|--------------------|-------------|----------------------------------------|
| apiVersion         |             | <code>certificates.k8s.io/v1</code>    |
| kind               |             | <code>CertificateSigningRequest</code> |
| metadata.name      |             | <code>certificatesigningrequest</code> |
| metadata.namespace |             | <code>default</code>                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i certificatesk8sio-certificatesigningrequest-editor appscode/certificatesk8sio-certificatesigningrequest-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=certificates.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i certificatesk8sio-certificatesigningrequest-editor appscode/certificatesk8sio-certificatesigningrequest-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
