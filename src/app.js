const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(logger);

// Routes
app.use('/api', routes);


module.exports = app;