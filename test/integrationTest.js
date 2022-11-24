/*

This file contains the integration tests

*/

var assert = require("assert");
const { expect } = require("chai");
var should = require('chai').should()
const request = require('supertest');

var API = require("../lib/api/api")
const app = require('../app')



describe("Integration testing", function () {

    describe("Method sum", function () {
        it("Should return 360", function () {

            var data = ["001", "002", "001", "004", "003"]

            var api = new API()

            restructured_data = api.restructure_data(data)

            data_grouped_by_number = api.group_by_number(restructured_data)

            sum = api.sum(data_grouped_by_number)

            expect(sum).to.be.equal(360)


        })

        it("Should return 200", function () {

            var data = ["001", "001", "001"]

            var api = new API()

            restructured_data = api.restructure_data(data)

            data_grouped_by_number = api.group_by_number(restructured_data)

            sum = api.sum(data_grouped_by_number)

            expect(sum).to.be.equal(200)


        })


        it("Should return 400", function () {

            var data = ["001", "001", "001", "002", "002", "002"]

            var api = new API()

            restructured_data = api.restructure_data(data)

            data_grouped_by_number = api.group_by_number(restructured_data)

            sum = api.sum(data_grouped_by_number)

            expect(sum).to.be.equal(400)


        })


        it("Should return 260", function () {

            var data = ["001", "002", "003", "004"]

            var api = new API()

            restructured_data = api.restructure_data(data)

            data_grouped_by_number = api.group_by_number(restructured_data)

            sum = api.sum(data_grouped_by_number)

            expect(sum).to.be.equal(260)


        })

    })



    describe("API testing", function () {

        it('It works', async () => {
            const res = await request(app)
                .post('/checkout');

            expect(res.statusCode).to.equal(200)

        })


        it('Should have a price of 360', async () => {
            const res = await request(app)
                .post('/checkout')
                .send('["001","002","001","004","003"]')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');

            expect(res.body.price).to.equal(360)

        })


        it('Should have a price of 200', async () => {
            const res = await request(app)
                .post('/checkout')
                .send('["001","001","001"]')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');

            expect(res.body.price).to.equal(200)

        })


        it('Should have a price of 400', async () => {
            const res = await request(app)
                .post('/checkout')
                .send('["001","001","001","002","002","002"]')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');

            expect(res.body.price).to.equal(400)

        })


        it('Should have a price of 260', async () => {
            const res = await request(app)
                .post('/checkout')
                .send('["001","002","003","004"]')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.body.price).to.equal(260)

        })


        it('Should have a price of 0', async () => {
            const res = await request(app)
                .post('/checkout')
                .send('')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(res.body.price).to.equal(0)

        })

        it('Should respond with json', async () => {
            const res = await request(app)
                .post('/checkout')
                .send('')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
            expect('Content-Type', /json/)

        })





    })





})