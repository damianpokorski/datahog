const RepeatablePriorityDroppingWorker = require('./RepeatablePriorityDroppingWorker.js');
const CallbackWorker = require('./CallbackWorker');

const axios = require('axios').default;

class DataAcquisitionWorker extends RepeatablePriorityDroppingWorker {
  constructor() {
    super();
    this.name = 'DataAcquisitonWorker';
    this.resolver = axios.create();
  }

  doFailableWork(props) {
    return this.resolver.get(props.data.url)
      .then(result => (new CallbackWorker())
        .addWork({
          callbackUrl: props.data.callbackUrl,
          payload: result.data
        })
      );
  }
}


module.exports = DataAcquisitionWorker;
