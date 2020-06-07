const RepeatablePriorityDroppingWorker = require('./RepeatablePriorityDroppingWorker.js');

const axios = require('axios').default;
class CallbackWorker extends RepeatablePriorityDroppingWorker {
  constructor() {
    super();
    this.name = 'CallbackWorker';
  }

  resolver() {
    return axios.create();
  }

  doFailableWork(props) {
    return this.resolver().post(props.data.callbackUrl, props.data.payload)
      .then(result => result.data);
  }
}

module.exports = CallbackWorker;
