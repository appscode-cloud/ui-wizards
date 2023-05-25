# ConstraintTemplatePodStatus Editor

[ConstraintTemplatePodStatus Editor by AppsCode](https://byte.builders) - ConstraintTemplatePodStatus Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/statusgatekeepersh-constrainttemplatepodstatus-editor --version=v0.4.16
$ helm upgrade -i statusgatekeepersh-constrainttemplatepodstatus-editor bytebuilders-ui/statusgatekeepersh-constrainttemplatepodstatus-editor -n default --create-namespace --version=v0.4.16
```

## Introduction

This chart deploys a ConstraintTemplatePodStatus Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.16+

## Installing the Chart

To install/upgrade the chart with the release name `statusgatekeepersh-constrainttemplatepodstatus-editor`:

```bash
$ helm upgrade -i statusgatekeepersh-constrainttemplatepodstatus-editor bytebuilders-ui/statusgatekeepersh-constrainttemplatepodstatus-editor -n default --create-namespace --version=v0.4.16
```

The command deploys a ConstraintTemplatePodStatus Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `statusgatekeepersh-constrainttemplatepodstatus-editor`:

```bash
$ helm uninstall statusgatekeepersh-constrainttemplatepodstatus-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `statusgatekeepersh-constrainttemplatepodstatus-editor` chart and their default values.

|     Parameter      | Description |                  Default                  |
|--------------------|-------------|-------------------------------------------|
| apiVersion         |             | <code>status.gatekeeper.sh/v1beta1</code> |
| kind               |             | <code>ConstraintTemplatePodStatus</code>  |
| metadata.name      |             | <code>constrainttemplatepodstatus</code>  |
| metadata.namespace |             | <code>default</code>                      |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i statusgatekeepersh-constrainttemplatepodstatus-editor bytebuilders-ui/statusgatekeepersh-constrainttemplatepodstatus-editor -n default --create-namespace --version=v0.4.16 --set apiVersion=status.gatekeeper.sh/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i statusgatekeepersh-constrainttemplatepodstatus-editor bytebuilders-ui/statusgatekeepersh-constrainttemplatepodstatus-editor -n default --create-namespace --version=v0.4.16 --values values.yaml
```