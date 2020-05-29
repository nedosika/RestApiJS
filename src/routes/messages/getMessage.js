'use strict';
const Joi = require('joi');
const responseSchemes = require('../../libs/responseSchemes.js');

const responseScheme = Joi.object({
    meta: responseSchemes.meta,
    data: Joi.array().items(responseSchemes.message)
});

module.exports = {
    method: 'GET',
    path: '/message/{id}',
    options: {
	handler: async (request) => {
	    return new Promise((resolve, reject)=>{
		const id = request.params.id;
    		request.getModel(request.server.config.db.database, 'messages')
    		    .findByPk(id)
    		    .then(results => resolve(results))
    		    .catch(error => reject(error))
	    })
	},
	tags: ['api'],
	validate: {
	    params: Joi.object({
		id: Joi.number().required().description('the id')
	    })
	},
	response: { schema: responseScheme }
    }
}
