
# NestJS GraphQL Authentication API

A RESTful API service using NestJS with TypeScript that supports user authentication (standard and biometric), registration, and utilizes Prisma as the ORM. The API is exposed through GraphQL.

## Features

- User registration with email and password
- Standard login with email and password
- Biometric login
- JWT-based authentication
- GraphQL API
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

## Installation

1. Clone the repository
2. Install dependencies:

npm install 

## to run locally 

npm run start:dev



```

**Variables**:

```json
{
"input": {
"email": "[user@example.com](mailto:user@example.com)",
"password": "password123"
}
}

```plaintext

**Example Response**:

\`\`\`json
{
  "data": {
    "register": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com",
        "createdAt": "2023-12-15T12:00:00.000Z",
        "updatedAt": "2023-12-15T12:00:00.000Z"
      }
    }
  }
}
```

**Possible Errors**:

- Email already in use (409 Conflict)
- Invalid email format (400 Bad Request)
- Password too short (400 Bad Request)


**JavaScript Example**:

```javascript
async function registerUser(email, password) {
const response = await fetch('https://nestjs-backend-task.vercel.app/graphql', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
query: `        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            accessToken
            user {
              id
              email
              createdAt
              updatedAt
            }
          }
        }
     `,
variables: {
input: {
email,
password
}
}
})
});

const data = await response.json();

if (data.errors) {
throw new Error(data.errors[0].message);
}

return data.data.register;
}

```plaintext

### Standard Login

Authenticates a user with email and password.

**Operation Type**: Mutation

**Operation Name**: Login

**Input**:
- `email`: String (required) - User's email address
- `password`: String (required) - User's password

**Returns**:
- `accessToken`: String - JWT token for authentication
- `user`: User object with id, email, biometricKey, createdAt, and updatedAt fields

**Example Request**:

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user {
      id
      email
      biometricKey
      createdAt
      updatedAt
    }
  }
}
```

**Variables**:

```json
{
"input": {
"email": "[user@example.com](mailto:user@example.com)",
"password": "password123"
}
}

```plaintext

**Example Response**:

\`\`\`json
{
  "data": {
    "login": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com",
        "biometricKey": null,
        "createdAt": "2023-12-15T12:00:00.000Z",
        "updatedAt": "2023-12-15T12:00:00.000Z"
      }
    }
  }
}
```

**Possible Errors**:

- Invalid credentials (401 Unauthorized)
- User not found (401 Unauthorized)


**JavaScript Example**:

```javascript
async function loginUser(email, password) {
const response = await fetch('https://nestjs-backend-task.vercel.app/graphql', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
query: `        mutation Login($input: LoginInput!) {
          login(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
     `,
variables: {
input: {
email,
password
}
}
})
});

const data = await response.json();

if (data.errors) {
throw new Error(data.errors[0].message);
}

return data.data.login;
}

```plaintext

### Biometric Login

Authenticates a user with a biometric key.

**Operation Type**: Mutation

**Operation Name**: BiometricLogin

**Input**:
- `biometricKey`: String (required) - User's biometric key

**Returns**:
- `accessToken`: String - JWT token for authentication
- `user`: User object with id, email, biometricKey, createdAt, and updatedAt fields

**Example Request**:

```graphql
mutation BiometricLogin($input: BiometricLoginInput!) {
  biometricLogin(input: $input) {
    accessToken
    user {
      id
      email
      biometricKey
      createdAt
      updatedAt
    }
  }
}
```

**Variables**:

```json
{
"input": {
"biometricKey": "user-biometric-key-123"
}
}

```plaintext

**Example Response**:

\`\`\`json
{
  "data": {
    "biometricLogin": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com",
        "biometricKey": "user-biometric-key-123",
        "createdAt": "2023-12-15T12:00:00.000Z",
        "updatedAt": "2023-12-15T12:00:00.000Z"
      }
    }
  }
}
```

**Possible Errors**:

- Invalid biometric key (401 Unauthorized)
- User not found (401 Unauthorized)


**JavaScript Example**:

```javascript
async function biometricLogin(biometricKey) {
const response = await fetch('https://nestjs-backend-task.vercel.app/graphql', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
query: `        mutation BiometricLogin($input: BiometricLoginInput!) {
          biometricLogin(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
     `,
variables: {
input: {
biometricKey
}
}
})
});

const data = await response.json();

if (data.errors) {
throw new Error(data.errors[0].message);
}

return data.data.biometricLogin;
}

```plaintext

### Set Biometric Key

Sets or updates the biometric key for an authenticated user.

**Operation Type**: Mutation

**Operation Name**: SetBiometricKey

**Input**:
- `biometricKey`: String (required) - New biometric key to set

**Authentication**: Required (JWT token)

**Returns**:
- `accessToken`: String - New JWT token for authentication
- `user`: User object with updated biometric key

**Example Request**:

```graphql
mutation SetBiometricKey($input: SetBiometricKeyInput!) {
  setBiometricKey(input: $input) {
    accessToken
    user {
      id
      email
      biometricKey
      createdAt
      updatedAt
    }
  }
}
```

**Variables**:

```json
{
"input": {
"biometricKey": "new-biometric-key-456"
}
}

```plaintext

**Headers**:

```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

```plaintext

**Example Response**:

\`\`\`json
{
  "data": {
    "setBiometricKey": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com",
        "biometricKey": "new-biometric-key-456",
        "createdAt": "2023-12-15T12:00:00.000Z",
        "updatedAt": "2023-12-15T12:00:00.000Z"
      }
    }
  }
}
```

**Possible Errors**:

- Unauthorized (401 Unauthorized)
- Biometric key already in use (409 Conflict)


**JavaScript Example**:

```javascript
async function setBiometricKey(biometricKey, accessToken) {
const response = await fetch('https://nestjs-backend-task.vercel.app/graphql', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${accessToken}`
},
body: JSON.stringify({
query: `        mutation SetBiometricKey($input: SetBiometricKeyInput!) {
          setBiometricKey(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
     `,
variables: {
input: {
biometricKey
}
}
})
});

const data = await response.json();

if (data.errors) {
throw new Error(data.errors[0].message);
}

return data.data.setBiometricKey;
}

