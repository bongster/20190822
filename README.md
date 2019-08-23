# 20190822

## Description

This project are built by Practice develop a cache and relationship database

## Requirements

* Node.js
* yarn (optional)

## How to Install

```
    $ cd ${project}
    $ yarn install
```

## How to Build

```
    $ yarn install
    $ yarn run build
    $ yarn start
```

## How to Develop

```
    $ yarn install
    $ yarn run dev
```

## How to Test

```
    $ yarn install
    $ yarn test
```

## Features
- [x] Get data from API
- [x] Create memory base cache
- [x] Create model
- [x] Hiding information in model instance
- [x] Create model relationship
- [x] Create file base cache
- [x] Remove expired data in cache

## TODO
- [ ] setup eslint
- [ ] add coverage
- [ ] add index feature at model for optimizing search (use tree datastructure got data), now use full searching when searching name
- [ ] model getItems, getItem multiple param filter

## Models

* Cache

Cache model

    * functions
        * get(key)
            > get data from Cache
        * set(key, data)
            > set data to Cache Storage
        * clear
            > clear all storage
        * all
            > return all data in storage

* MemoryStorage

Memory based storage

* FileStorage

File based Storage

    * attributes
        * path
        * loaded
        * delimiter
        * writeStream
    
    * functions
        * load
            > read data from file

* Model
    * functions
        * getItems
            > return JSON list from API or cache
        * getItem
            > return JSON object from API or cache
        * hasMany
            > 1: N relationship function
        * belongTo
            > N: 1 relationship function
        * associated
            > relationships are declared function
        * build
            > return model instance
    * attributes
        * primary
            > model primary key
        * model_name
            > api path name related API
        * fields
            > included fields in model

## ThirdParty

* axios
* jest
* babel
* nodemon

## Address
* [https://github.com/bongster/20190822](github)