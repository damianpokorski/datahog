# Requirements
Requirements

As our data providers can go offline for extended period of time, the naive implementations of this task using retry mechanisms are not going to be accepted!

- Build an API endpoint using Node.js (the likes of Express and Hapi are perfect for this job). You can use TypeScript if you wish;
- The API should accept a POST with two fields provider (gas or internet) and the callbackUrl. The payload should be validated accordingly;
- Once payload is accepted, collect the data from the mock endpoint described previously and call the callbackUrl with the collected data;
- Use Git whilst working on this task - this will help us understanding how you work;
- Use docker-compose to bootstrap other services you may need to complete the task;
- We expect decent test coverage for the code produced.

# About
This project was quite an interesting exercise, probably because it did focus on a lot of intergation issues etc rather than the programming practices and algorithms (which most of other tech tests seem to be doing).

Note: the original repository (datahog) has been added through the git submodule
# Solution
So in a quick summary I have decided to use redis in order to create a queue which works on FIFO basis, failed data acquisition requests are then requeued with a decreased priority and increased delays (i.e. if a request fails three times, it'll have a lower priority than a request which failed twice). 

This way any potentially invalid requests will always be at the bottom off the queue with a reduced interval of attempts, while new and fresh items will be always taken care of right away. 

# Tech
I've used docker-composer in order to scaffold following instances:
- Datahog - Project provided by you
- Redis - Standalone redis server used in order to establish a queue
- techtest-api - Express API which handles requests, validation and queueing of items
- techtest-worker - Node.js project running in tandem with API in order to execute the tasks

Stack used:
- Express - backend api
- Axios - promise based api for http requests
- mocha, chai & sinon - unit test framework, with mocking capabilities

# Extras
I've also attached postwoman.io.request.collection.json in the repo for easier manual request testing.


# Set up
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

## Unit testing
```bash
npm run test
```
Executes automated tests with usage of mocha and chai.

```
  Endpoints
    GET /api
      ✓ should return a 404 when accessed with invalid method
    POST /api
      ✓ should validate that the body contains both provider and callbackUrl properties
      ✓ should validate that the body is missing both provider and callbackUrl properties
      ✓ should validate that the callback provider is gas or internet

  Workers
    Worker.js
      ✓ Trigger beginWorking method on both workers
    Worker - RepeatablePriorityDroppingWorker
      ✓ Shows logs with error details when triggering work
    Worker - DataAcquisitionWorker
      ✓ Maps successful results to the callback worker queue
    Worker - Callbackworker
      ✓ Makes a successful callback


  8 passing (42ms)
```
## Coverage tests

```bash
npm run coverage
```
Executes the automated tests and tracks the unit test coverage.

While usually I'd aim for about 95-100 percent, I think I've already spent way too much time on this project.

Workers, redis access, and axios requests have been mocked.
```

-------------------------------------------|---------|----------|---------|---------|-------------------
File                                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------------------------|---------|----------|---------|---------|-------------------
All files                                  |    87.8 |       70 |   70.37 |   88.75 |                   
 src                                       |     100 |      100 |     100 |     100 |                   
  app.js                                   |     100 |      100 |     100 |     100 |                   
  routes.js                                |     100 |      100 |     100 |     100 |                   
  workers.js                               |     100 |      100 |     100 |     100 |                   
 src/classes/workers                       |      80 |       50 |   63.64 |   81.63 |                   
  BaseWorker.js                            |   38.46 |       25 |   14.29 |   41.67 | 11-38             
  CallbackWorker.js                        |    87.5 |      100 |      75 |    87.5 | 11                
  DataAcquisitionWorker.js                 |   88.89 |      100 |      75 |   88.89 | 13                
  RepeatablePriorityDroppingWorker.js      |     100 |      100 |     100 |     100 |                   
 src/middleware                            |     100 |      100 |     100 |     100 |                   
  expressValidatorRejectInvalidRequests.js |     100 |      100 |     100 |     100 |                   
-------------------------------------------|---------|----------|---------|---------|-------------------
```

## Api entry
```bash
npm run api
```
Starts the API server.

## Worker entry
```bash
npm run worker
```
Starts the worker process.
