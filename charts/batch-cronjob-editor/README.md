# CronJob Editor

[CronJob Editor by AppsCode](https://byte.builders) - CronJob Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm install batch-cronjob-editor bytebuilders-ui/batch-cronjob-editor -n default
```

## Introduction

This chart deploys a CronJob Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install the chart with the release name `batch-cronjob-editor`:

```console
$ helm install batch-cronjob-editor bytebuilders-ui/batch-cronjob-editor -n default
```

The command deploys a CronJob Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `batch-cronjob-editor`:

```console
$ helm delete batch-cronjob-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `batch-cronjob-editor` chart and their default values.

|     Parameter      | Description |        Default        |
|--------------------|-------------|-----------------------|
| apiVersion         |             | <code>batch/v1</code> |
| kind               |             | <code>CronJob</code>  |
| metadata.name      |             | <code>cronjob</code>  |
| metadata.namespace |             | <code>default</code>  |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install batch-cronjob-editor bytebuilders-ui/batch-cronjob-editor -n default --set apiVersion=batch/v1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install batch-cronjob-editor bytebuilders-ui/batch-cronjob-editor -n default --values values.yaml
```
