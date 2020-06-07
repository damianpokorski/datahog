# Project setup

Note: the original repository has been implemented through the git submodule

```bash
git clone https://github.com/damianpokorski/datahog.git
```

# Composer environment set up
Building the docker containers and running demo
```bash
docker-compose up --build
```

# Tasks
Within the package.json the following tasks have been defined

```bash
npm run api
```
Starts the API server.

```bash
npm run worker
```
Starts the worker process.

```bash
npm run test
```
Executes automated tests with usage of mocha and chai.

```bash
npm run coverage
```
Executes the automated tests and tracks the unit test coverage.
