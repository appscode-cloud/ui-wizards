# Postgres Editor UI Options

[Postgres Editor UI Options](https://byte.builders) - Postgres Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-postgres-editor-options --version=v0.4.3
$ helm upgrade -i kubedbcom-postgres-editor-options bytebuilders-ui/kubedbcom-postgres-editor-options -n kube-system --create-namespace --version=v0.4.3
```

## Introduction

This chart deploys a Postgres Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-postgres-editor-options`:

```bash
$ helm upgrade -i kubedbcom-postgres-editor-options bytebuilders-ui/kubedbcom-postgres-editor-options -n kube-system --create-namespace --version=v0.4.3
```

The command deploys a Postgres Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-postgres-editor-options`:

```bash
$ helm uninstall kubedbcom-postgres-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-postgres-editor-options` chart and their default values.

|          Parameter           |                    Description                     |         Default          |
|------------------------------|----------------------------------------------------|--------------------------|
| metadata.resource.group      |                                                    | <code>kubedb.com</code>  |
| metadata.resource.kind       |                                                    | <code>Postgres</code>    |
| metadata.resource.name       |                                                    | <code>postgreses</code>  |
| metadata.resource.scope      |                                                    | <code>Namespaced</code>  |
| metadata.resource.version    |                                                    | <code>v1alpha2</code>    |
| metadata.release.name        | Release name                                       | <code>""</code>          |
| metadata.release.namespace   | Release namespace                                  | <code>""</code>          |
| spec.version                 | List options                                       | <code>13.2-debian</code> |
| spec.annotations             | Annotations to add to the database custom resource | <code>{}</code>          |
| spec.labels                  | Labels to add to all the template objects          | <code>{}</code>          |
| spec.mode                    | Standalone, Cluster                                | <code>Cluster</code>     |
| spec.terminationPolicy       |                                                    | <code>WipeOut</code>     |
| spec.storageClass.name       |                                                    | <code>standard</code>    |
| spec.persistence.size        |                                                    | <code>10Gi</code>        |
| spec.machine                 |                                                    | <code>""</code>          |
| spec.resources.limits.cpu    |                                                    | <code>500m</code>        |
| spec.resources.limits.memory |                                                    | <code>1Gi</code>         |
| spec.authSecret.name         |                                                    | <code>""</code>          |
| spec.authSecret.password     |                                                    | <code>""</code>          |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-postgres-editor-options bytebuilders-ui/kubedbcom-postgres-editor-options -n kube-system --create-namespace --version=v0.4.3 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-postgres-editor-options bytebuilders-ui/kubedbcom-postgres-editor-options -n kube-system --create-namespace --version=v0.4.3 --values values.yaml
```
