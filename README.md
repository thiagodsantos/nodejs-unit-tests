# nodejs-unit-tests

## Prerequisites

- Docker
- Docker Compose

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/thiagodsantos/nodejs-unit-tests.git
cd nodejs-unit-tests/
docker compose up -d
make migration-run
```

## Developing

### Built With
- Node.js
- Typescript
- MySQL

### Building

```shell
make linter && make build
```

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Environment variables

- NODE_ENV
- APP_PORT
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWD

## Tests

```shell
make npm-test
```

```shell
make npm-test-coverage
```

## Style guide

Standard

## Database

MySQL (mariadb)

## Licensing

MIT
