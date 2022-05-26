# Certificate Editor

[Certificate Editor by AppsCode](https://byte.builders) - Certificate Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/voyagerappscodecom-certificate-editor --version=v0.4.4
$ helm upgrade -i voyagerappscodecom-certificate-editor bytebuilders-ui/voyagerappscodecom-certificate-editor -n default --create-namespace --version=v0.4.4
```

## Introduction

This chart deploys a Certificate Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `voyagerappscodecom-certificate-editor`:

```bash
$ helm upgrade -i voyagerappscodecom-certificate-editor bytebuilders-ui/voyagerappscodecom-certificate-editor -n default --create-namespace --version=v0.4.4
```

The command deploys a Certificate Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `voyagerappscodecom-certificate-editor`:

```bash
$ helm uninstall voyagerappscodecom-certificate-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `voyagerappscodecom-certificate-editor` chart and their default values.

|     Parameter      | Description |                  Default                  |
|--------------------|-------------|-------------------------------------------|
| apiVersion         |             | <code>voyager.appscode.com/v1beta1</code> |
| kind               |             | <code>Certificate</code>                  |
| metadata.name      |             | <code>certificate</code>                  |
| metadata.namespace |             | <code>default</code>                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i voyagerappscodecom-certificate-editor bytebuilders-ui/voyagerappscodecom-certificate-editor -n default --create-namespace --version=v0.4.4 --set apiVersion=voyager.appscode.com/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i voyagerappscodecom-certificate-editor bytebuilders-ui/voyagerappscodecom-certificate-editor -n default --create-namespace --version=v0.4.4 --values values.yaml
```
