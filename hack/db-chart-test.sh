#!/usr/bin/env sh

for db in Cassandra ClickHouse Druid Elasticsearch FerretDB Kafka MariaDB Memcached MongoDB MSSQLServer MySQL PerconaXtraDB PgBouncer Pgpool Postgres ProxySQL RabbitMQ Redis Singlestore Solr ZooKeeper; do
    make ct CT_COMMAND=lint TEST_CHARTS=charts/kubedbcom-$(echo "$db" | tr '[:upper:]' '[:lower:]')-editor-options
done
