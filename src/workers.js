const DataAcquisitionWorker = require('./classes/workers/DataAcquisitionWorker');
const CallbackWorker = require('./classes/workers/CallbackWorker');


module.exports = [
  new DataAcquisitionWorker(),
  new CallbackWorker()
].forEach(worker => worker.beginWorking());

