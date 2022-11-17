/*

This file contains the api routes

*/

const API = require("../lib/api/api");

require("../lib/api/api")


module.exports = function(app) {

    app.post('/checkout', function (req, res) {

     
        data = (req.body)
     
        console.log(data)

        api = new API()

        restructured_data= api.restructure_data(data)

        data_grouped_by_number=api.groupByNumber(restructured_data)

        sum = api.sum(data_grouped_by_number)

        console.log("Sum",sum)

        res.end(JSON.stringify({"price":sum}))

         

     
     });  
  };
