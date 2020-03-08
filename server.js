'use strict';

const Hapi = require('@hapi/hapi');
const MySQL = require('mysql');
const Joi = require('joi');

const server = new Hapi.server({
    port: 3000,
    host: '192.168.0.200'
});

const connection = MySQL.createConnection({
    host: '192.168.0.200',
    user: 'nodejs',
    password: '5BAaDON9f3stNdp5',
    database: 'nodejs'
});

connection.connect();

server.route({
    method: 'GET',
    path: '/users',
    handler: async (request, reply) => {
	return new Promise((resolve, reject) => {
	    connection.query('SELECT * FROM `users`', function (error, results, fields) {
		if (error) 
		    reject(error)
		else {
		    resolve(results)
		}
	    });
	})
    }
});

server.route({
    method: 'GET',
    path: '/user/{uid}',
    handler: async (request, reply) =>  {
        return new Promise((resolve, reject) => {
    	    const uid = request.params.uid;
            connection.query('SELECT uid, username, email FROM `users` WHERE uid = "' + uid +'"', (error, results, fields) => {
        	if (error)
        	    reject(error)
        	else {
        	    resolve(results)
        	}
            });
        });
    },
//    config: {
//	validate: {
//	    params: {
//		uid: Joi.number().integer()
//	    }
//	}
//    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
	return 'Hello World!';
    }
});

server.start();
console.log('Server running on %s', server.info.uri);
