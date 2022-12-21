# node simple database

> A simple file-based database for node.

<br />

## About

### A simple file based database that uses JSON to store the data or optionally write it as raw data.

<br />

## Install

```sh
$ npm install node-simple-database
```

<br />

## Example

```js
const simpleDatabase = require('node-simple-database');
(async () => {
    await simpleDatabase.newDB('db');
    const db = new simpleDatabase('db');
    await db.set('key', 'value');
    console.log(await db.get('key'));
})();
```

<br />

## API

#### async simpleDatabase.newDB(directory)

> Simply creates empty directory to be used for a database

#### simpleDatabase.newDBSync(directory) (synchronous version)

> Simply creates empty directory to be used for a database

<br />

## Class simpleDatabase


## Constructor

`new simpleDatabase(directory)`
#### Start a database instance
#### Returns: simpleDatabase

`async simpleDatabase.get(key[, options])`

#### Get the value for a key
####
#### "options" is a object with the following optional values:
 - raw - boolean - Weather to skip JSON.parseing the data

`async simpleDatabase.set(key, value[, options])`

#### Set the value for a key
#### "options" is a object with the following optional values:
- raw - boolean - Weather to skip JSON.stringifying the data

`async simpleDatabase.listKeys()`

#### Returns an array of all the keys in the database

`async simpleDatabase.empty(areYouSure)`

#### Empty out the database deleting all keys and values.
#### areYouSure must be true

`async simpleDatabase.delete(areYouSure)`

#### Completely delete the database. All future operations on the database will throw error
#### areYouSure must be true

<br />

## Synchronous Functions

#### Not recommended especially in a web server

`simpleDatabase.getSync(key[, options])`

#### Get the value for a key
#### "options" is a object with the following optional values:
- raw - boolean - Weather to skip JSON.parseing the data

`simpleDatabase.setSync(key, value[, options])`

#### Set the value for a key
>
#### "options" is a object with the following optional values:
- raw - boolean - Weather to skip JSON.stringifying the data

`simpleDatabase.listKeysSync()`

#### Returns an array of all the keys in the database

`simpleDatabase.emptySync(areYouSure)`

#### Empty out the database deleting all keys and values.
#### areYouSure must be true

`simpleDatabase.deleteSync(areYouSure)`

#### Completely delete the database. All future operations on the database will throw error
#### areYouSure must be true

## Help

### You can report bugs [here](https://github.com/westhecool/node-simple-database/issues)
### For any additional information join my [discord](https://discord.gg/g9drMQhn7S)