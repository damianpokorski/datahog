// Server
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Route definition
const routes = require('./routes.js');
app.use('/', routes);

// Environment
const port = process.env.port || 3000;

// Launch server
app.listen(port, () => console.log(`API Listening at http://localhost:${port}`));

module.exports = app;