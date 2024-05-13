## Description

Right now, it is a CRUD operation boilerplate using nestjs and mongodb. Will add more feature here time to time.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Feature

- CRUD APIs
- Data validation and sanitization using DTO
- All error exception handle with a common filter and common error response format
- Common success response format using an interceptor
- Cursor based pagination