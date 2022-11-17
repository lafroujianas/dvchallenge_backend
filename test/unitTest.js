/*

This file contains the unitTest

*/

var assert =require("assert");
const { expect } = require("chai");
const exp = require("constants");
const { isTypedArray } = require("util/types");
const API = require("../lib/api/api");
var should = require('chai').should()

require("../lib/api/api")

var api=new API()


describe("Unit tests",function()
{

    describe("Method restructure_data",function()
    {
        

        it("Should return an array",function()
        {

            let data =["001","002","001","004","003"];
            
            expect(api.restructure_data(data)).to.be.an("array")
        })

        

        it("Should have an id and total",function()
        {
            let data =["001"]
            expect(api.restructure_data(data)[0].id).to.be.equal("001")
            expect(api.restructure_data(data)[0].total).to.be.equal(1)
        })

    })


    describe("Method groupByNumber",function()
    {
        let data =
        [{id:"001",total:1},
        {id:"002",total:1},
        {id:"001",total:1},
        {id:"003",total:1},
        {id:"003",total:1},
        {id:"004",total:1}]

        grouped_by_number_data=api.groupByNumber(data)

        it("Should have 2 in total for 001",function()
        {


            expect(api.get_total_per_id("001",grouped_by_number_data)).to.be.equal(2)
        })

        it("Should have 1 in total for 002",function()
        {
            expect(api.get_total_per_id("002",grouped_by_number_data)).to.be.equal(1)
        })

        it("Should have 2 in total for 003",function()
        {
            expect(api.get_total_per_id("003",grouped_by_number_data)).to.be.equal(2)
        })


    })

    describe("Method get_discounted_quantity",function()
    {

        it("get_discounted_quantity(3,2) return 1",function()
        {
            assert.equal(api.get_discounted_quantity(3,2),1)
        })

        it("get_discounted_quantity(4,2) return 2",function()
        {
            assert.equal(api.get_discounted_quantity(4,2),2)
        })

        it("get_discounted_quantity(0,2) return 0",function()
        {
            assert.equal(api.get_discounted_quantity(0,2),0)
        })

        it("get_discounted_quantity(8,3) return 2",function()
        {
            assert.equal(api.get_discounted_quantity(8,3),2)
        })

    })

})