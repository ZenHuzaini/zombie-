<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation Locally

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tech Used

- NodeJS with NestJS framework
- Typeorm
- Mongodb Atlas
- Graphql

## Important link

This app is deployed on Heroku

- Heroku - [Zombie Task](https://dashboard.heroku.com/apps/zombie-task-software-house/deploy/heroku-git)
- GraphQL Playgrund - [Zombie Task GraphQL Playgrund](https://zombie-task-software-house.herokuapp.com/api/graphql)
- Github - [Zombie](https://github.com/ZenHuzaini/zombie-)

---

## Completed User stories:

- [x] I want to display details about selected zombie (name and creation date);
- [x] I want to display items that this zombie has;
- [x] I want to see total value of zombie’s items in 3 currencies, PLN/EU/USD;
- [x] I want to add and remove items from the zombie;
- [x] I want to see a list of zombies (create/update/remove them also);
- [x] The zombie can have a maximum of 5 items.
- [x] We use an external item exchange for our zombie (we pay for every request), the prices of items on the exchange are updated daily at 00:00 UTC and are in Polish zlotys. https://zombie-items-api.herokuapp.com/api/items
      --- I implemented a scehduler service, when http://api.nbp.pl/api/exchangerates/tables/C/today/ changes every night
- [x] We use the NBP API to download daily exchange rates http://api.nbp.pl/api/exchangerates/tables/C/today/
- [x] Please take the RESTful approach or GraphQL - whatever you feel more comfortable with.
      --- Graphql
- [x] Nice to have: app placed on the hosting (heroku/zeit or anything else) or dockerized.
- [ ] Do as much as you are able to (zombies CRUD and tests are a must) - in case of lack of time, please create a .txt file and describe what you were planning to do. Please mention the tools that you would use and as many implementation details as you can. (I ran out if time to create the tests)

- [ ] more error handling
- [ ] extend user list item identifier
- [ ] with user authentication
- [ ] migration

### GRAPHQL Examples

## Get All Zombies with item and it's total price

```bash
{
  zombies(pagination:{startIndex:0, itemCount: 10}){
    count
    records{
      _id
      name,
      gender,
      items{
        _id
        name
        price
      }
      totalItemPrice{
        PLN
        EU
        USD
      }
    }
  }
}
```

## Create Zombies

```bash
mutation{
  createZombie(zombie:{
    name: "Test",
    gender: "Female",
    ageCategory: "Kid",
  }){
    name
    gender
    ageCategory
  }
}
```

## Get Zombie By Id

```bash
{
  zombie(id: "627c42d5a30976813f7e0dcf"){
    name,
    gender,
    ageCategory
  }
}
```

## Delete Zombie By Id

```bash
mutation{
  deleteZombie(id: "627c435508c0597f21a35d5b"){
    _id
  }
}
```

## Update Zombie

```bash
mutation{
  updateZombie(id: "627c42d5a30976813f7e0dcf", zombie:{
    name: "z",
    gender: "Male"
  }){
    name,
    gender,
    ageCategory
  }
}
```

## All Items

```bash
{
  items(pagination:{startIndex:0, itemCount: 10}){
    count
    records{
      name,
      price,
      zombieId,
      _id
    }
  }
}
```

## All Item

```bash
{
  items(pagination:{startIndex:0, itemCount: 10}){
    count
    records{
      name,
      price,
      zombieId,
      _id
    }
  }
}
```

## Create Item

this Query will create a new item (Not buying from the external API))

```bash
{
  items(pagination:{startIndex:0, itemCount: 10}){
    count
    records{
      name,
      price,
      zombieId,
      _id
    }
  }
}
```

## Show External Item

```bash
{
  externalItems{
    count
    records{
      name
      price
      id
      zombieId
    }
  }
}
```

## Show External Item

```bash
{
  externalItems{
    count
    records{
      name
      price
      id
      zombieId
    }
  }
}
```

## Buy External Item

```bash
mutation{
  buyExternalItem(zombieId: "627c42d5a30976813f7e0dcf", itemId: 1){
    zombieId
    name
    price
    _id
  }
}
```

## Delete Zombie Item

```bash
mutation{
  deleteZombieItem(zombieId: "627c42d5a30976813f7e0dcf", itemId:"627cc6fcbc4e3beb2fc698bf" ){
    _id
  }
}
```
