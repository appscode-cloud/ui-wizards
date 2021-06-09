# ElasticsearchOpsRequest Editor

[ElasticsearchOpsRequest Editor by AppsCode](https://byte.builders) - ElasticsearchOpsRequest Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install opskubedbcom-elasticsearchopsrequest-editor bytebuilders-ui-dev/opskubedbcom-elasticsearchopsrequest-editor -n default
```

## Introduction

This chart deploys a ElasticsearchOpsRequest Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `opskubedbcom-elasticsearchopsrequest-editor`:

```console
$ helm install opskubedbcom-elasticsearchopsrequest-editor bytebuilders-ui-dev/opskubedbcom-elasticsearchopsrequest-editor -n default
```

The command deploys a ElasticsearchOpsRequest Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `opskubedbcom-elasticsearchopsrequest-editor`:

```console
$ helm delete opskubedbcom-elasticsearchopsrequest-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `opskubedbcom-elasticsearchopsrequest-editor` chart and their default values.

|     Parameter      | Description |          Default          |
|--------------------|-------------|---------------------------|
| apiVersion         |             | `ops.kubedb.com/v1alpha1` |
| kind               |             | `ElasticsearchOpsRequest` |
| metadata.name      |             | `elasticsearchopsrequest` |
| metadata.namespace |             | `default`                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install opskubedbcom-elasticsearchopsrequest-editor bytebuilders-ui-dev/opskubedbcom-elasticsearchopsrequest-editor -n default --set apiVersion=ops.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install opskubedbcom-elasticsearchopsrequest-editor bytebuilders-ui-dev/opskubedbcom-elasticsearchopsrequest-editor -n default --values values.yaml
```
