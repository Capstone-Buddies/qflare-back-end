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
  - `username` (string): The username of the user
  - `email` (string): The email of the user
  - `password` (string): The password of the user
- **Response**:
  - **Success**:
    - **Description**: Valid new user registration
    - **Status Code**: `201 Created`
    - **Response Body**:
      - `status`: `success`
      - `message`: `User registered successfully`
      - `data`:
        - `username` (string): The username of the user
        - `email` (string): The email of the user
  - **Conflict: Email already used**
    - **Description**: Register a new user with email that is already in use
    - **Status Code**: `403 Forbidden`
    - **Response Body**:
      - `message`: `Email is already in use`

#### 2.1.2. Login

- **Method**: `POST`
- **URL**: `/api/users/login`
- **Description**: Login a user
- **Request Body**:
  - `email` (string): The email of the user
  - `password` (string): The password of the user
- **Response**:
  - **Success**:
    - **Description**: Valid login
    - **Status Code**: `200 OK`
    - **Response Body**:
      - `status`: `success`
      - `message`: `User logged in successfully`
      - `token` (string): The JWT token
  - **Unauthorized: Wrong credential**:
    - **Description**: Login with invalid email or password
    - **Status Code**: `403 Forbidden`
    - **Response Body**:
      - `message`: `Invalid email or password`

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