```plaintext

### Get Current User

Retrieves the profile of the currently authenticated user.

**Operation Type**: Query

**Operation Name**: Me

**Authentication**: Required (JWT token)

**Returns**: User object with id, email, biometricKey, createdAt, and updatedAt fields

**Example Request**:

```graphql
query Me {
  me {
    id
    email
    biometricKey
    createdAt
    updatedAt
  }
}
```

**Headers**:

```plaintext
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example Response**:

```json
{
"data": {
"me": {
"id": "550e8400-e29b-41d4-a716-446655440000",
"email": "[user@example.com](mailto:user@example.com)",
"biometricKey": "user-biometric-key-123",
"createdAt": "2023-12-15T12:00:00.000Z",
"updatedAt": "2023-12-15T12:00:00.000Z"
}
}
}

```plaintext

**Possible Errors**:
- Unauthorized (401 Unauthorized)

**JavaScript Example**:

\`\`\`javascript
async function getCurrentUser(accessToken) {
  const response = await fetch('https://nestjs-backend-task.vercel.app/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      query: `
        query {
          me {
            id
            email
            biometricKey
            createdAt
            updatedAt
          }
        }
      `
    })
  });

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }
  
  return data.data.me;
}
```

### Get User by ID

Retrieves a user by their ID. This operation requires authentication.

**Operation Type**: Query

**Operation Name**: GetUser

**Input**:

- `id`: ID (required) - ID of the user to retrieve


**Authentication**: Required (JWT token)

**Returns**: User object with id, email, biometricKey, createdAt, and updatedAt fields

**Example Request**:

```plaintext
query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    biometricKey
    createdAt
    updatedAt
  }
}
```

**Variables**:

```json
{
"id": "550e8400-e29b-41d4-a716-446655440000"
}

```plaintext

**Headers**:

```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

```plaintext

**Example Response**:

\`\`\`json
{
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "biometricKey": "user-biometric-key-123",
      "createdAt": "2023-12-15T12:00:00.000Z",
      "updatedAt": "2023-12-15T12:00:00.000Z"
    }
  }
}
```

**Possible Errors**:

- Unauthorized (401 Unauthorized)
- User not found (404 Not Found)


**JavaScript Example**:

```javascript
async function getUserById(userId, accessToken) {
const response = await fetch('https://nestjs-backend-task.vercel.app/graphql', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${accessToken}`
},
body: JSON.stringify({
query: `        query GetUser($id: ID!) {
          user(id: $id) {
            id
            email
            biometricKey
            createdAt
            updatedAt
          }
        }
     `,
variables: {
id: userId
}
})
});

const data = await response.json();

if (data.errors) {
throw new Error(data.errors[0].message);
}

return data.data.user;
}

```plaintext

## Authentication Headers

For authenticated operations, include the JWT token in the HTTP Authorization header:

```

