# Pgpool Editor

[Pgpool Editor by AppsCode](https://byte.builders) - Pgpool Editor

## TL;DR;

```bash
$ helm repo add appscode-charts-oci https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo appscode-charts-oci/kubedbcom-pgpool-editor --version=v0.4.18
$ helm upgrade -i kubedbcom-pgpool-editor appscode-charts-oci/kubedbcom-pgpool-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a Pgpool Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kubedbcom-pgpool-editor`:

```bash
$ helm upgrade -i kubedbcom-pgpool-editor appscode-charts-oci/kubedbcom-pgpool-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a Pgpool Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kubedbcom-pgpool-editor`:

```bash
$ helm uninstall kubedbcom-pgpool-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kubedbcom-pgpool-editor` chart and their default values.

|         Parameter          | Description |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|----------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metadata.resource.group    |             | <code>kubedb.com</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.resource.version  |             | <code>v1alpha2</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| metadata.resource.name     |             | <code>pgpools</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| metadata.resource.kind     |             | <code>Pgpool</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| metadata.resource.scope    |             | <code>Namespaced</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata.release.name      |             | <code>RELEASE-NAME</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| metadata.release.namespace |             | <code>default</code>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| resources.kubedbComPgpool  |             | <code>{"apiVersion":"kubedb.com/v1alpha2","kind":"Pgpool","metadata":{"name":"pgpool","namespace":"pool"},"spec":{"initConfig":{"pgpoolConfig":{"backend_clustering_mode":"streaming_replication","child_life_time":300,"child_max_connections":0,"client_idle_limit":0,"connection_cache":true,"connection_life_time":0,"failover_on_backend_error":false,"health_check_period":0,"load_balance_mode":true,"log_min_messages":"warning","log_per_node_statement":true,"log_statement":true,"max_pool":100,"memory_cache_enabled":true,"num_init_children":5,"sr_check_period":0,"ssl":true,"statement_level_load_balance":true}},"podTemplate":{"spec":{"containers":[{"name":"pgpool","resources":{"requests":{"cpu":"700m","memory":"1400Mi"}}}]}},"postgresRef":{"name":"ha-postgres","namespace":"demo"},"replicas":3,"serviceTemplates":[{"alias":"primary","spec":{"type":"LoadBalancer"}}],"syncUsers":true,"terminationPolicy":"WipeOut","version":"4.5.0"}}</code> |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kubedbcom-pgpool-editor appscode-charts-oci/kubedbcom-pgpool-editor -n default --create-namespace --version=v0.4.18 --set metadata.resource.group=kubedb.com
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kubedbcom-pgpool-editor appscode-charts-oci/kubedbcom-pgpool-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
