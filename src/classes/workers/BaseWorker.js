const Queue = require('bull');

class Worker {
  constructor() {
    this.name = 'worker-base';
    this.queue = null;
    this.concurency = process.env.WORKER_CONCURRENCY || 1;
  }

  initialiseQueue() {

    this.queue = new Queue(this.name, {
      redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379,
      },
    });
  }

  getWorkerQueue() {
    if(this.queue == null) {
      this.initialiseQueue();
    }
    return this.queue;
  }

  addWork(props) {
    return this.getWorkerQueue().add(props);
  }

  /**
   * @returns {Promise}
   */
  doWork(props) {
    throw new 'Do work function is not defined'();
  }

  beginWorking() {
    this.getWorkerQueue().process(this.concurency, this.doWork);
  }

}

module.exports = Worker;
