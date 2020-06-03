const { validationResult } = require('express-validator');

// This middleware is only meant to be used after the express-validator rules have been defined
// Provides a consistent way or rejecting requests which have failed validation
module.exports = function(request, response, next) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    return next();
}