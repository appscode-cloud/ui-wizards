# ContributorInsights Editor

[ContributorInsights Editor by AppsCode](https://appscode.com) - ContributorInsights Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/dynamodbawskubedbcom-contributorinsights-editor --version=v0.6.0
$ helm upgrade -i dynamodbawskubedbcom-contributorinsights-editor appscode-charts-oci/dynamodbawskubedbcom-contributorinsights-editor -n default --create-namespace --version=v0.6.0
```

## Introduction

This chart deploys a ContributorInsights Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `dynamodbawskubedbcom-contributorinsights-editor`:

```bash
$ helm upgrade -i dynamodbawskubedbcom-contributorinsights-editor appscode-charts-oci/dynamodbawskubedbcom-contributorinsights-editor -n default --create-namespace --version=v0.6.0
```

The command deploys a ContributorInsights Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `dynamodbawskubedbcom-contributorinsights-editor`:

```bash
$ helm uninstall dynamodbawskubedbcom-contributorinsights-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `dynamodbawskubedbcom-contributorinsights-editor` chart and their default values.

|     Parameter      | Description |                    Default                    |
|--------------------|-------------|-----------------------------------------------|
| apiVersion         |             | <code>dynamodb.aws.kubedb.com/v1alpha1</code> |
| kind               |             | <code>ContributorInsights</code>              |
| metadata.name      |             | <code>contributorinsights</code>              |
| metadata.namespace |             | <code>""</code>                               |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i dynamodbawskubedbcom-contributorinsights-editor appscode-charts-oci/dynamodbawskubedbcom-contributorinsights-editor -n default --create-namespace --version=v0.6.0 --set apiVersion=dynamodb.aws.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i dynamodbawskubedbcom-contributorinsights-editor appscode-charts-oci/dynamodbawskubedbcom-contributorinsights-editor -n default --create-namespace --version=v0.6.0 --values values.yaml
```
