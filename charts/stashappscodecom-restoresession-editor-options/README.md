# Stash RestoreSession Editor UI Options

[Stash RestoreSession Editor UI Options](https://byte.builders) - Stash RestoreSession Editor UI Options

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/stashappscodecom-restoresession-editor-options --version=v0.30.0
$ helm upgrade -i stashappscodecom-restoresession-editor-options appscode/stashappscodecom-restoresession-editor-options -n kube-system --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a Stash RestoreSession Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-restoresession-editor-options`:

```bash
$ helm upgrade -i stashappscodecom-restoresession-editor-options appscode/stashappscodecom-restoresession-editor-options -n kube-system --create-namespace --version=v0.30.0
```

The command deploys a Stash RestoreSession Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-restoresession-editor-options`:

```bash
$ helm uninstall stashappscodecom-restoresession-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-restoresession-editor-options` chart and their default values.

|         Parameter          |                    Description                     |             Default             |
|----------------------------|----------------------------------------------------|---------------------------------|
| metadata.resource.group    |                                                    | <code>stash.appscode.com</code> |
| metadata.resource.kind     |                                                    | <code>RestoreSession</code>     |
| metadata.resource.name     |                                                    | <code>restoresessions</code>    |
| metadata.resource.scope    |                                                    | <code>Namespaced</code>         |
| metadata.resource.version  |                                                    | <code>v1beta1</code>            |
| metadata.release.name      | Release name                                       | <code>""</code>                 |
| metadata.release.namespace | Release namespace                                  | <code>""</code>                 |
| spec.annotations           | Annotations to add to the database custom resource | <code>{}</code>                 |
| spec.labels                | Labels to add to all the template objects          | <code>{}</code>                 |
| spec.snapshot              | snapshot to restore from                           | <code>latest</code>             |
| spec.repository.name       |                                                    | <code>""</code>                 |
| spec.target                | target database                                    | <code>{}</code>                 |
| spec.runtimeSettings       |                                                    | <code>{}</code>                 |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-restoresession-editor-options appscode/stashappscodecom-restoresession-editor-options -n kube-system --create-namespace --version=v0.30.0 --set metadata.resource.group=stash.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-restoresession-editor-options appscode/stashappscodecom-restoresession-editor-options -n kube-system --create-namespace --version=v0.30.0 --values values.yaml
```
