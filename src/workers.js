const ExampleWorker = require('./classes/workers/ExampleWorker');
const RepeatablePriorityDroppingWorker = require('./classes/workers/RepeatablePriorityDroppingWorker');

[
  new ExampleWorker(),
  new RepeatablePriorityDroppingWorker()
].forEach(worker => worker.beginWorking());