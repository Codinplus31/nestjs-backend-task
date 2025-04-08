# GraphQL API Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [API Endpoint](#api-endpoint)
3. [Authentication Flow](#authentication-flow)
4. [GraphQL Operations](#graphql-operations)
   - [User Registration](#user-registration)
   - [Standard Login](#standard-login)
   - [Biometric Login](#biometric-login)
   - [Set Biometric Key](#set-biometric-key)
   - [Get Current User](#get-current-user)
   - [Get User by ID](#get-user-by-id)
5. [Authentication Headers](#authentication-headers)
6. [Error Handling](#error-handling)
7. [Testing the API](#testing-the-api)
   - [GraphQL Playground](#graphql-playground)
   - [Postman](#postman)
   - [Curl](#curl)
   - [JavaScript Fetch](#javascript-fetch)
   - [Axios](#axios)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Introduction

This documentation provides a comprehensive guide to using the GraphQL API for user authentication and management. The API supports:

- User registration with email and password
- Standard login with email and password
- Biometric authentication
- JWT-based authentication for protected resources
- User profile management

## API Endpoint

The GraphQL API is accessible at a single endpoint:

\`\`\`
https://your-vercel-deployment-url/graphql
\`\`\`

When running locally, it's available at:

\`\`\`
http://localhost:3000/graphql
\`\`\`

## Authentication Flow

The typical authentication flow is as follows:

1. **Registration**: Create a new user account with email and password
2. **Login**: Authenticate with email and password to receive a JWT token
3. **Set Biometric Key** (Optional): Add a biometric key for future biometric authentication
4. **Biometric Login** (Optional): Authenticate using the biometric key
5. **Access Protected Resources**: Use the JWT token to access protected resources

## GraphQL Operations

### User Registration

Registers a new user with email and password.

**Operation Type**: Mutation

**Operation Name**: Register

**Input**:
- `email`: String (required) - User's email address
- `password`: String (required) - User's password (min 6 characters)

**Returns**:
- `accessToken`: String - JWT token for authentication
- `user`: User object with id, email, createdAt, and updatedAt fields

**Example Request**:

```graphql
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
