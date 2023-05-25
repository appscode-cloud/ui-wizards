# Receiver Editor

[Receiver Editor by AppsCode](https://byte.builders) - Receiver Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/notificationtoolkitfluxcdio-receiver-editor --version=v0.4.16
$ helm upgrade -i notificationtoolkitfluxcdio-receiver-editor bytebuilders-ui/notificationtoolkitfluxcdio-receiver-editor -n default --create-namespace --version=v0.4.16
```

## Introduction

This chart deploys a Receiver Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `notificationtoolkitfluxcdio-receiver-editor`:

```bash
$ helm upgrade -i notificationtoolkitfluxcdio-receiver-editor bytebuilders-ui/notificationtoolkitfluxcdio-receiver-editor -n default --create-namespace --version=v0.4.16
```

The command deploys a Receiver Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `notificationtoolkitfluxcdio-receiver-editor`:

```bash
$ helm uninstall notificationtoolkitfluxcdio-receiver-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `notificationtoolkitfluxcdio-receiver-editor` chart and their default values.

|     Parameter      | Description |                       Default                       |
|--------------------|-------------|-----------------------------------------------------|
| apiVersion         |             | <code>notification.toolkit.fluxcd.io/v1beta1</code> |
| kind               |             | <code>Receiver</code>                               |
| metadata.name      |             | <code>receiver</code>                               |
| metadata.namespace |             | <code>default</code>                                |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i notificationtoolkitfluxcdio-receiver-editor bytebuilders-ui/notificationtoolkitfluxcdio-receiver-editor -n default --create-namespace --version=v0.4.16 --set apiVersion=notification.toolkit.fluxcd.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i notificationtoolkitfluxcdio-receiver-editor bytebuilders-ui/notificationtoolkitfluxcdio-receiver-editor -n default --create-namespace --version=v0.4.16 --values values.yaml
```
