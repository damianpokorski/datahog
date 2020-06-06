const BaseWorker = require('./BaseWorker');


class ExampleWorker extends BaseWorker {
  constructor() {
    super();
    this.name = 'Test Worker';
  }

  addWork(props) {
    console.log(['Adding to queue', props]);
    super.addWork(props);
  }

  doWork(props) {
    console.log(['Worker says hello!', props]);
  }
}


module.exports = ExampleWorker;