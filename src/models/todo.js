const mongoose = require('mongoose');

// Define the schema for a Todo item
const TodoSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // ID of the user who owns the todo
    title: { type: String, required: true },  // Title of the todo item
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }, // Status of the todo item
    dueDate: { type: Date,required:true }, // Optional due date
    createdAt: { type: Date, default: Date.now }, // Creation date
});

// Create the model from the schema
const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo; // Export the model
