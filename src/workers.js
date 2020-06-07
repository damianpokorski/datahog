const ExampleWorker = require('./classes/workers/ExampleWorker');
const RepeatablePriorityDroppingWorker = require('./classes/workers/RepeatablePriorityDroppingWorker');
const DataAcquisitionWorker = require('./classes/workers/DataAcquisitionWorker');
const CallbackWorker = require('./classes/workers/CallbackWorker');
[
  new ExampleWorker(),
  new RepeatablePriorityDroppingWorker(),
  new DataAcquisitionWorker(),
  new CallbackWorker()
].forEach(worker => worker.beginWorking());