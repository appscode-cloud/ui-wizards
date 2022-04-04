# Elasticsearch Editor UI Options

[Elasticsearch Editor UI Options](https://byte.builders) - Elasticsearch Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-elasticsearch-editor-options --version=v0.4.2
$ helm upgrade -i kubedbcom-elasticsearch-editor-options bytebuilders-ui/kubedbcom-elasticsearch-editor-options -n kube-system --create-namespace --version=v0.4.2
```

## Introduction

This chart deploys a Elasticsearch Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-elasticsearch-editor-options`:

```bash
$ helm upgrade -i kubedbcom-elasticsearch-editor-options bytebuilders-ui/kubedbcom-elasticsearch-editor-options -n kube-system --create-namespace --version=v0.4.2
```

The command deploys a Elasticsearch Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-elasticsearch-editor-options`:

```bash
$ helm uninstall kubedbcom-elasticsearch-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-elasticsearch-editor-options` chart and their default values.

|               Parameter               |                                                    Description                                                    |           Default            |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------|------------------------------|
| metadata.resource.group               |                                                                                                                   | <code>kubedb.com</code>      |
| metadata.resource.kind                |                                                                                                                   | <code>Elasticsearch</code>   |
| metadata.resource.name                |                                                                                                                   | <code>elasticsearches</code> |
| metadata.resource.scope               |                                                                                                                   | <code>Namespaced</code>      |
| metadata.resource.version             |                                                                                                                   | <code>v1alpha2</code>        |
| metadata.release.name                 | Release name                                                                                                      | <code>""</code>              |
| metadata.release.namespace            | Release namespace                                                                                                 | <code>""</code>              |
| spec.version                          | List options                                                                                                      | <code>xpack-7.13.2</code>    |
| spec.authPlugin                       | options UI sends there fields based on selected version possible values: OpenDistro;OpenSearch;SearchGuard;X-Pack | <code>X-Pack</code>          |
| spec.annotations                      | Annotations to add to the database custom resource                                                                | <code>{}</code>              |
| spec.labels                           | Labels to add to all the template objects                                                                         | <code>{}</code>              |
| spec.mode                             | Combined, Dedicated                                                                                               | <code>Combined</code>        |
| spec.replicas                         |                                                                                                                   | <code>3</code>               |
| spec.topology.master.replicas         |                                                                                                                   | <code>3</code>               |
| spec.topology.master.machine          |                                                                                                                   | <code>""</code>              |
| spec.topology.master.persistence.size |                                                                                                                   | <code>1Gi</code>             |
| spec.topology.data.replicas           |                                                                                                                   | <code>3</code>               |
| spec.topology.data.machine            |                                                                                                                   | <code>""</code>              |
| spec.topology.data.persistence.size   |                                                                                                                   | <code>10Gi</code>            |
| spec.topology.ingest.replicas         |                                                                                                                   | <code>2</code>               |
| spec.topology.ingest.machine          |                                                                                                                   | <code>""</code>              |
| spec.topology.ingest.persistence.size |                                                                                                                   | <code>1Gi</code>             |
| spec.enableSSL                        |                                                                                                                   | <code>true</code>            |
| spec.disableSecurity                  |                                                                                                                   | <code>false</code>           |
| spec.terminationPolicy                |                                                                                                                   | <code>WipeOut</code>         |
| spec.storageClass.name                |                                                                                                                   | <code>standard</code>        |
| spec.persistence.size                 |                                                                                                                   | <code>10Gi</code>            |
| spec.machine                          |                                                                                                                   | <code>""</code>              |
| spec.resources.limits.cpu             |                                                                                                                   | <code>500m</code>            |
| spec.resources.limits.memory          |                                                                                                                   | <code>1Gi</code>             |
| spec.authSecret.name                  |                                                                                                                   | <code>""</code>              |
| spec.authSecret.password              |                                                                                                                   | <code>""</code>              |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-elasticsearch-editor-options bytebuilders-ui/kubedbcom-elasticsearch-editor-options -n kube-system --create-namespace --version=v0.4.2 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-elasticsearch-editor-options bytebuilders-ui/kubedbcom-elasticsearch-editor-options -n kube-system --create-namespace --version=v0.4.2 --values values.yaml
```
