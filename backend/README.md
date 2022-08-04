# Running The App Locally

The development environment uses Docker to run the express api and database instances. To start these backend services locally use the following commands.

Using Docker:

To build the docker image

```
docker-compose build
```

To run the container

```
docker-compose up -d
```

To inspect running docker console output

```
docker logs -f <CONTAINER>
```

To see any running containers

```
docker ps -a
```

# Development Progress

1. Setup project directory with git and npm.
2. Install typescript globally and setup ts config file.
3. Setup es lint with the standard style.
4. Update package.json with some commands to build and run express server.
5. Add nodemon, ts-node configured by nodemon json to rebuild on project changes.
6. Dockerize backend server app.
    Use volume mapping to automatically rebuild app using nodemon.
    Docker could not find nodemon in container as it was installed globally, added nodemon as a dev dependency to solve this (could also have used preinstal script).

# References

[Configuring nodemon with TypeScript](https://blog.logrocket.com/configuring-nodemon-with-typescript/)

[How To Set Up a Node Project With Typescript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript#step-5-updating-the-package-json-file)

[Let’s Dockerize a Nodejs Express API](https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4)

# Development Notes

- Unit testing as api is being build.
- Best practice for volume mounting.
- Docker compose dev and prod environments.
- Handling env variables.
- Using a rest api documentation tool.
- Api versioning system.
