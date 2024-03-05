# Cupcake API 1.0.0
### Submission by Logan Rado for 8Flow.ai on 3/4/24

This is Logan Rado's submission of the takehome technical project. This Readme contains the following items:

- Quickstart
- Dependencies
- Testing
- Future Steps

## Quickstart

- Make sure docker is running
- Start a MongoDB container:
```sh
export MONGODB_VERSION=6.0-ubi8
docker run --name mongodb-cupcakeapi -d -p 27017:27017 mongodb/mongodb-community-server:$MONGODB_VERSION
```
- Install dependencies via `npm i`
- Run the seed script via `npm run seed`
- Start the server via `npm start`
- The server will be available at http://localhost:3456


## Dependencies

This project uses a number of open source projects to work properly:

- [Node.js] - evented I/O for the backend
- [Express] - fast Node.js network app framework
- [Mongoose] - third party ORM for MongoDB
- [Mongo Seeding] - popular npm module for populating MongoDB database
- [body-parser] - Node.js body parsing middleware
- [jest] - popular JS testing framework
- [ts-jest] -  TypeScript preprocessor that lets you use Jest
- [supertest] - superagent-driven library for testing Node.js HTTP servers
- [ts-node-dev] - compiles and restarts TypeScript app when files change


## Testing

Tests live in the `tests` directory

Run tests using

```sh
npm test
```

## Future Steps

This project was done in a timebox, and thus there are TODOs and future steps.

- Confirm specs to ensure endpoint responses are correct
- Deploy to an API Gateway so that the API can be accessed
    - Preferably hosted on Swagger
- Support HTTP and HTTPS per OpenAPI spec
- Shared MongoDB using a tool like MongoDB Atlas
- Better seeding fake data with Faker
- Throttling, rate limiting, and retries
- Unit tests
