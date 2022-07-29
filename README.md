# e-commerce-backend-system

## Links

-   https://github.com/psimanta/e-commerce-node
-   https://github.com/psimanta/e-commerce-react

## To run the application (for developers)

You have to need two software:

-   node.js
-   MongoDB

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

## Requirements

```
-> user 
    # _id (automated)
    # name 
    # email
    # password (_.omit[object, ["password"]])
    # role -> admin, user

    # generate JWT
    # validation with JOI

model("User", schema)


-> profile 
    # user -> 
    {
        type: Schema.Types.ObjectId,
        unique: true,
        require: true,
        ref: "User"
    }
    # phone
    # address1
    # address2
    # city
    # country
    # photo


-> category 
    # name

-> product
    # name
    # description
    # price
    # catgory 
    {
        ref: 'Category'
    }
    # quantity
    # photo: 
    {
       data: Buffer,
       contentType: String,
    }

-> cartItem
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    price: Number,
    count: {
    
    }
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
```