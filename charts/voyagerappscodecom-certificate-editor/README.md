# Certificate Editor

[Certificate Editor by AppsCode](https://byte.builders) - Certificate Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install voyagerappscodecom-certificate-editor bytebuilders-ui/voyagerappscodecom-certificate-editor -n default --version=v0.1.0
```

## Introduction

This chart deploys a Certificate Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `voyagerappscodecom-certificate-editor`:

```console
$ helm install voyagerappscodecom-certificate-editor bytebuilders-ui/voyagerappscodecom-certificate-editor -n default --version=v0.1.0
```

The command deploys a Certificate Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `voyagerappscodecom-certificate-editor`:

```console
$ helm delete voyagerappscodecom-certificate-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `voyagerappscodecom-certificate-editor` chart and their default values.

|     Parameter      | Description |            Default             |
|--------------------|-------------|--------------------------------|
| apiVersion         |             | `voyager.appscode.com/v1beta1` |
| kind               |             | `Certificate`                  |
| metadata.name      |             | `certificate`                  |
| metadata.namespace |             | `default`                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install voyagerappscodecom-certificate-editor bytebuilders-ui/voyagerappscodecom-certificate-editor -n default --version=v0.1.0 --set apiVersion=voyager.appscode.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install voyagerappscodecom-certificate-editor bytebuilders-ui/voyagerappscodecom-certificate-editor -n default --version=v0.1.0 --values values.yaml
```
