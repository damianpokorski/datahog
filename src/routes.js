// Libraries
const { Router } = require('express');
const { check } = require('express-validator');

// Middleware
const expressValidatorRejectInvalidRequests = require('./middleware/expressValidatorRejectInvalidRequests');

// Worker which can be triggered by the request
const DataAcquisitionWorker = require('./classes/workers/DataAcquisitionWorker');

// Request wrapper
/** @type {Router} */
const routes = new Router();

// Providers hash table stored in object
const providers = {
  gas: process.env.PROVIDER_GAS_URL|| 'http://localhost:3000/api/gas',
  internet: process.env.PROVIDER_INTERNET_URL || 'http://localhost:3000/api/internet',
}

routes.post('/api', [
  check('provider')
    .exists('provider').withMessage('Property [provider] must be defined').bail()
    .isIn(Object.keys(providers)).withMessage(`Property must be one of: ${Object.keys(providers).join(', ')}`),
  check('callbackUrl')
    .exists().withMessage('Property [callbackUrl] must be defined').bail(),
  expressValidatorRejectInvalidRequests
], (request, response) => {
  (new DataAcquisitionWorker)
    .addWork({
      url: providers[request.body.provider],
      callbackUrl: request.body.callbackUrl
    })
    .then(() => response.send('success'));
});

module.exports = routes;