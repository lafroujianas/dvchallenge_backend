# BCGDV backend challenge

# The challenge

The purpose of this challenge is to build an API via POST on http://localhost:8080/checkout. This API takes a list of watches and is expected to return a json response with the corresponding price.

# Installation

## Install nodejs

You can install Nodejs 18.12.1 from [here](https://nodejs.org/en/).

After compelting this step, you should have both Nodejs and npm installed

You can test the versions with :
````
node -v 
npm -v
````


## Clone git repository
```
git clone https://github.com/lafroujianas/dvchallenge_backend.git
```


# Quick start

```
cd dvchallenge_backend
node app.js
```
You should get this message 
````
Listening at http://:::8080
````

Congratulations ! Let's see how we can make tests

# Testing


## Installation

````
npm install mocha -g
````

## Automated testing

From the folder dvchallenge_backend

Making tests is very simple. You can just type :

````
npm test
````

## What was tested

The testing was made as :
1. Unit tests : the goal was to test the methods of the class API in lib/api/api.js with different sets of input
2. Integration test
- The goal here was to test that the sum received corresponds to what was manually calculated
- Automated testing of the API, to make sure that the final result is what is expected if the user got to use the api
- Manual testing of the API with an external curl script to make sure that the results corresponds with the automated testing
3. Platform testing
- Tested on Macos Catalina 10.15
- Tested on Windows 10



# App structure

## Application tree

The project is structured as below :
````
├── README.md
├── app.js
├── lib
├── node_modules
├── package-lock.json
├── package.json
├── routes
└── test
````

Where :
- /lib/api/api.js : contains a class API that processes the necessary calculations 
- /test : contains unitTest.js and integrationTest.js that perform unit and integration testing
- /routes/api_call.js : Handles the api endpoint 
```javascript
    app.post('/checkout', function (req, res) {

        
        data = (req.body)
     
        api = new API()

        restructured_data= api.restructure_data(data)
        data_grouped_by_number=api.groupByNumber(restructured_data)
        sum = api.sum(data_grouped_by_number)

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify({"price":sum}))
     
     });  
```



## Methods of api.js

The file /lib/api/api.js contains a class API. This class contains the following most important methods:

**1. Method restructure_data(data_)**
````javascript
var api=new API()
var res= api.restructure_data(data_)
````
This method takes an array like ["001","002","003"] and transforms it in an array of objects like [{id:"001",total:1},{id:"002",total:1},{id:"003",total:1}

The output of this function is fed to the method **group_by_number()**

**2. Method group_by_number(data_)**
````javascript
var api=new API()
var res=api.group_by_number(data_)
````
This method groups watches by their number. The goal is to have a result like [{id:"001",total:2}] if there are 2 items with the same id

This method returns an array of objects

**3. Method sum**

````javascript
var api=new API()
var res = api.sum(data_)
````
This method takes the result from the method **group_by_number()** and returns the sum of items with an appropriate calculation of deductions


## Dependencies
- express : The server for handling and routing HTTP requests
- mocha for unit and integration testing
- supertest for API testing
- chai is a BDD / TDD assertion library for nodejs

# Improvements
Possible improvements could cover :
- Making more unit testing to handle different formats of inputs
- Handling security issues coming from the user input
- Making the method **groupByName** have the same formatting as the other methods ( separation of words with _ ) **Solved in the latest version**
- Change the name of the method **get_discounted_quantity** to **get_number_of_discounts** to remove any confusion about the purpose of this function. **Solved in the latest version**
- Test on other platforms than windows and mac
- Build a docker image
- Handling of errors
...

