# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [1. Introduction](#1-introduction)
  - [2. API Endpoints](#2-api-endpoints)
    - [2.1. User](#21-user)
      - [2.1.1. Register](#211-register)
      - [2.1.2. Login](#212-login)
      - [2.1.3. Logout](#213-logout)
  - [3. Other Error](#3-other-error)
    - [3.1. Invalid Request](#31-invalid-request)

## 1. Introduction

This API documentation provides information on how to interact with the Qflare API. The API is built using Node.js and Express.js. The database used is MySQL.

## 2. API Endpoints

### 2.1. User

#### 2.1.1. Register

- **Method**: `POST`
- **URL**: `/api/users/register`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**:
    - **Description**: Valid new user registration
    - **Status Code**: `201 Created`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "message": "User registered successfully",
        "data": {
          "username": "john_doe",
          "email": "john@example.com"
        }
      }
      ```
  - **Conflict: Email already used**
    - **Description**: Register a new user with email that is already in use
    - **Status Code**: `409 Conflict`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "Email is already in use"
      }
      ```
  - **Internal Server Error: Unable to register user**
    - **Description**: Unable to register user to the due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "Unable to register user"
      }
      ```

#### 2.1.2. Login

- **Method**: `POST`
- **URL**: `/api/users/login`
- **Description**: Login a user
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**:
    - **Description**: Valid login
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "data": {
          "email": "john@example.com",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
        "message": "User logged in successfully"
      }
      ```
  - **Unauthorized: Wrong credential**:
    - **Description**: Login with invalid email or password
    - **Status Code**: `401 Unauthorized`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "Email or password is wrong"
      }
      ```
  - **Internal Server Error: Unable to log user in**
    - **Description**: Unable to log user in due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "Unable to log user in"
      }
      ```

#### 2.1.3. Logout

- **Method**: `GET`
- **URL**: `/api/users/logout`
- **Description**: Logout a user
- **Response**:
  - **Success**:
    - **Description**: Valid logout
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "message": "User logged out successfully"
      }
      ```
  - **Internal Server Error: Unable to log user in**
    - **Description**: Unable to log user out due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "Unable to log user out"
      }
      ```

### 2.2. Quiz

#### 2.2.1. Quiz Histories

- **Method**: `GET`
- **URL**: `/api/quizzez/histories`
- **Description**: Get the quiz histories for the authenticated user
- **Response**:
  - **Success**:
    - **Description**: Valid histories
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "data": {
          "histories": [
            {
              "timestamp": "2024-06-xxxx:xx44:00.000Z",
              "grade": 90,
              "level": 1,
              "quizCategory": "Literasi"
            }
          ]
        },
        "message": "Successfully retrieved quiz histories"
      }
      ```
  - **Internal Server Error: Unable get Quiz Histories**:
    - **Description**: Unable to get user Quiz Histories due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "An error occurred while load quiz histories"
      }
      ```

## 3. Other Error

### 3.1. Invalid Request

- **Description**: This is error that occurs whenever the request is invalid. The invalid request can be caused by missing required fields, adding undocumented fields, invalid data types, or breaking constraints. The error message will provide information on what is wrong with the request. The status code for this error is `400 Bad Request`. Typically, the response body will have structure as follows:

```json
{
  "status": "fail",
  "message": "Invalid request",
  "traces": [
    {
      "message": "Invalid request body",
      "errors": [
        {
          "property": "email",
          "message": "Invalid email"
        },
        {
          "property": "password",
          "message": "String must contain at least 6 character(s)"
        },
        {
          "property": "password",
          "message": "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        }
      ]
    }
  ]
}
```

This error message will provide information on what is wrong with the request. The `traces` field will contain an array of objects that provide information on the error. If you encounter this error, please check the error message to find out what is wrong with the request. Also, please refer to the API documentation to find out the correct request format.

- **Status Code**: `400 Bad Request`
- **Response Body**:
  - `status`: `fail`
  - `message`: `Invalid request`
  - `traces` (array):
    - `message` (string): The error message, this property would have one of these values: `Invalid request body` | `Invalid request query params` | `Invalid request params`
    - `errors` (array):
      - `property` (string): The field that has error
      - `message` (string): The error message
