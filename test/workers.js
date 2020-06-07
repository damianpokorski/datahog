// Dependencies
const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');

const BaseWorker = require('../src/classes/workers/BaseWorker');
const RepeatablePriorityDroppingWorker = require('../src/classes/workers/RepeatablePriorityDroppingWorker');
const DataAcquisitionWorker = require('../src/classes/workers/DataAcquisitionWorker');
const CallbackWorker = require('../src/classes/workers/CallbackWorker');

// Stubs
/** @type {sinon.SinonStub} */
let addWorkStub = null;

/** @type {sinon.SinonStub} */
let beginWorkStub = null;

/** @type {sinon.SinonStub} */
let consoleLogStub = null;

/** @type {sinon.SinonStub} */
let consoleWarnStub = null;

/** @type {sinon.SinonStub} */
let axiosDataAcquisitionStub = null;

/** @type {sinon.SinonStub} */
let axiosCallbackStub = null;

// Test definitions
describe('Workers', () => {
  beforeEach(function () {
    addWorkStub = sinon
      .stub(BaseWorker.prototype, 'addWork')
      .returns(Promise.resolve());
    beginWorkStub = sinon.stub(BaseWorker.prototype, 'beginWorking');
    getWorkerQueueStub = sinon
      .stub(BaseWorker.prototype, 'getWorkerQueue')
      .returns({ add: () => Promise.resolve() });

    consoleLogStub = sinon.stub(console, 'log');
    consoleWarnStub = sinon.stub(console, 'warn');

    axiosDataAcquisitionStub = sinon
      .stub(DataAcquisitionWorker.prototype, 'resolver')
      .returns({
        get: () => Promise.resolve({ data: { success: true } }),
      });
    axiosCallbackStub = sinon
      .stub(CallbackWorker.prototype, 'resolver')
      .returns({
        post: (url, payload) => Promise.resolve({ data: payload }),
      });
  });

  afterEach(function () {
    addWorkStub.restore();
    beginWorkStub.restore();
    getWorkerQueueStub.restore();
    consoleLogStub.restore();
    consoleWarnStub.restore();
    axiosDataAcquisitionStub.restore();
    axiosCallbackStub.restore();
  });

  describe('Worker.js', () => {
    it('Trigger beginWorking method on both workers', function () {
      const x = require('../src/workers.js');
      expect(beginWorkStub.calledTwice).eq(true);
    });
  });

  describe('Worker - RepeatablePriorityDroppingWorker', () => {
    it('Shows logs with error details when triggering work', function (done) {
      const worker = new RepeatablePriorityDroppingWorker();
      worker
        .doWork({ data: {} })
        .then(() => {
          expect(
            consoleLogStub.calledWith(
              '[RepeatablePriorityDroppingQueue] Triggering job! {}'
            )
          ).to.eq(true);
          expect(
            consoleWarnStub.calledWith(
              '[RepeatablePriorityDroppingQueue] Error: "Do failable work function is not defined"'
            )
          ).to.eq(true);
        })
        .then(done);
    });
  });

  describe('Worker - DataAcquisitionWorker', () => {
    it('Maps successful results to the callback worker queue', function (done) {
      new DataAcquisitionWorker()
        .doFailableWork({
          data: {
            url: 'http://example.com',
            callbackUrl: 'http://callback-example.com/',
          },
        })
        .then(() => {
          expect(addWorkStub.getCall(0).args[0].callbackUrl).eq(
            'http://callback-example.com/'
          );
          expect(addWorkStub.getCall(0).args[0].payload.success).eq(true);
          done();
        });
    });
  });

  describe('Worker - Callbackworker', () => {
    it('Makes a successful callback', function (done) {
      new CallbackWorker()
        .doFailableWork({
          data: {
            payload: { success: true },
            callbackUrl: 'http://callback-example.com/',
          },
        })
        .then((result) => {
          expect(axiosCallbackStub.calledOnce);
          expect(result.success).eq(true);
          done();
        });
    });
  });
});
