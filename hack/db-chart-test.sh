#!/usr/bin/env sh

# Copyright AppsCode Inc. and Contributors
#
# Licensed under the AppsCode Free Trial License 1.0.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://github.com/appscode/licenses/raw/1.0.0/AppsCode-Free-Trial-1.0.0.md
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

for db in Cassandra ClickHouse DB2 DocumentDB Druid Elasticsearch HanaDB Hazelcast Ignite Kafka MariaDB Memcached Milvus MongoDB MSSQLServer MySQL Neo4j Oracle PerconaXtraDB PgBouncer Pgpool Postgres ProxySQL Qdrant Rabbitmq Redis Singlestore Solr Weaviate ZooKeeper; do
    make ct CT_COMMAND=lint TEST_CHARTS=charts/kubedbcom-$(echo "$db" | tr '[:upper:]' '[:lower:]')-editor-options
done
