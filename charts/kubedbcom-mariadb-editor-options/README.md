# MariaDB Editor UI Options

[MariaDB Editor UI Options](https://byte.builders) - MariaDB Editor UI Options

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kubedbcom-mariadb-editor-options --version=v0.4.2
$ helm upgrade -i kubedbcom-mariadb-editor-options bytebuilders-ui/kubedbcom-mariadb-editor-options -n kube-system --create-namespace --version=v0.4.2
```

## Introduction

This chart deploys a MariaDB Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-mariadb-editor-options`:

```bash
$ helm upgrade -i kubedbcom-mariadb-editor-options bytebuilders-ui/kubedbcom-mariadb-editor-options -n kube-system --create-namespace --version=v0.4.2
```

The command deploys a MariaDB Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-mariadb-editor-options`:

```bash
$ helm uninstall kubedbcom-mariadb-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-mariadb-editor-options` chart and their default values.

|          Parameter           |                    Description                     |         Default         |
|------------------------------|----------------------------------------------------|-------------------------|
| metadata.resource.group      |                                                    | <code>kubedb.com</code> |
| metadata.resource.kind       |                                                    | <code>MariaDB</code>    |
| metadata.resource.name       |                                                    | <code>mariadbs</code>   |
| metadata.resource.scope      |                                                    | <code>Namespaced</code> |
| metadata.resource.version    |                                                    | <code>v1alpha2</code>   |
| metadata.release.name        | Release name                                       | <code>""</code>         |
| metadata.release.namespace   | Release namespace                                  | <code>""</code>         |
| spec.version                 | List options                                       | <code>10.5.8</code>     |
| spec.annotations             | Annotations to add to the database custom resource | <code>{}</code>         |
| spec.labels                  | Labels to add to all the template objects          | <code>{}</code>         |
| spec.mode                    | Standalone, Cluster                                | <code>Cluster</code>    |
| spec.terminationPolicy       |                                                    | <code>WipeOut</code>    |
| spec.storageClass.name       |                                                    | <code>standard</code>   |
| spec.persistence.size        |                                                    | <code>10Gi</code>       |
| spec.machine                 |                                                    | <code>""</code>         |
| spec.resources.limits.cpu    |                                                    | <code>500m</code>       |
| spec.resources.limits.memory |                                                    | <code>1Gi</code>        |
| spec.authSecret.name         |                                                    | <code>""</code>         |
| spec.authSecret.password     |                                                    | <code>""</code>         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-mariadb-editor-options bytebuilders-ui/kubedbcom-mariadb-editor-options -n kube-system --create-namespace --version=v0.4.2 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-mariadb-editor-options bytebuilders-ui/kubedbcom-mariadb-editor-options -n kube-system --create-namespace --version=v0.4.2 --values values.yaml
```
