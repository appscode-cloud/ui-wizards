# Elasticsearch Editor UI Options

[Elasticsearch Editor UI Options](https://byte.builders) - Elasticsearch Editor UI Options

## TL;DR;

```console
$ helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/
$ helm repo update
$ helm install kubedbcom-elasticsearch-editor-options bytebuilders-ui-dev/kubedbcom-elasticsearch-editor-options -n kube-system
```

## Introduction

This chart deploys a Elasticsearch Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `kubedbcom-elasticsearch-editor-options`:

```console
$ helm install kubedbcom-elasticsearch-editor-options bytebuilders-ui-dev/kubedbcom-elasticsearch-editor-options -n kube-system
```

The command deploys a Elasticsearch Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `kubedbcom-elasticsearch-editor-options`:

```console
$ helm delete kubedbcom-elasticsearch-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-elasticsearch-editor-options` chart and their default values.

|                 Parameter                  |                    Description                     |      Default      |
|--------------------------------------------|----------------------------------------------------|-------------------|
| metadata.resource.group                    |                                                    | `kubedb.com`      |
| metadata.resource.kind                     |                                                    | `Elasticsearch`   |
| metadata.resource.name                     |                                                    | `elasticsearches` |
| metadata.resource.scope                    |                                                    | `Namespaced`      |
| metadata.resource.version                  |                                                    | `v1alpha2`        |
| metadata.release.name                      | Release name                                       | `""`              |
| metadata.release.namespace                 | Release namespace                                  | `""`              |
| spec.version                               | List options                                       | `xpack-7.13.2`    |
| spec.annotations                           | Annotations to add to the database custom resource | `{}`              |
| spec.labels                                | Labels to add to all the template objects          | `{}`              |
| spec.mode                                  | Combined, Dedicated                                | `Combined`        |
| spec.replicas                              |                                                    | `1`               |
| spec.topology.master.replicas              |                                                    | `3`               |
| spec.topology.master.machine               |                                                    | `""`              |
| spec.topology.master.persistence.size      |                                                    | `2Gi`             |
| spec.topology.data.replicas                |                                                    | `1`               |
| spec.topology.data.machine                 |                                                    | `""`              |
| spec.topology.data.persistence.size        |                                                    | `2Gi`             |
| spec.topology.dataContent.replicas         |                                                    | `1`               |
| spec.topology.dataContent.machine          |                                                    | `""`              |
| spec.topology.dataContent.persistence.size |                                                    | `2Gi`             |
| spec.topology.dataHot.replicas             |                                                    | `1`               |
| spec.topology.dataHot.machine              |                                                    | `""`              |
| spec.topology.dataHot.persistence.size     |                                                    | `2Gi`             |
| spec.topology.dataWarm.replicas            |                                                    | `1`               |
| spec.topology.dataWarm.machine             |                                                    | `""`              |
| spec.topology.dataWarm.persistence.size    |                                                    | `2Gi`             |
| spec.topology.dataCold.replicas            |                                                    | `1`               |
| spec.topology.dataCold.machine             |                                                    | `""`              |
| spec.topology.dataCold.persistence.size    |                                                    | `2Gi`             |
| spec.topology.dataFrozen.replicas          |                                                    | `1`               |
| spec.topology.dataFrozen.machine           |                                                    | `""`              |
| spec.topology.dataFrozen.persistence.size  |                                                    | `2Gi`             |
| spec.topology.ingest.replicas              |                                                    | `2`               |
| spec.topology.ingest.machine               |                                                    | `""`              |
| spec.topology.ingest.persistence.size      |                                                    | `2Gi`             |
| spec.topology.ml.replicas                  |                                                    | `1`               |
| spec.topology.ml.machine                   |                                                    | `""`              |
| spec.topology.ml.persistence.size          |                                                    | `2Gi`             |
| spec.topology.transform.replicas           |                                                    | `1`               |
| spec.topology.transform.machine            |                                                    | `""`              |
| spec.topology.transform.persistence.size   |                                                    | `2Gi`             |
| spec.terminationPolicy                     |                                                    | `WipeOut`         |
| spec.storageClass.name                     |                                                    | `standard`        |
| spec.persistence.size                      |                                                    | `10Gi`            |
| spec.machine                               |                                                    | `""`              |
| spec.resources.limits.cpu                  |                                                    | `".5"`            |
| spec.resources.limits.memory               |                                                    | `1024Mi`          |
| spec.authSecret.name                       |                                                    | `""`              |
| spec.authSecret.password                   |                                                    | `""`              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install kubedbcom-elasticsearch-editor-options bytebuilders-ui-dev/kubedbcom-elasticsearch-editor-options -n kube-system --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install kubedbcom-elasticsearch-editor-options bytebuilders-ui-dev/kubedbcom-elasticsearch-editor-options -n kube-system --values values.yaml
```
