# QuerySuggestionsBlockList Editor

[QuerySuggestionsBlockList Editor by AppsCode](https://byte.builders) - QuerySuggestionsBlockList Editor

## TL;DR;

```bash
$ helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
$ helm repo update
$ helm search repo bytebuilders-ui/kendraawsupboundio-querysuggestionsblocklist-editor --version=v0.4.18
$ helm upgrade -i kendraawsupboundio-querysuggestionsblocklist-editor bytebuilders-ui/kendraawsupboundio-querysuggestionsblocklist-editor -n default --create-namespace --version=v0.4.18
```

## Introduction

This chart deploys a QuerySuggestionsBlockList Editor on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.20+

## Installing the Chart

To install/upgrade the chart with the release name `kendraawsupboundio-querysuggestionsblocklist-editor`:

```bash
$ helm upgrade -i kendraawsupboundio-querysuggestionsblocklist-editor bytebuilders-ui/kendraawsupboundio-querysuggestionsblocklist-editor -n default --create-namespace --version=v0.4.18
```

The command deploys a QuerySuggestionsBlockList Editor on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall the `kendraawsupboundio-querysuggestionsblocklist-editor`:

```bash
$ helm uninstall kendraawsupboundio-querysuggestionsblocklist-editor -n default
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the `kendraawsupboundio-querysuggestionsblocklist-editor` chart and their default values.

|     Parameter      | Description |                  Default                   |
|--------------------|-------------|--------------------------------------------|
| apiVersion         |             | <code>kendra.aws.upbound.io/v1beta1</code> |
| kind               |             | <code>QuerySuggestionsBlockList</code>     |
| metadata.name      |             | <code>querysuggestionsblocklist</code>     |
| metadata.namespace |             | <code>""</code>                            |


Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade -i`. For example:

```bash
$ helm upgrade -i kendraawsupboundio-querysuggestionsblocklist-editor bytebuilders-ui/kendraawsupboundio-querysuggestionsblocklist-editor -n default --create-namespace --version=v0.4.18 --set apiVersion=kendra.aws.upbound.io/v1beta1
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm upgrade -i kendraawsupboundio-querysuggestionsblocklist-editor bytebuilders-ui/kendraawsupboundio-querysuggestionsblocklist-editor -n default --create-namespace --version=v0.4.18 --values values.yaml
```
