# ZooKeeper Editor

[ZooKeeper Editor by AppsCode](https://byte.builders) - ZooKeeper Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/kubedbcom-zookeeper-editor --version=v0.4.18
$ helm upgrade -i kubedbcom-zookeeper-editor appscode-charts-oci/kubedbcom-zookeeper-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a ZooKeeper Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-zookeeper-editor`:

```bash
$ helm upgrade -i kubedbcom-zookeeper-editor appscode-charts-oci/kubedbcom-zookeeper-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a ZooKeeper Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-zookeeper-editor`:

```bash
$ helm uninstall kubedbcom-zookeeper-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-zookeeper-editor` chart and their default values.

|          Parameter           | Description |                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|------------------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group      |             | <code>kubedb.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| metadata.resource.version    |             | <code>v1alpha2</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.resource.name       |             | <code>zookeepers</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| metadata.resource.kind       |             | <code>ZooKeeper</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| metadata.resource.scope      |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| metadata.release.name        |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| metadata.release.namespace   |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| resources.kubedbComZooKeeper |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"ZooKeeper","metadata":{"name":"zookeeper","namespace":"zookeeper"},"spec":{"podTemplate":{"spec":{"containers":[{"name":"zookeeper","resources":{"requests":{"cpu":"700m","memory":"1200Mi"}}}],"nodeSelector":{"app":"kubedb","component":"zookeeper-database","instance":"zookeeper"},"tolerations":[{"effect":"NoSchedule","key":"app","operator":"Equal","value":"kubedb"},{"effect":"NoSchedule","key":"instance","operator":"Equal","value":"zookeeper"},{"effect":"NoSchedule","key":"component","operator":"Equal","value":"zookeeper-database"},{"effect":"NoSchedule","key":"nodepool_type","operator":"Equal","value":"n2-standard-2"}]}},"replicas":3,"serviceTemplates":[{"alias":"primary","spec":{"type":"LoadBalancer"}}],"storage":{"accessModes":["ReadWriteOnce"],"resources":{"requests":{"storage":"100Mi"}}},"terminationPolicy":"Halt","version":"3.8.3"}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-zookeeper-editor appscode-charts-oci/kubedbcom-zookeeper-editor -n default --create-namespace --version=v0.4.18 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-zookeeper-editor appscode-charts-oci/kubedbcom-zookeeper-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