Authorization: Bearer your-jwt-token

```plaintext

The token is obtained from the `accessToken` field in the response of the `register`, `login`, `biometricLogin`, or `setBiometricKey` operations.

## Error Handling

GraphQL errors are returned in the `errors` array of the response. Each error object contains:

- `message`: Error message
- `extensions`: Additional error information
  - `code`: Error code (e.g., "UNAUTHENTICATED", "BAD_USER_INPUT")
  - `response`: HTTP response details
    - `statusCode`: HTTP status code
    - `message`: Detailed error message(s)
    - `error`: Error type

**Example Error Response**:

\`\`\`json
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "response": {
          "statusCode": 401,
          "message": "Unauthorized",
          "error": "Unauthorized"
        }
      }
    }
  ],
  "data": null
}
```

**Common Error Codes**:

- `UNAUTHENTICATED`: Authentication failed (401)
- `BAD_USER_INPUT`: Invalid input data (400)
- `FORBIDDEN`: Permission denied (403)
- `NOT_FOUND`: Resource not found (404)
- `CONFLICT`: Resource conflict (409)
- `INTERNAL_SERVER_ERROR`: Server error (500)


**JavaScript Error Handling Example**:

```javascript
async function graphqlRequest(query, variables = {}, token = null) {
const headers = {
'Content-Type': 'application/json',
};

if (token) {
headers['Authorization'] = `Bearer ${token}`;
}

const response = await fetch('https://nestjs-backend-task.vercel.app/graphql', {
method: 'POST',
headers,
body: JSON.stringify({
query,
variables
})
});

const data = await response.json();

if (data.errors) {
const error = data.errors[0];
const errorCode = error.extensions?.code;
const statusCode = error.extensions?.response?.statusCode;
const errorMessage = error.message;

```plaintext
const customError = new Error(errorMessage);
customError.code = errorCode;
customError.statusCode = statusCode;

throw customError;
```

}

return data.data;
}

// Usage example with try/catch
try {
const result = await graphqlRequest(`    mutation Login($input: LoginInput!) {
      login(input: $input) {
        accessToken
        user {
          id
          email
        }
      }
    }
 `, {
input: {
email: '[user@example.com](mailto:user@example.com)',
password: 'wrong-password'
}
});

console.log('Login successful:', result);
} catch (error) {
console.error(`Login failed: ${error.message}`);
console.error(`Error code: ${error.code}, Status: ${error.statusCode}`);

// Handle specific error types
if (error.code === 'UNAUTHENTICATED') {
console.log('Please check your credentials and try again.');
}
}

```plaintext

## Testing the API

### GraphQL Playground

The GraphQL Playground is available at the GraphQL endpoint when accessing it in a browser:

```

[https://nestjs-backend-task.vercel.app/graphql](https://nestjs-backend-task.vercel.app/graphql)



**Steps to use the Playground**:

1. Open the URL in your browser
2. Write your query or mutation in the left panel
3. Add variables in the bottom left panel
4. For authenticated requests, add the Authorization header in the HTTP HEADERS panel at the bottom:
   \`\`\`json
   {
     "Authorization": "Bearer your-jwt-token"
   }
   \`\`\`
5. Click the "Play" button to execute

### Postman

You can use Postman to test the GraphQL API:

1. Create a new request with the POST method
2. Enter your GraphQL endpoint URL
3. In the Body tab, select "GraphQL"
4. Enter your query or mutation in the "Query" field
5. Add variables in the "Variables" field
6. For authenticated requests, add the Authorization header in the Headers tab
```plain
**Example Postman Collection**:

