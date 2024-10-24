# Todo App

A Todo List REST API built with Node.js, ExpressJS, MongoDB. This API enables users to perform CRUD (Create, Read, Update, Delete) operations on todo items and includes a CRON job to automatically update the status of expired todo items.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Set Up the Environment](#setup-env)
  - [Set Up MongoDB](#set-up-mongodb)
  - [Install Dependencies](#install-dependencies)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
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
cd todoapp
```

### Set Up the Environment
Copy the Sample File: Copy the .env.example file to create your own .env file
```bash
cp .env.example .env
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
## API Documentation
### Base URL
`http://localhost:3000/api`

## Authentication
Upon successful login, a token will be generated. This token is essential for authenticating your requests to all other API endpoints.
- You must include the token in the header of your requests for all APIs except the login API.
### Example
```json
{token: #token}
```

## Endpoints

### 1. Login API
- **Method**: `POST`
- **Endpoint**: `/login`
- **Request Body**:
    ```json
    {
     "email":"test@test.com",
     "password":"123456"
    }
    ```
- **Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
        "success": 1,
        "data":{
          "token":"#TOKEN",
          "name":"USER" 
         }
    }
    ```

### 2. Get All Todos
- **Method**: `GET`
- **Endpoint**: `/v1/get-todo`
- **Description**: Retrieve all Todo items for user.
- **Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
    success:1,
    data:[
        {
            "_id": "1234",
            "title": "Todo",
            "description":"Desc Todo"
            "completed": false,
            "dueDate": "2024-10-31"
        }
    ]
   }
    ```

### 3. Create a Todo
- **Method**: `POST`
- **Endpoint**: `/v1/add-todo`
- **Request Body**:
    ```json
    {
        "title": "New Todo",
        "description":"New Desc"
        "dueDate": "2024-10-31" //Format : "YYYY-MM-DD"
    }
    ```
- **Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
        "success": 1,
        "message":"Created"
    }
    ```
### 4. Update a Todo
- **Method**: `PUT`
- **Endpoint**: `/v1/update-todo`
- **Request Body**:
    ```json
    {
    "id":"671969595e4e6bfcacfa85c6",  // _id from todo list
    "title":"Update val",
    "description":"DESC Update",
    "dueDate":"2023-10-12"
    }
    ```
- **Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
        "success": 1,
        "message":"Updated"
    }
    ```

### 5. Delete a Todo
- **Method**: `DELETE`
- **Endpoint**: `/v1/delete-todo`
- **Request Body**:
    ```json
    {
    "id":"671969595e4e6bfcacfa85c6", // _id from todo list
    }
    ```
- **Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
        "success": 1,
        "message":"Deleted"
    }
    ```

## Error Handling
Common error responses:
- **404 Not Found**: Item does not exist.
- **500 Internal Server Error**: An error occurred on the server.

## Usage Examples
Examples of how to make requests using tools like Postman or curl.

## Change Log
Track changes here.




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