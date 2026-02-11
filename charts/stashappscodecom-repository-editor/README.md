# Repository Editor

[Repository Editor by AppsCode](https://appscode.com) - Repository Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/stashappscodecom-repository-editor --version=v0.30.0
$ helm upgrade -i stashappscodecom-repository-editor appscode/stashappscodecom-repository-editor -n default --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a Repository Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-repository-editor`:

```bash
$ helm upgrade -i stashappscodecom-repository-editor appscode/stashappscodecom-repository-editor -n default --create-namespace --version=v0.30.0
```

The command deploys a Repository Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-repository-editor`:

```bash
$ helm uninstall stashappscodecom-repository-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-repository-editor` chart and their default values.

|              Parameter               | Description |                                                                                                                                                   Default                                                                                                                                                    |
|--------------------------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group              |             | <code>stash.appscode.com</code>                                                                                                                                                                                                                                                                              |
| metadata.resource.version            |             | <code>v1alpha1</code>                                                                                                                                                                                                                                                                                        |
| metadata.resource.name               |             | <code>repositories</code>                                                                                                                                                                                                                                                                                    |
| metadata.resource.kind               |             | <code>Repository</code>                                                                                                                                                                                                                                                                                      |
| metadata.resource.scope              |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                      |
| metadata.release.name                |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                    |
| metadata.release.namespace           |             | <code>default</code>                                                                                                                                                                                                                                                                                         |
| resources.secret_repo_cred           |             | <code>{"apiVersion":"v1","kind":"Secret","metadata":{"name":"s3-repo-cred","namespace":"demo"},"stringData":{"AWS_ACCESS_KEY_ID":"y","AWS_SECRET_ACCESS_KEY":"z","RESTIC_PASSWORD":"x"},"type":"Opaque"}</code>                                                                                              |
| resources.stashAppscodeComRepository |             | <code>{"apiVersion":"stash.appscode.com/v1alpha1","kind":"Repository","metadata":{"name":"s3","namespace":"demo"},"spec":{"backend":{"s3":{"bucket":"stash-demo","endpoint":"s3.amazonaws.com","prefix":"/backup/demo/deployment/stash-demo","region":"us-west-1"},"storageSecretName":"s3-secret"}}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-repository-editor appscode/stashappscodecom-repository-editor -n default --create-namespace --version=v0.30.0 --set metadata.resource.group=stash.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-repository-editor appscode/stashappscodecom-repository-editor -n default --create-namespace --version=v0.30.0 --values values.yaml
```
