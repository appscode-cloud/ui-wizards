# BackupConfiguration Editor

[BackupConfiguration Editor by AppsCode](https://byte.builders) - BackupConfiguration Editor

## TL;DR;

```console
$ helm repo add bytebuilders-ui https://bundles.bytebuilders.dev/ui/
$ helm repo update
$ helm install stashappscodecom-backupconfiguration-editor bytebuilders-ui/stashappscodecom-backupconfiguration-editor -n default --version=v0.1.0
```

## Introduction

This chart deploys a BackupConfiguration Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install the chart with the release name `stashappscodecom-backupconfiguration-editor`:

```console
$ helm install stashappscodecom-backupconfiguration-editor bytebuilders-ui/stashappscodecom-backupconfiguration-editor -n default --version=v0.1.0
```

The command deploys a BackupConfiguration Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `stashappscodecom-backupconfiguration-editor`:

```console
$ helm delete stashappscodecom-backupconfiguration-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.


