# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)

  - [1. Introduction](#1-introduction)
  - [2. API Endpoints](#2-api-endpoints)

    - [2.1. Auth](#21-auth)
      - [2.1.1. Register](#211-register)
      - [2.1.2. Login](#212-login)
      - [2.1.3. Logout](#213-logout)
    - [2.2. Quiz](#22-quiz)
      - [2.2.1. Generate Quiz](#221-generate-quiz)
      - [2.2.2. Calculate Quiz](#222-calculate-quiz)
      - [2.2.3. Get Quiz Histories](#223-get-quiz-histories)
      - [2.2.4. Get Quiz Answers](#224-get-quiz-answers)
    - [2.3. User](#23-user)
      - [2.3.1. Get User Profile](#231-get-user-profile)
      - [2.3.2. Get User Leaderboard](#232-get-users-leaderboard)
      - [2.3.3. Change User Profile Image](#233-change-user-profile-image)
  - [3. Other Error](#3-other-error)
    - [3.1. Invalid Request](#31-invalid-request)

## 1. Introduction

This API documentation provides information on how to interact with the Qflare API. The API is built using Node.js and Express.js. The database used is MySQL.

## 2. API Endpoints

### 2.1. Auth

#### 2.1.1. Register

- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Description**: Register a new user
- **Request Body (json)**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "schoolOrigin": "SMA 1 MAKASSAR"
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
- **URL**: `/api/auth/login`
- **Description**: Login a user
- **Request Body (json)**:
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
- **URL**: `/api/auth/logout`
- **Description**: Logout a user
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer {{jwt_token}}" // token from login
  }
  ```
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

#### 2.2.1. Generate Quiz

- **Method**: `POST`
- **URL**: `/api/quizzes`
- **Description**: Generate a quiz for the authenticated user
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer {{jwt_token}}" // token from login
  }
  ```
- **Request Body (json)**:
  ```json
  {
    "quizCategory": "Literasi" // "Literasi" | "TPS"
  }
  ```
- **Response**:
  - **Success**:
    - **Description**: Valid quiz generated
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "data": {
          "quizId": "1",
          "questions": [
            {
              "id": "1",
              "question": "Lawan kata monoton",
              "option1": "Bergerak-gerak",
              "option2": "Berulang-ulang ",
              "option3": "Berubah-ubah",
              "option4": "Terus menerus"
            },
            {
              "id": "2",
              "question": "Lawan kata monoton",
              "option1": "Bergerak-gerak",
              "option2": "Berulang-ulang ",
              "option3": "Berubah-ubah",
              "option4": "Terus menerus"
            }
            // ... more questions until 10
          ]
        },
        "message": "Successfully generated quiz"
      }
      ```
  - **Internal Server Error: Unable to generate Quiz**
    - **Description**: Unable to generate Quiz due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "An error occurred while generate quiz"
      }
      ```

#### 2.2.2. Calculate Quiz

- **Method**: `POST`
- **URL**: `/api/quizzes/result`
- **Description**: Calculate the result of a quiz for the authenticated user
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer {{jwt_token}}" // token from login
  }
  ```
- **Request Body (json)**:
  ```json
  {
    "quizId": 1,
    "answers": [
      {
        "questionId": 1,
        "userAnswer": 2, // valid values: 1 | 2 | 3 | 4
        "duration": 34 // in seconds
      },
      {
        "questionId": 2,
        "userAnswer": 2,
        "duration": 34
      }
      // ... more answers until 10
    ]
  }
  ```
- **Response**:
  - **Success**:
    - **Description**: Valid quiz result
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "data": {
          "grade": 90,
          "expGain": 100,
          "newLevel": 1
          "newExp": 760,
        },
        "message": "Successfully calculated quiz"
      }
      ```
  - **Internal Server Error: Unable to calculate Quiz**
    - **Description**: Unable to calculate Quiz due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "An error occurred while calculate quiz"
      }
      ```

#### 2.2.3. Get Quiz Histories

- **Method**: `GET`
- **URL**: `/api/quizzes/histories`
- **Description**: Get the quiz histories for the authenticated user
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer {{jwt_token}}" // token from login
  }
  ```
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
              "id": "1",
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
  - **Success: No Quiz Histories**:
    - **Description**: Valid request but no quiz histories found due to user never take any quiz
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "message": "User has no quiz histories"
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

#### 2.2.4. Get Quiz History's User Answer

- **Method**: `GET`
- **URL**: `/api/quizzes/histories/{historyId}/answers`
- **Description**: Get the user answers of a quiz from the authenticated user
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer {{jwt_token}}" // token from login
  }
  ```
- **Response**:
  - **Success**:
    - **Description**: Valid quiz answers
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "data": {
          "answers": [
            {
              "question": "Lawan kata monoton",
              "option1": "Bergerak-gerak",
              "option2": "Berulang-ulang ",
              "option3": "Berubah-ubah",
              "option4": "Terus menerus",
              "userAnswer": 2,
              "duration": 34,
              "correctness": false
            },
            {
              "question": "Lawan kata monoton",
              "option1": "Bergerak-gerak",
              "option2": "Berulang-ulang ",
              "option3": "Berubah-ubah",
              "option4": "Terus menerus",
              "userAnswer": 2,
              "duration": 34,
              "correctness": false
            }
            // ... more answers until 10
          ]
        },
        "message": "Successfully retrieved quiz answers"
      }
      ```
  - **Internal Server Error: Unable get Quiz Answers**:
    - **Description**: Unable to get user Quiz Answers due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "An error occurred while load quiz answers"
      }
      ```

### 2.3. User

#### 2.3.1. Get User Profile

- **Method**: `GET`
- **URL**: `/api/users/my-profile`
- **Description**: Get the profile of the authenticated user
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer {{jwt_token}}" // token from login
  }
  ```
- **Response**:
  - **Success**:
    - **Description**: Valid user profile
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "data": {
          "username": "john_doe",
          "email": "john@example.com",
          "schoolOrigin": "SMA 1 MAKASSAR",
          "level": 3,
          "exp": 239,
          "profileImgUrl": "https://example.com/profile.jpg"
        },
        "message": "Successfully retrieved user profile"
      }
      ```

#### 2.3.2. Get Users Leaderboard

- **Method**: `GET`
- **URL**: `/api/users/leaderboard`
- **Description**: Get the leaderbord based on exp users
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer {{jwt_token}}" // token from login
  }
  ```
- **Response**:
  - **Success**:
    - **Description**: Valid leaderboard
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "data": {
          "leaderboard": [
            {
              "username": "clair",
              "level": 10,
              "exp": 0,
              "profileImgUrl": "https://storage.cloud.google.com/image_profilee/933-9332131_profile-picture-default-png.png"
            },
            {
              "username": "admin",
              "level": 1,
              "exp": 0,
              "profileImgUrl": "https://storage.cloud.google.com/image_profilee/933-9332131_profile-picture-default-png.png"
            },
            {
              "username": "bambang",
              "level": 1,
              "exp": 0,
              "profileImgUrl": "https://storage.cloud.google.com/image_profilee/933-9332131_profile-picture-default-png.png"
            },
            {
              "username": "bismillah",
              "level": 1,
              "exp": 0,
              "profileImgUrl": "https://storage.cloud.google.com/image_profilee/933-9332131_profile-picture-default-png.png"
            },
            {
              "username": "Voyance",
              "level": 1,
              "exp": 0,
              "profileImgUrl": "https://storage.cloud.google.com/image_profilee/933-9332131_profile-picture-default-png.png"
            }
          ]
        },
        "message": "Leaderboard fetched successfully"
      }
      ```
  - **Internal Server Error: Unable to get Leaderboard**:
    - **Description**: Unable to get leaderboard due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "An error occurred while load Leaderboard"
      }
      ```

#### 2.3.3. Change User Profile Image

- **Method**: `POST`
- **URL**: `/api/users/my-profile/image`
- **Description**: Change the profile image of the authenticated user
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer {{jwt_token}}" // token from login
  }
  ```
- **Request Body (multipart/form-data)**:
  ```json
  {
    "profile_img_url": "profile.jpg" // should be a image file
  }
  ```
- **Response**:
  - **Success**:
    - **Description**: Valid user profile image change
    - **Status Code**: `201 Created`
    - **Response Body**:
      ```json
      {
        "status": "success",
        "data": {
          "profileImageUrl": "https://storage.googleapis.com/qflarebucket/.....jpg"
        },
        "message": "Profile image change successfully"
      }
      ```
  - **Bad Request: Unable to change profile because no file selected**:
    - **Description**: Unable to change the profile image because no file was selected.
    - **Status Code**: `400 Bad request`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "No file uploaded"
      }
      ```
  - **Internal Server Error: Unable to change User Profile Image**:
    - **Description**: Unable to change user profile image due to many reasons
    - **Status Code**: `500 Internal Server Error`
    - **Response Body**:
      ```json
      {
        "status": "fail",
        "message": "An error occurred while change user profile image"
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
        },
        {
          "property": "schoolOrigin",
          "message": "School origin must be in uppercase letters"
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
