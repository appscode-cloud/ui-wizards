# ui-wizards

## ByteBuilders UI Chart Registry

### Configure Helm

```console
helm repo add bytebuilders-ui https://bundles.byte.builders/ui/
helm repo update
```

### Generate mongodb-editor chart

```
$ cd /home/tamal/go/src/kubepack.dev/lib-app
$ go run cmd/fuse-chart/*.go \
  --sample-name=mongodb \
  --sample-dir=/home/tamal/go/src/github.com/appscode/kubedb-samples/mongodb/standalone/prometheus.io/backupconfiguration/stash/tls/custom-auth/standalone \
  --chart-dir=/home/tamal/go/src/go.bytebuilders.dev/ui-wizards/charts \
  --resource.group=kubedb.com \
  --resource.version=v1alpha2 \
  --resource.name=mongodbs
```
