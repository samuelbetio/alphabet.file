const status = require('./../lib/status');
const env = process.env;
const expect = require('chai').expect;
var request = require('request');
var expected_response = 'OK';
var host = 'localhost';
describe(
    'Notifications',
    function () {
        ///////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////
        //SMS area
        it('HTTP should fail if response is not ' + expected_response, function (done) {
            process.env.STATUS_PORT = 7828;
            status.load();
            request('http://' + host + ':' + process.env.STATUS_PORT + '/status', function (error, response, body) {
                if (!error && response.statusCode == 200 && response.body === expected_response) {
                    return done();
                }
                return done(error, response);
            })
        });

        it('Express lib should fail if response is not ' + expected_response, function (done) {
            process.env.STATUS_PORT = 7829;
            var express = require('express');
            var app = express();
            status.load(app);
            app.listen(process.env.STATUS_PORT, function () {
                console.log('Example app listening on port '+process.env.STATUS_PORT+'!');
            });
            request('http://' + host + ':' + process.env.STATUS_PORT + '/status', function (error, response, body) {
                if (!error && response.statusCode == 200 && response.body === expected_response) {
                    return done();
                }
                return done(error, response);
            })
        });

        it('Hapi lib should fail if response is not ' + expected_response, function (done) {
            process.env.STATUS_PORT = 7830;
            const Hapi = require('hapi');
            // Create a server with a host and port
            const server = new Hapi.Server();
            server.connection({
                host: host,
                port: process.env.STATUS_PORT
            });
            status.load(server);
            server.start((err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('Server running at:', server.info.uri);
            });

            request('http://' + host + ':' + process.env.STATUS_PORT + '/status', function (error, response, body) {
                if (!error && response.statusCode == 200 && response.body === expected_response) {
                    return done();
                }
                return done(error, response);
            })
        });
    });