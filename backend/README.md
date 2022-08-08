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

## References

[Configuring nodemon with TypeScript](https://blog.logrocket.com/configuring-nodemon-with-typescript/)

[How To Set Up a Node Project With Typescript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript#step-5-updating-the-package-json-file)

[Let’s Dockerize a Nodejs Express API](https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4)

[Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)

[Debugging Node.js + Typescript Running inside Docker Containers with Hot Reload](https://www.youtube.com/watch?v=1WUoITRINf0)

[How to Speed up Docker Development! 🐳 Hot Reloading, Debuggers, and More!](https://www.youtube.com/watch?v=5JQlFK6MdVQ)

## Development Notes

- Unit testing as api is being build.
- Best practice for volume mounting.
- Docker compose dev and prod environments.
- Handling env variables.
- Using a rest api documentation tool.
- Api versioning system.
