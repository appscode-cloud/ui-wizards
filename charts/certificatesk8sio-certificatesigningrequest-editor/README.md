# CertificateSigningRequest Editor

[CertificateSigningRequest Editor by AppsCode](https://byte.builders) - CertificateSigningRequest Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install certificatesk8sio-certificatesigningrequest-editor bytebuilders-ui/certificatesk8sio-certificatesigningrequest-editor -n default --version=v0.1.0
```

## Introduction

This chart deploys a CertificateSigningRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `certificatesk8sio-certificatesigningrequest-editor`:

```console
$ helm install certificatesk8sio-certificatesigningrequest-editor bytebuilders-ui/certificatesk8sio-certificatesigningrequest-editor -n default --version=v0.1.0
```

The command deploys a CertificateSigningRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `certificatesk8sio-certificatesigningrequest-editor`:

```console
$ helm delete certificatesk8sio-certificatesigningrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `certificatesk8sio-certificatesigningrequest-editor` chart and their default values.

|   Parameter   | Description |            Default            |
|---------------|-------------|-------------------------------|
| apiVersion    |             | `certificates.k8s.io/v1beta1` |
| kind          |             | `CertificateSigningRequest`   |
| metadata.name |             | `certificatesigningrequest`   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install certificatesk8sio-certificatesigningrequest-editor bytebuilders-ui/certificatesk8sio-certificatesigningrequest-editor -n default --version=v0.1.0 --set apiVersion=certificates.k8s.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install certificatesk8sio-certificatesigningrequest-editor bytebuilders-ui/certificatesk8sio-certificatesigningrequest-editor -n default --version=v0.1.0 --values values.yaml
```
