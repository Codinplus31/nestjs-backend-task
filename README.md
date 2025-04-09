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

**Variables**:

```json
{
"input": {
"email": "[user@example.com](mailto:user@example.com)",
"password": "password123"
}
}
