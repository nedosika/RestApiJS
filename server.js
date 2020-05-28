'use strict';

import Hapi from '@hapi/hapi';
import MySQL from 'mysql';
import Joi from '@hapi/joi'

const server = new Hapi.server({
    port: 3000,
    host: '192.168.0.200'
});

const connection = MySQL.createConnection({
    host: '192.168.0.200',
    user: 'nodejs',
    password: 'lg23GrT48aClbUfW',
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
    options: {
	validate: {
	    params: Joi.object({
		uid: Joi.number().integer()
	    })
	}
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
	return 'Hello World!';
    }
});

server.route({
    method: 'POST',
    path: '/messages',
    handler: async (request, reply) =>  {
        return new Promise((resolve, reject) => {
            const uid = request.payload.uid;
            connection.query('SELECT * FROM messages WHERE uid_fk = "' + uid + '"', (error, results, fields) => {
                if (error)
                    reject(error)
                else {
                    resolve(results)
                }
            });
        });
    },
    options: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        },
	validate: {
	    payload: Joi.object({
		uid: Joi.number().integer()
	    })
	}
    }
});

server.route({
    method: 'DELETE',
    path: '/message/{uid}/{mid}',
    handler: async (request, reply) =>  {
        return new Promise((resolve, reject) => {
    	    const uid = request.params.uid;
    	    const mid = request.params.mid;
    	    const queryString = 'DELETE FROM messages WHERE uid_fk = "' + uid + '" AND mid = "' + mid + '"';
    	    connection.query(queryString, (error, results, fields) => {
    	        if (error)
    		    reject(error)
    	        else {
    	    	    if (results.affectedRows)
    	    		resolve(true)
    	    	    else {
    	    		resolve(false)
    	    	    }
		}
    	    });
    	})
    },
    options: {
        validate: {
            params: Joi.object({
                uid: Joi.number().integer(),
                mid: Joi.number().integer()
            })
        }
    }
});

server.start();
console.log('Server running on %s', server.info.uri);
