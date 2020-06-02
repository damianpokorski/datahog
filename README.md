# Project setup

Note: the original repository has been implemented through the git submodule

```bash
git clone https://github.com/damianpokorski/datahog.git
```


# Tasks
Within the package.json the following tasks have been defined

```bash
npm run api
```
Starts the API server.

```
npm run provider
```
Starts the provider server which has been supplied through the git submodule.

```bash
npm run start
```
Starts both the API express server side by side, for ease of development.


```bash
npm run test
```
Executes automated tests with usage of mocha and chai.

```bash
npm run coverage
```
Executes the automated tests and tracks the unit test coverage.