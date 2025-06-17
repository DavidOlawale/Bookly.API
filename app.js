const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./src/routes/index');
const loggerMiddleware = require('./src/middleware/logger');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api', apiRoutes);


// --- Error Handling ---
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// A general error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
