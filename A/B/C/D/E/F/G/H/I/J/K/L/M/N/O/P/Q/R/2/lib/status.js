const env = process.env;
// const hapi = require('hapi');
// const express = require('express');
var http = require("http");
const status_port = env.STATUS_PORT == null ? 7828 : env.STATUS_PORT;//7828-STAT

var SUCCESS_RESPONSE = "OK";
var server = null;

var Status = {};

Status.load = function (runningServer) {

    var type = typeof runningServer;
    if (runningServer != null) {
        server = runningServer;
        //express.js lib inject
        if (runningServer.get != null) {

            runningServer.get('/status', function (req, res) {
                res.send(SUCCESS_RESPONSE);
            });
            return;
        }
        //hapi.js lib inject
        if (runningServer.route != null) {
            runningServer.route({
                method: 'GET',
                path: '/status',
                handler: function (request, reply) {
                    return reply(SUCCESS_RESPONSE);
                }
            });
            return;
        }
    }
    //no lib inject
    server = http.createServer(function (request, response) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(SUCCESS_RESPONSE);
        response.end();
    });
    server.listen(status_port);
}

module.exports = Status;
