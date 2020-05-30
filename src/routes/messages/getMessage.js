'use strict';
const Joi = require('joi');
const responseSchemes = require('../../libs/responseSchemes.js');

const responseScheme = Joi.object({
    meta: responseSchemes.meta,
    data: Joi.array().items(responseSchemes.message)
});

const handler = async request => {
    return new Promise((resolve, reject) => {
	const {id} = request.params;
	const {database} = request.server.config.db;
	
	request.getModel(database, 'messages')
               .findByPk(id)
               .then(data => {
            	    resolve({
            		meta: {
            		    total: 1
            		},
            		data: [ data.get({plain: true}) ]
            	    });
            	})
               .catch(error => reject(error))
    })
}

module.exports = {
    method: 'GET',
    path: '/message/{id}',
    config: {
	handler,
	description: 'Get message',
	notes: ['Get message by id'],
	tags: ['api'],
	validate: {
	    params: Joi.object({
		id: Joi
		    .number()
		    .integer()
		    .required()
		    .description('the id')
		    .example(1)
	    }),
	},
        response: { schema: responseScheme }
    }
}