\`\`\`json
{
  "info": {
    "name": "NestJS GraphQL Auth API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    accessToken\n    user {\n      id\n      email\n      createdAt\n      updatedAt\n    }\n  }\n}",
            "variables": "{\n  \"input\": {\n    \"email\": \"user@example.com\",\n    \"password\": \"password123\"\n  }\n}"
          }
        },
        "url": {
          "raw": "https://nestjs-backend-task.vercel.app/graphql",
          "protocol": "https",
          "host": ["your-vercel-deployment-url"],
          "path": ["graphql"]
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    user {\n      id\n      email\n      biometricKey\n      createdAt\n      updatedAt\n    }\n  }\n}",
            "variables": "{\n  \"input\": {\n    \"email\": \"user@example.com\",\n    \"password\": \"password123\"\n  }\n}"
          }
        },
        "url": {
          "raw": "https://nestjs-backend-task.vercel.app/graphql",
          "protocol": "https",
          "host": ["your-vercel-deployment-url"],
          "path": ["graphql"]
        }
      }
    },
    {
      "name": "Biometric Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation BiometricLogin($input: BiometricLoginInput!) {\n  biometricLogin(input: $input) {\n    accessToken\n    user {\n      id\n      email\n      biometricKey\n      createdAt\n      updatedAt\n    }\n  }\n}",
            "variables": "{\n  \"input\": {\n    \"biometricKey\": \"user-biometric-key-123\"\n  }\n}"
          }
        },
        "url": {
          "raw": "https://nestjs-backend-task.vercel.app/graphql",
          "protocol": "https",
          "host": ["your-vercel-deployment-url"],
          "path": ["graphql"]
        }
      }
    },
    {
      "name": "Set Biometric Key",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{accessToken}}"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "mutation SetBiometricKey($input: SetBiometricKeyInput!) {\n  setBiometricKey(input: $input) {\n    accessToken\n    user {\n      id\n      email\n      biometricKey\n      createdAt\n      updatedAt\n    }\n  }\n}",
            "variables": "{\n  \"input\": {\n    \"biometricKey\": \"new-biometric-key-456\"\n  }\n}"
          }
        },
        "url": {
          "raw": "https://nestjs-backend-task.vercel.app/graphql",
          "protocol": "https",
          "host": ["your-vercel-deployment-url"],
          "path": ["graphql"]
        }
      }
    },
    {
      "name": "Get Current User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{accessToken}}"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query {\n  me {\n    id\n    email\n    biometricKey\n    createdAt\n    updatedAt\n  }\n}"
          }
        },
        "url": {
          "raw": "https://nestjs-backend-task.vercel.app/graphql",
          "protocol": "https",
          "host": ["your-vercel-deployment-url"],
          "path": ["graphql"]
        }
      }
    },
    {
      "name": "Get User by ID",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{accessToken}}"
          }
        ],
        "body": {
          "mode": "graphql",
          "graphql": {
            "query": "query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    email\n    biometricKey\n    createdAt\n    updatedAt\n  }\n}",
            "variables": "{\n  \"id\": \"550e8400-e29b-41d4-a716-446655440000\"\n}"
          }
        },
        "url": {
          "raw": "https://nestjs-backend-task.vercel.app/graphql",
          "protocol": "https",
          "host": ["your-vercel-deployment-url"],
          "path": ["graphql"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "accessToken",
      "value": "your-jwt-token"
    }
  ]
}
```
```
**Setting Up Environment Variables in Postman**:

1. Create a new environment in Postman
2. Add a variable named `accessToken`
3. After successful login or registration, use the "Tests" tab to automatically set the token:


```javascript
const response = pm.response.json();
if (response.data && response.data.login && response.data.login.accessToken) {
pm.environment.set("accessToken", response.data.login.accessToken);
}

```plaintext

### Curl

You can use curl to test the GraphQL API from the command line:

**Register User**:

\`\`\`bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation Register($input: RegisterInput!) { register(input: $input) { accessToken user { id email } } }","variables":{"input":{"email":"user@example.com","password":"password123"}}}' \
  https://nestjs-backend-task.vercel.app/graphql
```

**Login**:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation Login($input: LoginInput!) { login(input: $input) { accessToken user { id email } } }","variables":{"input":{"email":"[user@example.com](mailto:user@example.com)","password":"password123"}}}' [https://nestjs-backend-task.vercel.app/graphql](https://nestjs-backend-task.vercel.app/graphql)

```plaintext

**Biometric Login**:

\`\`\`bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation BiometricLogin($input: BiometricLoginInput!) { biometricLogin(input: $input) { accessToken user { id email biometricKey } } }","variables":{"input":{"biometricKey":"user-biometric-key-123"}}}' \
  https://nestjs-backend-task.vercel.app/graphql
```

**Set Biometric Key (Authenticated)**:

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-jwt-token" -d '{"query":"mutation SetBiometricKey($input: SetBiometricKeyInput!) { setBiometricKey(input: $input) { accessToken user { id email biometricKey } } }","variables":{"input":{"biometricKey":"new-biometric-key-456"}}}' [https://nestjs-backend-task.vercel.app/graphql](https://nestjs-backend-task.vercel.app/graphql)

```plaintext

**Get Current User (Authenticated)**:

\`\`\`bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{"query":"query { me { id email biometricKey createdAt updatedAt } }"}' \
  https://nestjs-backend-task.vercel.app/graphql
```

