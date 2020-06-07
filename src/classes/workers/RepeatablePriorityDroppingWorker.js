const BaseWorker = require('./BaseWorker');
const axios = require('axios');

class RepeatablePriorityDroppingWorker extends BaseWorker {
  constructor() {
    super();
    this.name = 'RepeatablePriorityDroppingQueue';

    this.priorityDecrement = 1;
    this.delayIncrementMs = 250;

    this.minPriority = -50;
    this.maxDelayMs = 1000 * 60;
  }

  requeueWithPriorityDropAndDelay(data, errors) {
    return new Promise((resolve, reject) => {
      // Calculate properties, and cap them once they reach the maximum values
      const priority = Math.max((data.workerPriority || -1) - this.priorityDecrement, this.minPriority);
      const delay = Math.min((data.workerDelay || this.delayIncrementMs) + this.delayIncrementMs, this.maxDelayMs);

      // Log messages
      console.log(
        `[${this.name}] Failed, requeueing with lowered priority(${priority}) and delay(${delay})`
      );
      console.warn(`[${this.name}] Error: ${JSON.stringify(errors)}`);

      // Append delay properties to payload, and requeue with values
      this.getWorkerQueue()
        .add(
          {
            ...data,
            workerPriority: priority,
            workerDelay: delay,
          },
          { delay, priority }
        )
        .then(resolve)
    });
  }

  doFailableWork(props) {
    return new Promise((resolve, reject) => {
      throw 'Do failable work function is not defined';
    });
  }

  doWork(props) {
    console.log(`[${this.name}] Triggering job! ${JSON.stringify(props.data)}`);
    return this.doFailableWork(props)
      .catch((errors) => this.requeueWithPriorityDropAndDelay(props.data, errors));
  }
}

module.exports = RepeatablePriorityDroppingWorker;
