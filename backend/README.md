# Features

- NodeJS Express RESTful API written in TypeScript.
- Dockerized development environment using docker compose.
  - Server and MongoDb containers.
- Automated testing with vitest.
- Testing endpoints with postman.
- Adhearing to the OpenAPI v3 spec.

- Generated swagger API documentation.
- Generated code documentation.

Patterns

- SOLID Principles.
- MVC style architecture.
- Separation of concerns.

# Motivation

# TODO

# Running The App Locally

The development environment uses Docker to run the express api and database instances. To start these backend services locally use the following commands.

Using Docker:

To build the docker image

```bash
docker-compose build
```

To run the container

```bash
docker-compose up -d
```

To inspect running docker console output

```bash
docker logs -f <CONTAINER>
```

To see any running containers

```bash
docker ps -a
```

To access the shell of a running docker container

```bash
docker exec -it <container-name> <shell>

docker exec -it mongodb bash
```

To sign in as authorised mongodb user inside docker shell

```bash
# Username and password defined in .env file
mongosh -u <> -p <>
```

To inspect mongodb logs

```bash
docker logs mongodb
```

## Development Progress

1. Setup project directory with git and npm.
2. Install typescript globally and setup ts config file.
3. Setup es lint with the standard style.
4. Update package.json with some commands to build and run express server.
5. Add nodemon, ts-node configured by nodemon json to rebuild on project changes.
6. Dockerize backend server app.
   Use volume mapping to automatically rebuild app using nodemon (hot reloading).
   Docker could not find nodemon in container as it was installed globally, added nodemon as a dev dependency to solve this (could also have used preinstall script).
7. Setup prettier with eslint to lint files on save.
8. Added debugger to docker container app with `---inspect` flag. Add the `debugger;` breakpoint in code and navigate to `chrome://inspect/#devices` for debugging tools.
9. Decided to use `vitest` as the testing framework for this project because it natively supports TS, supports Jest as a fallback option.
   9.1 Create project structure for test suite.
   9.2 Research and document the types of unit tests to conduct on a RESTful API.
