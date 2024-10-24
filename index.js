const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
require('./src/cron/cron.js');

// Initialize Express app
const app = express();

const mongoURI = process.env.DB; // Update this to your MongoDB connection string

async function initializeApp() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

initializeApp();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
