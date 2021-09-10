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

### MariaDB

```bash
helm install kubedbcom-mariadb-editor-options charts/kubedbcom-mariadb-editor-options
helm uninstall kubedbcom-mariadb-editor-options

helm install kubedbcom-mariadb-editor-options charts/kubedbcom-mariadb-editor-options \
 --set spec.mode=Cluster
helm uninstall kubedbcom-mariadb-editor-options
```

### Postgres

```bash
helm install kubedbcom-postgres-editor-options charts/kubedbcom-postgres-editor-options
helm uninstall kubedbcom-postgres-editor-options

helm install kubedbcom-postgres-editor-options charts/kubedbcom-postgres-editor-options \
 --set spec.mode=Cluster
helm uninstall kubedbcom-postgres-editor-options
```

### Redis

```bash
helm install kubedbcom-redis-editor-options charts/kubedbcom-redis-editor-options
helm uninstall kubedbcom-redis-editor-options

helm install kubedbcom-redis-editor-options charts/kubedbcom-redis-editor-options \
 --set spec.mode=Cluster
helm uninstall kubedbcom-redis-editor-options

helm install kubedbcom-redis-editor-options charts/kubedbcom-redis-editor-options \
  --set spec.mode=Sentinel
helm uninstall kubedbcom-redis-editor-options
```

### Memcached

```bash
helm install kubedbcom-memcached-editor-options charts/kubedbcom-memcached-editor-options
helm uninstall kubedbcom-memcached-editor-options
```