10. Add mongodb as the local database within a docker container.
    10.1 Use `.env` to hide sensitive information and pass it into the `docker-compose.yaml` file.
    10.2 mongodb will not create an empty db to begin with, read more about initializing a fresh instance [here](https://hub.docker.com/_/mongo) to create a setup process for db.
    10.3 Added mongo-express as web interface for mongodb.
    10.4 Load env variables into express server, install node and express types as dev dependencies.
11. Add logging to the api by installing `morgan` and `rotating-file-stream` to write log outputs.
    11.1 Create router structure.
    11.2 Adopt the middleware error handling strategy with try catch with routes.
    11.3 Version control the API by adding an api version variable to `.env` and appending it to the beginning of the api router path.
    11.4 Create CRUD operations for workout controller and pass those functions to the workout router. Originally planned to have router contain the business logic in order to reduce the number of files but decided against this and created a controller service layer containing all the core logic.
    11.5 Tested the server using `http` requests which can be found in `./tests/http`.
12. Noticed an issue when trying to connect to mongodb where the environment variables do not load in. As a temporary fix the dotenv package will also be loaded into mongodb config. Here are some possibilities on how to fix this.
    12.1 Require the dotenv config via the cli on sever startup.
    12.2 Modularise the express app config and server creation such that the express app can be exported and dependency injected into the test suite.
    12.3 Use mock and spy test setups to fake the interaction with api.
13. Begin writing tests for the workout writer and its CRUD operations. Discovered that express routers and mongoose middleware cannot be unit tested. Those kinds of tests are integration tests that require an external library like `supertest` or nodes internal `fetch` library to make http requests. These integration tests can be mocked or tested against a live server.
    13.1 Mocker Server: Reading the `vitest` docs they suggest testing a rest api using `MSW (Mock Service Worker)` to mock HTTP requests. This setup does not require any code changes to the server, just some setup in the form of creating a mock server that takes in an array of request and response handlers. Register HTTP actions in the `test/mocks/handlers.ts` file to create mock requests and responses for specific url endpoints. When you make a HTTP request from within the test the service worker will intercept the incoming request and respond with the defined `handler`.
    13.2 Live Server: Make HTTP requests against the live server pushing data into and reading from a test db. To achieve this the db config will need to be refactored to accept parameters to change the connected db name and running environment context. Would also require some mongodb setup scripts to install a fresh testdb with no data. Can create a fixtures files that had some test data than can be imported on db setup and deleted on shutdown.
    13.3 Test the schema validation of a model.
    13.4 A combination of these tests should be implemented to test the robustness of the server as well some smoke tests that can be ran against a hosted cloud environment.
14. Used create react app to begin the frontend project with typescript. Could have gone with a full monorepo approach where the backend and frontend live in the same directory and share the same models definitions.
    14.1 Need a way to share the backend models with the frontend and decided to use Swagger/Open ai to generate a client interface for the frontend. Plan to keep the backend the source of truth and the client dumb.
15. Create user model, interface, routes and controller.
    15.1 Created the user model and interface. Will need to refactor the model later for strongly typed nested document models, read more [here](https://mongoosejs.com/docs/typescript/subdocuments.html). Read [this](https://mongoosejs.com/docs/typescript/schemas.html#arrays) when defining a interface or schema for an array file of a sub document type.
    15.2 Read further into `HydratedDocument` in mongoose. Might need to change the return types of documents from MongoDB for TS to infer Mongoose specific features.

## Testing Strategy

### Unit Testing

Testing a single function, perform a test on the function itself and mock any of its' dependencies.

Test the following for unit tests

1. Returns the expected value.
2. Throws exception and handle errors with grace.
3. Monitor for changes in system state.
4. Invoking another function.

### Integration Testing

Testing multiple components and modules through various layers of a system. Testing endpoint calls, services, db layer etc.

Test the following for integration tests

1. Component dependency.
2. Test individual units as a group.
3. The HTTP status code.
4. The response payload (JSON).
5. The HTTP response headers.
6. The media type.
7. Performance and response time.

### End-to-end Testing

Testing processes through a system from beginning to end. Test the system meets the business requirements of the project.

## Patterns

A list of what patterns and how they are used within this project.

TDD
Singleton
Open/Close (SOLID)
Asynchronous try catch error handling as middleware

## References

[Configuring nodemon with TypeScript](https://blog.logrocket.com/configuring-nodemon-with-typescript/)

[How To Set Up a Node Project With Typescript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript#step-5-updating-the-package-json-file)

[Let’s Dockerize a Nodejs Express API](https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4)

[Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)

[Debugging Node.js + Typescript Running inside Docker Containers with Hot Reload](https://www.youtube.com/watch?v=1WUoITRINf0)

[How to Speed up Docker Development! 🐳 Hot Reloading, Debuggers, and More!](https://www.youtube.com/watch?v=5JQlFK6MdVQ)

[Unit Test a REST API? Everything You Need to Know](https://www.testim.io/blog/unit-test-rest-api/)

[Unit Testing Essentials for Express API: A Step-by-Step Guide](https://rrawat.com/blog/unit-test-express-api)

[Service Worker Examples](https://github.com/mswjs/msw/tree/main/test/rest-api)

## Development Notes and TODOs

A list of notes and potential features to keep track for this project.

- TDD: Unit testing as api is being build.
- Best practice for volume mounting.
- Docker compose dev and prod environments.
- Handling env variables for different envs such as dev, test, prod.
- Using a rest api documentation tool.
- Api versioning system.
- Investigate an ORM for mongodb.
- Add db config file as a singleton for dev and test.
- Test DB env and scaffolding, generating data for robust testing of db functions.
- Using docker to manage and run the test.
- Validation on data inputs (Joi)
- db schema validation
- Reading [this](https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial) documents how to use mongodb with TS. It makes an argument as to why you don't need to use mongoose any more and how to validate your schema at the DB level.

TODO

A possible solution to this is to write the schema and models in mongoose TS.
Export the validation to the db conn and register the schema validation there.

1. create the default db on mongo init
2. create a user with the correct roles and permissions
3. update the mongo connection string
