# Todo App

A Todo List REST API built with Node.js, ExpressJS, MongoDB. This API enables users to perform CRUD (Create, Read, Update, Delete) operations on todo items and includes a CRON job to automatically update the status of expired todo items.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Set Up MongoDB](#set-up-mongodb)
  - [Install Dependencies](#install-dependencies)
  - [Running the Server](#running-the-server)
- [Error Handling](#error-handling)

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Fast web framework for Node.js.
- **MongoDB**: NoSQL database for storing to-do items.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have [Node.js](https://nodejs.org/) installed (v14 or later recommended).
- You have [MongoDB](https://www.mongodb.com/) installed locally, or you can use a cloud service like MongoDB Atlas.

## Getting Started

### Clone the Repository

To get a local copy of the project, clone the repository:

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```
### Set Up MongoDB
Ensure your MongoDB server is running. If you are using a local instance, start it with:
```bash
mongod
```

### Install Dependencies
Navigate to the project directory and install the necessary packages:

```bash
npm install
```


### Running the Server
Start the application using:
```bash
node index.js
```

## Error Handling
The API implements a structured approach to error handling. Below are the different types of responses users may encounter:

### 1. Success and Error Responses:

- Status Code: 200 OK
- On successful requests, the API may return:
  - { status: 1 } indicating success with a data payload.
- However, in some cases, even with a 200 status code, the response may include:
  - { status: 0 } indicating a warning or error.
A message explaining the issue.

#### Example of Success:
```json
{
    "status": 1,
    "data": {
        "_id": "60d21b4667d0d8992e610c85",
        "userId": "myuser",
        "todo": "Buy TV",
        "completed": false
    }
}
```
#### Example of Warning/Error:
```json
{
    "status": 0,
    "message": "The item was created but is missing optional fields."
}
```

### 2. Unauthorized Access:

- Status Code: 401 Unauthorized
- This response is returned when the user is not authorized to perform the requested action.
- Returns:
  - status:0
  - A message explaining the issue.

#### Example:
```json
{
    "status": 0,
    "message": "Unauthorized access."
}
```

### 3. Validation Errors:

- Status Code: 422 Unprocessable Entity
- This response is returned when there are issues with the request parameters (e.g., missing required fields).
- Returns:
  - status:0
  - A message describing the validation error.


#### Example:
```json
{
    "status": 0,
    "message": "Validation failed: title is required."
}
```

### 4. Internal Server Errors:

- Status Code: 500 Internal Server Error
- This response is returned when an unexpected error occurs on the server side.
- Returns:
  - status:0
  - A message indicating a server error.


#### Example:
```json
{
    "status": 0,
    "message": "Internal server error."
}