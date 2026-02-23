# Stash Repository Editor UI Options

[Stash Repository Editor UI Options](https://byte.builders) - Stash Repository Editor UI Options

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/stashappscodecom-repository-editor-options --version=v0.30.0
$ helm upgrade -i stashappscodecom-repository-editor-options appscode/stashappscodecom-repository-editor-options -n kube-system --create-namespace --version=v0.30.0
```

## Introduction

This chart deploys a Stash Repository Editor UI Options on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.14+

## Installing the Chart

To install/upgrade the chart with the release name `stashappscodecom-repository-editor-options`:

```bash
$ helm upgrade -i stashappscodecom-repository-editor-options appscode/stashappscodecom-repository-editor-options -n kube-system --create-namespace --version=v0.30.0
```

The command deploys a Stash Repository Editor UI Options on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `stashappscodecom-repository-editor-options`:

```bash
$ helm uninstall stashappscodecom-repository-editor-options -n kube-system
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `stashappscodecom-repository-editor-options` chart and their default values.

|                       Parameter                       |                    Description                     |                 Default                 |
|-------------------------------------------------------|----------------------------------------------------|-----------------------------------------|
| metadata.resource.group                               |                                                    | <code>stash.appscode.com</code>         |
| metadata.resource.kind                                |                                                    | <code>Repository</code>                 |
| metadata.resource.name                                |                                                    | <code>repositories</code>               |
| metadata.resource.scope                               |                                                    | <code>Namespaced</code>                 |
| metadata.resource.version                             |                                                    | <code>v1alpha1</code>                   |
| metadata.release.name                                 | Release name                                       | <code>""</code>                         |
| metadata.release.namespace                            | Release namespace                                  | <code>""</code>                         |
| spec.annotations                                      | Annotations to add to the database custom resource | <code>{}</code>                         |
| spec.labels                                           | Labels to add to all the template objects          | <code>{}</code>                         |
| spec.authSecret.name                                  |                                                    | <code>""</code>                         |
| spec.authSecret.password                              |                                                    | <code>""</code>                         |
| spec.backend.provider                                 |                                                    | <code>"" # s3,gcs,azure,swift,b2</code> |
| spec.backend.s3.spec.endpoint                         |                                                    | <code>""</code>                         |
| spec.backend.s3.spec.bucket                           |                                                    | <code>""</code>                         |
| spec.backend.s3.auth.AWS_ACCESS_KEY_ID                |                                                    | <code>""</code>                         |
| spec.backend.s3.auth.AWS_SECRET_ACCESS_KEY            |                                                    | <code>""</code>                         |
| spec.backend.azure.spec.container                     |                                                    | <code>""</code>                         |
| spec.backend.azure.auth.AZURE_ACCOUNT_NAME            |                                                    | <code>""</code>                         |
| spec.backend.azure.auth.AZURE_ACCOUNT_KEY             |                                                    | <code>""</code>                         |
| spec.backend.gcs.spec.bucket                          |                                                    | <code>""</code>                         |
| spec.backend.gcs.auth.GOOGLE_PROJECT_ID               |                                                    | <code>""</code>                         |
| spec.backend.gcs.auth.GOOGLE_SERVICE_ACCOUNT_JSON_KEY |                                                    | <code>""</code>                         |
| spec.backend.swift.spec.container                     |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_USERNAME                   |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_PASSWORD                   |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_REGION_NAME                |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_AUTH_URL                   |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_USER_DOMAIN_NAME           |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_PROJECT_NAME               |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_PROJECT_DOMAIN_NAME        |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_TENANT_ID                  |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_TENANT_NAME                |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.ST_AUTH                       |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.ST_USER                       |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.ST_KEY                        |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_STORAGE_URL                |                                                    | <code>""</code>                         |
| spec.backend.swift.auth.OS_AUTH_TOKEN                 |                                                    | <code>""</code>                         |
| spec.backend.b2.spec.bucket                           |                                                    | <code>""</code>                         |
| spec.backend.b2.auth.B2_ACCOUNT_ID                    |                                                    | <code>""</code>                         |
| spec.backend.b2.auth.B2_ACCOUNT_KEY                   |                                                    | <code>""</code>                         |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i stashappscodecom-repository-editor-options appscode/stashappscodecom-repository-editor-options -n kube-system --create-namespace --version=v0.30.0 --set metadata.resource.group=stash.appscode.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i stashappscodecom-repository-editor-options appscode/stashappscodecom-repository-editor-options -n kube-system --create-namespace --version=v0.30.0 --values values.yaml
```
