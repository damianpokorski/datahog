// Server
const express = require('express');
const app = express();

// Route definition
const routes = require('./routes.js');
app.use('/', routes);

// Environment
const port = process.env.port || 3001;

// Launch server
app.listen(port, () => console.log(`API Listening at http://localhost:${port}`));

module.exports = app;