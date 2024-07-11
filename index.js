const express = require('express')
const app = express()
const user = require('./routes/user')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt');

// Load environment variables from .env file
dotenv.config();


app.use(express.json())
app.use(authJwt());
app.use('/api/v1', user)



// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database connection is ready');
})
.catch((error) => {
    console.error('Connection to MongoDB failed:', error);
});

const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});