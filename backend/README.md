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

## Testing Strategy

### Unit Testing

Testing a single function, perform a test on the function itself and mock any of its' dependencies.

Test the following for unit tests

1. Returns the expected value.
2. Throws exception and handle errors with grace.
3. Monitor for changes in system state.
4. Invoking another function.

### Integration Testing

Testing multipiple components and modules through various layers of a system. Testing endpoint calls, services, db layer etc.

Test the following for integration tests

1. Component dependency.
2. Test individual units as a group.
3. The HTTP status code.
4. The response payload (JSON).
5. The HTTP response headers.
6. The media type.
7. Performance and response time.

### End-to-end Testing

Testsing processes through a system from begining to end. Test the system meets the business requirements of the project.

## Patterns

A list of what patterns and how they are used within this project.

TDD
Singleton
Open/Close (SOLID)

## References

[Configuring nodemon with TypeScript](https://blog.logrocket.com/configuring-nodemon-with-typescript/)

[How To Set Up a Node Project With Typescript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript#step-5-updating-the-package-json-file)

[Let’s Dockerize a Nodejs Express API](https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4)

[Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)

[Debugging Node.js + Typescript Running inside Docker Containers with Hot Reload](https://www.youtube.com/watch?v=1WUoITRINf0)

[How to Speed up Docker Development! 🐳 Hot Reloading, Debuggers, and More!](https://www.youtube.com/watch?v=5JQlFK6MdVQ)

[Unit Test a REST API? Everything You Need to Know](https://www.testim.io/blog/unit-test-rest-api/)

[Unit Testing Essentials for Express API: A Step-by-Step Guide](https://rrawat.com/blog/unit-test-express-api)

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
