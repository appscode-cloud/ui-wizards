# Recovery Editor

[Recovery Editor by AppsCode](https://appscode.com) - Recovery Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/stashappscodecom-recovery-editor --version=v0.26.0
$ helm upgrade -i stashappscodecom-recovery-editor appscode/stashappscodecom-recovery-editor -n default --create-namespace --version=v0.26.0
```

## Introduction

This chart deploys a Recovery Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-recovery-editor`:

```bash
$ helm upgrade -i stashappscodecom-recovery-editor appscode/stashappscodecom-recovery-editor -n default --create-namespace --version=v0.26.0
```

The command deploys a Recovery Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-recovery-editor`:

```bash
$ helm uninstall stashappscodecom-recovery-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-recovery-editor` chart and their default values.

|     Parameter      | Description |                 Default                  |
|--------------------|-------------|------------------------------------------|
| apiVersion         |             | <code>stash.appscode.com/v1alpha1</code> |
| kind               |             | <code>Recovery</code>                    |
| metadata.name      |             | <code>recovery</code>                    |
| metadata.namespace |             | <code>default</code>                     |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-recovery-editor appscode/stashappscodecom-recovery-editor -n default --create-namespace --version=v0.26.0 --set apiVersion=stash.appscode.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-recovery-editor appscode/stashappscodecom-recovery-editor -n default --create-namespace --version=v0.26.0 --values values.yaml
```
