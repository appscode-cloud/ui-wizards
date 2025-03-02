# FlexibleServerFirewallRule Editor

[FlexibleServerFirewallRule Editor by AppsCode](https://appscode.com) - FlexibleServerFirewallRule Editor

## TL;DR;

```bash
$ helm repo add appscode https://charts.appscode.com/stable/
$ helm repo update
$ helm search repo appscode/dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor --version=v0.14.0
$ helm upgrade -i dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor appscode/dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor -n default --create-namespace --version=v0.14.0
```

## Introduction

This chart deploys a FlexibleServerFirewallRule Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor`:

```bash
$ helm upgrade -i dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor appscode/dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor -n default --create-namespace --version=v0.14.0
```

The command deploys a FlexibleServerFirewallRule Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor`:

```bash
$ helm uninstall dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor` chart and their default values.

|     Parameter      | Description |                      Default                      |
|--------------------|-------------|---------------------------------------------------|
| apiVersion         |             | <code>dbformysql.azure.kubedb.com/v1alpha1</code> |
| kind               |             | <code>FlexibleServerFirewallRule</code>           |
| metadata.name      |             | <code>flexibleserverfirewallrule</code>           |
| metadata.namespace |             | <code>""</code>                                   |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor appscode/dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor -n default --create-namespace --version=v0.14.0 --set apiVersion=dbformysql.azure.kubedb.com/v1alpha1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor appscode/dbformysqlazurekubedbcom-flexibleserverfirewallrule-editor -n default --create-namespace --version=v0.14.0 --values values.yaml
```
