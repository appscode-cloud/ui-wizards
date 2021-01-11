# Test Editor Charts

## Generate BundleView for MongoDB Editor Options Chart

http://localhost:4000/bundleview?url=https://bundles.byte.builders/ui/&name=mongodb-editor-options&version=v0.1.0

## Generate Order for MongoDB Editor Options Chart BundleView

curl -X POST -H "Content-Type: application/json" \
  -d @/home/tamal/go/src/kubepack.dev/kubepack/artifacts/mongodb-editor-options/order.json \
  http://localhost:4000/deploy/orders | jq

## Get Editor Values (model) for MongoDB

curl -X POST -H "Content-Type: application/json" \
  -d @/home/tamal/go/src/kubepack.dev/kubepack/artifacts/mongodb-editor-options/editor.json \
  http://localhost:4000/editor/kubedb.com/v1alpha2/namespaces/demo/mongodbs/mymongo
