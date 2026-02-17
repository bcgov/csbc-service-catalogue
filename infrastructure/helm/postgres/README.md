# CSBC Service Catalogue Postgres Helm Chart

Deploys a single node postgres database.  No HA, Backups, etc...

## Prerequisites

Create the OpenShift Secret containing the postgres password.

```sh
oc create \
    secret \
    generic \
    csbc-service-catalogue-postgres-credentials \
    --from-literal=password=<password> \
    -n <namespace>
```

## Installation

```sh
helm <install|upgrade> csbc-service-catalogue-postgres ./infrastructure/helm/postgres \
    -f ./infrastructure/helm/postgres/values.dev.yaml \
    -n <namespace>
```