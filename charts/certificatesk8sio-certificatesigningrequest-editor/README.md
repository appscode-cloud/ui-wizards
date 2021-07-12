# CertificateSigningRequest Editor

[CertificateSigningRequest Editor by AppsCode](https://byte.builders) - CertificateSigningRequest Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install certificatesk8sio-certificatesigningrequest-editor bytebuilders-ui/certificatesk8sio-certificatesigningrequest-editor -n default
```

## Introduction

This chart deploys a CertificateSigningRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `certificatesk8sio-certificatesigningrequest-editor`:

```console
$ helm install certificatesk8sio-certificatesigningrequest-editor bytebuilders-ui/certificatesk8sio-certificatesigningrequest-editor -n default
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

|     Parameter      | Description |           Default           |
|--------------------|-------------|-----------------------------|
| apiVersion         |             | `certificates.k8s.io/v1`    |
| kind               |             | `CertificateSigningRequest` |
| metadata.name      |             | `certificatesigningrequest` |
| metadata.namespace |             | `default`                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install certificatesk8sio-certificatesigningrequest-editor bytebuilders-ui/certificatesk8sio-certificatesigningrequest-editor -n default --set apiVersion=certificates.k8s.io/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install certificatesk8sio-certificatesigningrequest-editor bytebuilders-ui/certificatesk8sio-certificatesigningrequest-editor -n default --values values.yaml
```
