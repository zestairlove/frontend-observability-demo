# Frontend Observability Demo

## docker-compose

```bash
docker compose --env-file .env.example config

docker compose --env-file .env.example up -d --force-recreate --remove-orphans
docker compose --env-file .env.example up -d --force-recreate --remove-orphans --build

docker compose --env-file .env.example down
```

## [Loki Docker Driver](https://grafana.com/docs/loki/latest/send-data/docker-driver/)

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

> Docker plugins are not supported on Windows; see the Docker Engine managed plugin system documentation for more information.

## k6 script

```bash
k6 run --vus 1 --duration 60s ./etc/k6-script.js
```

## turborepo commands

**Dependency Installation**

```bash
yarn workspace web add jest --dev
yarn workspace @repo/ui add jest --dev
```
