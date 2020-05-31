'use strict';

const Joi = require('joi');
const responseSchemes = require('../../libs/responseSchemes.js');

const responseScheme = Joi.object({
    meta: responseSchemes.meta,
    data: Joi.array().items(responseSchemes.message)
});

const response = async request => new Promise((resolve, reject) => {
    request.getModel(request.server.config.db.database, 'messages')
        .findAll()
        .then(results => {
            const messages = results.map(message => message.get({plain: true}));
            const result = {
                meta: {
                    total: messages.length
                },
                data: messages
            }
            resolve(result);
        })
        .catch(error => reject(error));
    }
)

module.exports = {
    method: 'GET',
    path: '/messages',
    options: {
        handler: response,
        tags: ['api'],
        validate: {},
        response: { schema: responseScheme },
    }
}