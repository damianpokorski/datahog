const { Router } = require('express');
const { check } = require('express-validator');
const expressValidatorRejectInvalidRequests = require('./middleware/expressValidatorRejectInvalidRequests');

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
  return response.send('success');
});

module.exports = routes;