# ui-wizards

## ByteBuilders UI Chart Registry

### Configure Helm

```console
helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
helm repo update
```

## Configure Development Helm Chart Repository

```console
helm repo add bytebuilders-ui-dev https://raw.githubusercontent.com/bytebuilders/ui-wizards/master/stable
helm repo update
```

## Test Charts

### Redis

```bash
helm install kubedbcom-redis-editor-options charts/kubedbcom-redis-editor-options
helm install kubedbcom-redis-editor-options charts/kubedbcom-redis-editor-options --set spec.mode=Cluster
```

### MySQL

```bash
helm install kubedbcom-mysql-editor-options charts/kubedbcom-mysql-editor-options
helm uninstall kubedbcom-mysql-editor-options

helm install kubedbcom-mysql-editor-options charts/kubedbcom-mysql-editor-options \
 --set spec.mode=GroupReplication
helm uninstall kubedbcom-mysql-editor-options

helm install kubedbcom-mysql-editor-options charts/kubedbcom-mysql-editor-options \
 --set spec.mode=InnoDBCluster
helm uninstall kubedbcom-mysql-editor-options
```

### Elasticsearch

```bash
helm install kubedbcom-elasticsearch-editor-options charts/kubedbcom-elasticsearch-editor-options
helm uninstall kubedbcom-elasticsearch-editor-options

helm install kubedbcom-elasticsearch-editor-options charts/kubedbcom-elasticsearch-editor-options \
 --set spec.mode=Dedicated
helm uninstall kubedbcom-elasticsearch-editor-options
```
