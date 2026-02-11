# AuditSink Editor

[AuditSink Editor by AppsCode](https://appscode.com) - AuditSink Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/auditregistrationk8sio-auditsink-editor --version=v0.30.0
$ helm upgrade -i auditregistrationk8sio-auditsink-editor appscode/auditregistrationk8sio-auditsink-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a AuditSink Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `auditregistrationk8sio-auditsink-editor`:

```bash
$ helm upgrade -i auditregistrationk8sio-auditsink-editor appscode/auditregistrationk8sio-auditsink-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a AuditSink Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `auditregistrationk8sio-auditsink-editor`:

```bash
$ helm uninstall auditregistrationk8sio-auditsink-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `auditregistrationk8sio-auditsink-editor` chart and their default values.

|     Parameter      | Description |                    Default                     |
|--------------------|-------------|------------------------------------------------|
| apiVersion         |             | <code>auditregistration.k8s.io/v1alpha1</code> |
| kind               |             | <code>AuditSink</code>                         |
| metadata.name      |             | <code>auditsink</code>                         |
| metadata.namespace |             | <code>default</code>                           |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i auditregistrationk8sio-auditsink-editor appscode/auditregistrationk8sio-auditsink-editor -n default --create-namespace --version=v0.30.0 --set apiVersion=auditregistration.k8s.io/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i auditregistrationk8sio-auditsink-editor appscode/auditregistrationk8sio-auditsink-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
