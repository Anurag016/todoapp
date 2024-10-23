const mongoose = require('mongoose');

// Define the schema for a Todo item
const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // ID of the user
    name: { type: String, required: true },
    email: { type: String, required: true },  // Email
    password: { type: String, default: false }, // Password
    jwt: { type: String }, // jwt
    updatedAt: { type: Date, default: Date.now }, // Updation date
    createdAt: { type: Date, default: Date.now }, // Creation date
});

// Create the model from the schema
const User = mongoose.model('user', UserSchema);

module.exports = User; // Export the model
