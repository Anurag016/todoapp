const cron = require('node-cron');
const Todo = require('../models/todo'); // Adjust the path as necessary

// Schedule a task to run every night at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        // Example task: Update expired Todos
        let currDate = new Date();
        currDate = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate();
        currDate = new Date(currDate);

        const expiredTodos = await Todo.updateMany(
            { dueDate: { $lt: currDate }, completed: false },
            { $set: { completed: true } } // Mark expired todos as completed
        );

        console.log(`Updated ${expiredTodos.modifiedCount} expired todos.`);
    } catch (error) {
        console.error('Error running cron job:', error);
    }
});

console.log('Cron job scheduled to run every night at midnight.');
