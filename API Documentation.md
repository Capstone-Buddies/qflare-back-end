# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [1. Introduction](#1-introduction)
  - [2. API Endpoints](#2-api-endpoints)
    - [2.1. User](#21-user)
      - [2.1.1. Register](#211-register)
      - [2.1.2. Login](#212-login)
      - [2.1.3. Logout](#213-logout)

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
  - **Bad Request: Missing username**:
    - **Description**: Register a new user with missing username on request body
    - **Status Code**: `400 Bad Request`
    - **Response Body**:
      - `message`: `Username is required`
  - **Bad Request: Missing email**:
    - **Description**: Register a new user with missing email on request body
    - **Status Code**: `400 Bad Request`
    - **Response Body**:
      - `message`: `Email is required`
  - **Bad Request: Missing password**:
    - **Description**: Register a new user with missing password
    - **Status Code**: `400 Bad Request`
    - **Response Body**:
      - `message`: `Password is required`
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
