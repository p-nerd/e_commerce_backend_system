# e-commerce-backend-system

<!-- ## Links

- https://github.com/psimanta/e-commerce-node
- https://github.com/psimanta/e-commerce-react -->

## To run the application (for developers)

You have to need two software:

- node.js
- MongoDB

if you had not installed it. please install it first

step #1: Clone the repo and go inside the project

```sh
$ git clone https://github.com/shihab4t/e-commerce-backend-system.git
$ cd e-commerce-backend-system
```

step #2: Copy the `.env.example` to `.env` file and make your changes

```sh
$ cp .env.example .env
```

step #3: Install dependencies

```sh
$ npm install -g yarn
$ yarn install
```

step #4: now you can run the server in development mode

```sh
$ yarn start:watch
```

# To testing the application

step #2: Install dependencies

```sh
$ npm install -g yarn
$ yarn install
```

step #2: run the test

```sh
$ yarn test
```

or run the test in watch mode

```sh
$ yarn test:watch
```