**Get User by ID (Authenticated)**:

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-jwt-token" -d '{"query":"query GetUser($id: ID!) { user(id: $id) { id email biometricKey createdAt updatedAt } }","variables":{"id":"550e8400-e29b-41d4-a716-446655440000"}}' https://nestjs-backend-task.vercel.app/graphql

```plaintext

### JavaScript Fetch

Complete example of using the API with JavaScript Fetch:

\`\`\`javascript
class AuthAPI {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.token = null;
  }

  async request(query, variables = {}, requiresAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables
      })
    });

    const data = await response.json();

    if (data.errors) {
      const error = new Error(data.errors[0].message);
      error.code = data.errors[0].extensions?.code;
      error.details = data.errors;
      throw error;
    }

    return data.data;
  }

  async register(email, password) {
    const result = await this.request(
      `
        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            accessToken
            user {
              id
              email
              createdAt
              updatedAt
            }
          }
        }
      `,
      {
        input: {
          email,
          password
        }
      }
    );

    this.token = result.register.accessToken;
    return result.register;
  }

  async login(email, password) {
    const result = await this.request(
      `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
      `,
      {
        input: {
          email,
          password
        }
      }
    );

    this.token = result.login.accessToken;
    return result.login;
  }

  async biometricLogin(biometricKey) {
    const result = await this.request(
      `
        mutation BiometricLogin($input: BiometricLoginInput!) {
          biometricLogin(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
      `,
      {
        input: {
          biometricKey
        }
      }
    );

    this.token = result.biometricLogin.accessToken;
    return result.biometricLogin;
  }

  async setBiometricKey(biometricKey) {
    const result = await this.request(
      `
        mutation SetBiometricKey($input: SetBiometricKeyInput!) {
          setBiometricKey(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
      `,
      {
        input: {
          biometricKey
        }
      },
      true
    );

    this.token = result.setBiometricKey.accessToken;
    return result.setBiometricKey;
  }

  async getCurrentUser() {
    return this.request(
      `
        query {
          me {
            id
            email
            biometricKey
            createdAt
            updatedAt
          }
        }
      `,
      {},
      true
    ).then(data => data.me);
  }

  async getUserById(id) {
    return this.request(
      `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            email
            biometricKey
            createdAt
            updatedAt
          }
        }
      `,
      { id },
      true
    ).then(data => data.user);
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  logout() {
    this.token = null;
  }
}

// Usage example
async function main() {
  const api = new AuthAPI('https://nestjs-backend-task.vercel.app/graphql');

  try {
    // Register a new user
    const registerResult = await api.register('newuser@example.com', 'password123');
    console.log('Registration successful:', registerResult);

    // Login with credentials
    const loginResult = await api.login('newuser@example.com', 'password123');
    console.log('Login successful:', loginResult);

    // Set biometric key
    const biometricKey = 'user-biometric-key-' + Math.random().toString(36).substring(2);
    const biometricResult = await api.setBiometricKey(biometricKey);
    console.log('Biometric key set:', biometricResult);

    // Get current user
    const currentUser = await api.getCurrentUser();
    console.log('Current user:', currentUser);

    // Logout
    api.logout();
    console.log('Logged out');

    // Login with biometric key
    const biometricLoginResult = await api.biometricLogin(biometricKey);
    console.log('Biometric login successful:', biometricLoginResult);

  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error details:', error.details);
  }
}

main();
```

### Axios

Example using Axios:

```javascript
const axios = require('axios');

class GraphQLClient {
constructor(url) {
this.url = url;
this.token = null;
}

setToken(token) {
this.token = token;
}

getToken() {
return this.token;
}

logout() {
this.token = null;
}

async request(query, variables = {}, requiresAuth = false) {
const headers = {
'Content-Type': 'application/json',
};

```plaintext
if (requiresAuth && this.token) {
  headers['Authorization'] = `Bearer ${this.token}`;
}

try {
  const response = await axios({
    url: this.url,
    method: 'POST',
    headers,
    data: {
      query,
      variables
    }
  });

  if (response.data.errors) {
    const error = new Error(response.data.errors[0].message);
    error.code = response.data.errors[0].extensions?.code;
    error.details = response.data.errors;
    throw error;
  }

  return response.data.data;
} catch (error) {
  if (error.response) {
    throw new Error(`GraphQL request failed: ${error.response.data.errors[0].message}`);
  }
  throw error;
}
```

}

async register(email, password) {
const result = await this.request(
`        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            accessToken
            user {
              id
              email
              createdAt
              updatedAt
            }
          }
        }
     `,
{
input: {
email,
password
}
}
);

```plaintext
this.token = result.register.accessToken;
return result.register;
```

}

async login(email, password) {
const result = await this.request(
`        mutation Login($input: LoginInput!) {
          login(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
     `,
{
input: {
email,
password
}
}
);

```plaintext
this.token = result.login.accessToken;
return result.login;
```

}

async biometricLogin(biometricKey) {
const result = await this.request(
`        mutation BiometricLogin($input: BiometricLoginInput!) {
          biometricLogin(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
     `,
{
input: {
biometricKey
}
}
);

```plaintext
this.token = result.biometricLogin.accessToken;
return result.biometricLogin;
```

}

async setBiometricKey(biometricKey) {
const result = await this.request(
`        mutation SetBiometricKey($input: SetBiometricKeyInput!) {
          setBiometricKey(input: $input) {
            accessToken
            user {
              id
              email
              biometricKey
              createdAt
              updatedAt
            }
          }
        }
     `,
{
input: {
biometricKey
}
},
true
);

```plaintext
this.token = result.setBiometricKey.accessToken;
return result.setBiometricKey;
```

}

async getCurrentUser() {
return this.request(
`        query {
          me {
            id
            email
            biometricKey
            createdAt
            updatedAt
          }
        }
     `,
{},
true
).then(data => data.me);
}

async getUserById(id) {
return this.request(
`        query GetUser($id: ID!) {
          user(id: $id) {
            id
            email
            biometricKey
            createdAt
            updatedAt
          }
        }
     `,
{ id },
true
).then(data => data.user);
}
}

// Usage example
async function main() {
const client = new GraphQLClient('[https://nestjs-backend-task.vercel.app/graphql](https://nestjs-backend-task.vercel.app/graphql)');

try {
// Register
const registerResult = await client.register('[user@example.com](mailto:user@example.com)', 'password123');
console.log('Register result:', registerResult);

```plaintext
// Login
const loginResult = await client.login('user@example.com', 'password123');
console.log('Login result:', loginResult);

// Get current user
const user = await client.getCurrentUser();
console.log('Current user:', user);

// Set biometric key
const biometricKey = 'user-biometric-key-' + Math.random().toString(36).substring(2);
const biometricResult = await client.setBiometricKey(biometricKey);
console.log('Biometric key set:', biometricResult);

// Logout
client.logout();
console.log('Logged out');

// Login with biometric key
const biometricLoginResult = await client.biometricLogin(biometricKey);
console.log('Biometric login successful:', biometricLoginResult);

// Get user by ID
const otherUser = await client.getUserById(user.id);
console.log('User by ID:', otherUser);
```

} catch (error) {
console.error('Error:', error.message);
}
}

main();

```plaintext

## Best Practices

### 1. Token Management

- Store the JWT token securely (e.g., in HttpOnly cookies or secure storage)
- Implement token refresh mechanisms for long-lived sessions
- Clear tokens on logout

### 2. Error Handling

- Implement proper error handling for all GraphQL operations
- Display user-friendly error messages
- Log detailed errors on the client side for debugging

### 3. Security

- Use HTTPS for all API requests
- Implement rate limiting to prevent brute force attacks
- Validate all user inputs on both client and server sides

### 4. Performance

- Request only the fields you need in your GraphQL queries
- Implement caching for frequently accessed data
- Use connection pooling for database connections

## Troubleshooting

### Common Issues and Solutions

1. **Authentication Errors**:
   - Check if the token is correctly formatted in the Authorization header
   - Verify the token hasn't expired
   - Ensure the token is being sent with the correct prefix (`Bearer `)

2. **CORS Issues**:
   - If you're getting CORS errors, ensure your server has CORS properly configured
   - Check that the Origin header is being sent correctly

3. **Network Errors**:
   - Verify the API endpoint URL is correct
   - Check your network connection
   - Ensure your firewall isn't blocking the requests

4. **GraphQL Validation Errors**:
   - Double-check your query syntax
   - Verify field names and types match the schema
   - Ensure all required variables are provided

5. **Server Errors**:
   - Check the server logs for detailed error information
   - Verify the database connection is working
   - Ensure all required environment variables are set

### Getting Help

If you encounter issues not covered in this documentation:

1. Check the server logs for detailed error messages
2. Review the GraphQL schema for correct field names and types
3. Test the API using the GraphQL Playground to isolate the issue
4. Contact the API administrator for assistance
</CodeProject>

```
