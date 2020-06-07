const { Router } = require('express');
const { check } = require('express-validator');
const expressValidatorRejectInvalidRequests = require('./middleware/expressValidatorRejectInvalidRequests');
const DataAcquisitionWorker = require('./classes/workers/DataAcquisitionWorker');
/** @type {Router} */
const routes = new Router();
const providers = {
  gas: process.env.PROVIDER_GAS_URL|| 'http://localhost:3000/api/gas',
  internet: process.env.PROVIDER_INTERNET_URL || 'http://localhost:3000/api/internet',
}


routes.post('/api', [
  check('provider')
    .exists('provider').withMessage('Property [provider] must be defined').bail()
    .isIn(Object.keys(providers)).withMessage(`Property must be in ${Object.keys(providers).join(', ')}`),
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