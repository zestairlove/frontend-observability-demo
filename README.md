# Frontend Observability Demo

## [Loki Docker Driver](https://grafana.com/docs/loki/latest/send-data/docker-driver/)

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

> Docker plugins are not supported on Windows; see the Docker Engine managed plugin system documentation for more information.

## turborepo commands

**Dependency Installation**

```bash
yarn workspace web add jest --dev
yarn workspace @repo/ui add jest --dev
```
