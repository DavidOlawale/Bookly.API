require('dotenv').config();

const app = require('./app');
const { connectToDb } = require('./src/utils/database');

// Use the PORT from environment variables, or default to 3000
const PORT = process.env.PORT || 3000;

// Connect to the database and then start the server
connectToDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`API available at http://localhost:${PORT}/api`);
    });
}).catch(error => {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process if database connection fails
});
