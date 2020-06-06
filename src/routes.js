const { Router } = require('express');
const { check } = require('express-validator');
const expressValidatorRejectInvalidRequests = require('./middleware/expressValidatorRejectInvalidRequests');
const ExampleWorker = require('./classes/workers/ExampleWorker');

/** @type {Router} */
const routes = new Router();


routes.post('/api', [
  check('provider')
    .exists('provider').withMessage('Property [provider] must be defined').bail()
    .isIn(['gas', 'internet']).withMessage(`Property must be gas or internet`),
  check('callbackUrl')
    .exists().withMessage('Property [callbackUrl] must be defined').bail(),
  expressValidatorRejectInvalidRequests
], (request, response) => {
  (new ExampleWorker()).addWork('Hello world');
  return response.send('success');
});

routes.get('/get', function(request, response) {
  (new ExampleWorker())
    .addWork({a:'Hello world [GET]'});
  return response.send('success');
})


module.exports = routes;