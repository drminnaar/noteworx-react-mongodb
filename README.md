# NoteWorx README

A basic note application that uses a [ReactJS] frontend to capture and manage notes, an api written in [ExpressJS], and [MongoDB] to store notes.

## Features

* Add a note
* Edit a note
* Remove a note
* List all notes
* Find note by title

## High Level Design

![noteworx-react-mongodb](https://user-images.githubusercontent.com/33935506/33653545-0f6d5828-da76-11e7-8a3c-a72bc732ad4f.PNG)

## Screenshots

![noteworx-react-mongodb-1](https://user-images.githubusercontent.com/33935506/33796539-bed2352e-dcfe-11e7-8392-d1b621af3258.PNG)

![noteworx-react-mongodb-2](https://user-images.githubusercontent.com/33935506/33796540-bf33cd7a-dcfe-11e7-9074-38e9e9be28ed.PNG)

![noteworx-react-mongodb-3](https://user-images.githubusercontent.com/33935506/33796541-bf65a804-dcfe-11e7-86cb-62948ac5c890.PNG)

![noteworx-react-mongodb-4](https://user-images.githubusercontent.com/33935506/33796542-bf9bbcfa-dcfe-11e7-8be5-bb23f3521edb.PNG)

![noteworx-react-mongodb-5](https://user-images.githubusercontent.com/33935506/33796543-bfcff36c-dcfe-11e7-94b4-9e3ebcfe49ad.PNG)

![noteworx-react-mongodb-6](https://user-images.githubusercontent.com/33935506/33796544-c0036a3a-dcfe-11e7-9775-f9dadfb2b9d1.PNG)

---

## Developed With

* [NodeJS] - Javascript runtime
* [MongoDB] - NoSQL database
* [Docker] - Used to host MongoDB instance (Not manadatory. See other options below)
* [ExpressJS] - A web application framework for Node.js
* [ReactJS] - Javascript library for building user interfaces
* [Bootstrap v4.0.0-beta.2] - Build responsive, mobile-first projects
* [Webpack] - Javascript module bundler

---

## Related Projects

* [noteworx-cli-fs]

  A basic note application that uses a CLI (Command Line Interface) frontend to capture and manage notes, and a file system to store notes

* [noteworx-cli-mongodb]

  A basic note application that uses a CLI (Command Line Interface) frontend to capture and manage notes, and mongodb to store notes

* [noteworx-cli-mongoose]

  A basic note application that uses a CLI (Command Line Interface) frontend to capture and manage notes, Mongoose ODM to manage MongoDB interaction, and mongodb to store notes 

* [noteworx-cli-couchbase]

  A basic note application that uses a CLI (Command Line Interface) frontend to capture and manage notes, and couchbase as a data store

* [noteworx-cli-express-mongodb]

  A basic note application that uses a CLI (Command Line Interface) frontend to capture and manage notes, an express note management API built using Express, and Mongodb to store notes 

* [noteworx-expressui-mongodb]

  A basic note application that uses an Express frontend to capture and manage notes, and mongodb to store notes 

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The following software is required to be installed on your system:

* NodeJS

  The following version of Node and Npm are required:

  * Node 8.x
  * Npm 3.x

  Type the following commands in the terminal to verify your node and npm versions

  ```bash
  node -v
  npm -v
  ```

* MongoDB

  MongoDB 3.x is required

  Type the following command to verify that MongoDB is running on your local machine

  ```bash
  mongo -version
  ```

  See alternative MongoDB options below

### MongoDB Setup

A running instance of MongoDB is required. Alternatively use a hosted MongoDB from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [MLab](https://mlab.com/)

One of the 3 options below is recommended to get up and running with MongoDB:

* Install and host locally
* Install and host in Docker
* Register for third party MongoDB hosting
  * Register for and use MongoDB Atlas (Database As A Service)
  * Register for and use MLab (Database As A Service)

#### Install and Host MongoDB Locally

Installing MongoDB is relatively straight forward. There are currently 3 platform (Windows, Linux, OSX) releases available and can be found here

For more specific installation instructions, please see the following links:

* [Install MongoDB On Linux](https://docs.mongodb.com/v3.0/administration/install-on-linux/)

* [Install MongoDB On Windows](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-windows/)

* [Install MongoDB On OSX](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/)

#### Install And Host Using Docker

##### Run MongoDB Using Named Volume

To run a new MongoDB container, execute the following command from the CLI:

```docker
docker run --rm --name mongo-dev -p 127.0.0.1:27017:27017 -v mongo-dev-db:/data/db -d mongo
```

CLI Command | Description
--- | ---
--rm | remove container when stopped
--name mongo-dev | give container a custom name
-p | map host port to container port
-v mongo-dev-db/data/db | map the container volume 'data/db' to a custom name 'mongo-dev-db'
-d mongo | run mongo container as a daemon in the background

##### Run MongoDB Using Bind Mount

```bash
cd
mkdir -p mongodb/data/db
docker run --rm --name mongo-dev -p 127.0.0.1:27017:27017 -v ~/mongodb/data/db:/data/db -d mongo
```

CLI Command | Description
--- | ---
--rm | remove container when stopped
--name mongo-dev | give container a custom name
-p | map host port to container port
-v ~/mongodb/data/db/data/db | map the container volume 'data/db' to a bind mount '~/mongodb/data/db'
-d mongo | run mongo container as a daemon in the background

#### Third Party Hosting

##### MongoDB Atlas

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is basically a database as a service and is hosted in the cloud. That means that you don't need to install or setup anything to start using MongoDB.

You can get started for free by registering [here](https://www.mongodb.com/cloud/atlas). The free tier entitles you to 512MB storage.

Please review the documentation [here](https://docs.atlas.mongodb.com/)

##### MLab

[MLab](https://mlab.com/) also provides MongoDB cloud hosting in the form of database as a service. Once again there is no installation or setup required.

To get started, signup for free account [here](https://mlab.com/signup/). The free tier entitles you to 500MB storage.

Please review the documentation [here](https://docs.mlab.com/)

### Install

Follow the following steps to get development environment running.

1. Clone 'noteworx-react-mongodb' repository from GitHub

   ```bash
   git clone https://github.com/drminnaar/noteworx-react-mongodb.git
   ```

   _or using ssh_

   ```bash
   git clone git@github.com:drminnaar/noteworx-react-mongodb.git
   ```

1. Install node modules

   ```bash
   cd noteworx-react-mongodb
   npm install
   ```

### Build

There are 2 build options:

* Build

  ```javascript
  npm run build
  ```

* Build with watch enabled

  ```javascript
  npm run build:watch
  ```

### Run ESlint

* Lint project using ESLint

  ```bash
  npm run lint
  ```

* Lint project using ESLint, and autofix

  ```bash
  npm run lint:fix
  ```

### Run API Server

All the API (server) code is found in the *'Server'* folder.

Before running the React application, the API needs to be started.

The following command wil start server and host api at http://localhost:8000/api

```javascript
npm run serve:api
```

### Run React App

* Run Dev Server

  Start React usinf React dev server

  ```javascript
  npm run serve:dev
  ```

---

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/drminnaar/noteworx-react-mongodb/tags).

## Authors

* **Douglas Minnaar** - *Initial work* - [drminnaar](https://github.com/drminnaar)

[NodeJS]: https://nodejs.org
[MongoDB]: https://www.mongodb.com
[ExpressJS]: http://expressjs.com
[Docker]: https://www.docker.com
[ReactJS]: http://reactjs.org
[Bootstrap v4.0.0-beta.2]: https://getbootstrap.com
[Webpack]: https://webpack.js.org

[noteworx-cli-fs]: https://github.com/drminnaar/noteworx-cli-fs
[noteworx-cli-mongodb]: https://github.com/drminnaar/noteworx-cli-mongodb
[noteworx-cli-mongoose]: https://github.com/drminnaar/noteworx-cli-mongoose
[noteworx-cli-couchbase]: https://github.com/drminnaar/noteworx-cli-couchbase
[noteworx-cli-express-mongodb]: https://github.com/drminnaar/noteworx-cli-express-mongodb
[noteworx-expressui-mongodb]: https://github.com/drminnaar/noteworx-expressui-mongodb