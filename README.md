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

## How to Run

```
    $ npm start
```

## How to Test

```
    $ npm test
```

## Features
- [x] Get data from API
- [x] Create memory base cache
- [x] Create model
- [x] Hiding information in model instance
- [x] Create model relationship
- [ ] Create file base cache
- [ ] Remove expired data in cache

## Models

* Cache
    > Cache model

    * functions
        * get(key)
            > get data from Cache
        * set(key, data)
            > set data to Cache Storage
        * clear
            > clear all storage
        * all
            > return all data in storage

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
