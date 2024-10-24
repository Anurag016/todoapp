const Todo = require('../models/todo');
const { Validator } = require('node-input-validator');

let todo = {
    getTodo: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).send({ success: 0, message: "Internal Server Error" });
        }
    },
    addTodo: async (req, res) => {
        try {
            //Check Validation
            const v = new Validator(req.body, {
                title: "required",
                description: "required",
                dueDate: "required|dateFormat:YYYY-MM-DD"
            });

            const matched = await v.check();
            if (!matched) {
                return res.status(422).send({ success: 0, message: v.errors })
            }

            //Validate Due Date
            let currDate = new Date();
            currDate = currDate.getFullYear()+"-"+(currDate.getMonth()+1)+"-"+ currDate.getDate();
            currDate = new Date(currDate)

            if (currDate > new Date(req.body.dueDate)) {
                return res.status(200).send({ success: 0, message: "Due Date Should be Greater than or equal to Today" })
            }
            //Create New Todo For User
            await new Todo({
                userId: req.userId,
                title: req.body.title,
                description: req.body.description,
                dueDate: new Date(req.body.dueDate)
            }).save();

            return res.status(200).send({ success: 1, message: "Created" });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).send({ success: 0, message: "Internal Server Error" });
        }
    },
    updateTodo: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).send({ success: 0, message: "Internal Server Error" });
        }
    },
    deleteTodo: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).send({ success: 0, message: "Internal Server Error" });
        }
    },
}

module.exports = todo;