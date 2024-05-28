# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [1. Introduction](#1-introduction)
  - [2. API Endpoints](#2-api-endpoints)
    - [2.1. User](#21-user)
      - [2.1.1. Register](#211-register)
      - [2.1.2. Login](#212-login)
      - [2.1.3. Logout](#213-logout)
      - [2.1.4. Get User](#214-get-user)
      - [2.1.5. Update User](#215-update-user)
      - [2.1.6. Delete User](#216-delete-user)
    - [2.2. Post](#22-post)
      - [2.2.1. Create Post](#221-create-post)
      - [2.2.2. Get All Posts](#222-get-all-posts)
      - [2.2.3. Get Post](#223-get-post)
      - [2.2.4. Update Post](#224-update-post)
      - [2.2.5. Delete Post](#225-delete-post)
    - [2.3. Comment](#23-comment)
      - [2.3.1. Create Comment](#231-create-comment)
      - [2.3.2. Get All Comments](#232-get-all-comments)
      - [2.3.3. Get Comment](#233-get-comment)
      - [2.3.4. Update Comment](#234-update-comment)
      - [2.3.5. Delete Comment](#235-delete-comment)
    - [2.4. Like](#24-like)
      - [2.4.1. Like Post](#241-like-post)
      - [2.4.2. Unlike Post](#242-unlike-post)
      - [2.4.3. Like Comment](#243-like-comment)
      - [2.4.4. Unlike Comment](#244-unlike-comment)
  - [3. Error Codes](#3-error-codes)
    - [3.1. 400 Bad Request](#31-400-bad-request)
    - [3.2. 401 Unauthorized](#32-401-unauthorized)
    - [3.3. 403 Forbidden](#33-403-forbidden)

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
  - status code: `201 Created`
  - body: none

#### 2.1.2. Login

- **Method**: `POST`
- **URL**: `/api/users/login`
- **Description**: Login a user
- **Request Body**:
  - `email` (string): The email of the user
  - `password` (string): The password of the user
- **Response**:
  - status code: `200 OK`
  - body:
    - `token` (string): The JWT token
