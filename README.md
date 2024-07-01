# Frontend Observability Demo

## [Loki Docker Driver](https://grafana.com/docs/loki/latest/send-data/docker-driver/)

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

> Docker plugins are not supported on Windows; see the Docker Engine managed plugin system documentation for more information.

## docker-compose

```bash
# render the configuration
docker compose --env-file .env.example config

# start the services
docker compose --env-file .env.example up -d --force-recreate --remove-orphans
docker compose --env-file .env.example up -d --force-recreate --remove-orphans --build

# stop the services
docker compose --env-file .env.example down
```

## services

- apps
  - web: [http://localhost:3000](http://localhost:3000)
  - admin-api: [http://localhost:3001](http://localhost:3001)
  - product-api: [http://localhost:3002](http://localhost:3002)
  - recommend-api: [http://localhost:3003](http://localhost:3003)
- grafana: [http://localhost:3200](http://localhost:3200)

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

## 기타 메모

**observability packages 설치**

```bash
yarn workspace admin-api add @opentelemetry/api @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http @opentelemetry/resources @opentelemetry/sdk-node @opentelemetry/semantic-conventions @opentelemetry/winston-transport
```

**nextjs `--require ./trace.js` 옵션 추가 방법**

- NODE_OPTIONS='--require ./trace.js'
- NEXTJS CONVENTION도 존재한다. `instrumentation.ts|js` 파일을 찾아서 자동으로 로드한다.

```json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--require ./trace.js' dotenvx run -f ../../.env.example -- next dev --turbo"
  }
}
```
