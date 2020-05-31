'use strict';
const Joi = require('joi');
const responseSchemes = require('../../libs/responseSchemes.js');

const responseScheme = Joi.object({
    meta: responseSchemes.meta,
    data: Joi.array().items(responseSchemes.message)
});

const response = async request => {
    return new Promise((resolve, reject) => {
        const {mid} = request.params;
        const {database} = request.server.config.db;

        request.getModel(database, 'messages')
               .findByPk(mid)
               .then(message => {
                    const messages = message ?
                        [message.get({plain: true})] : [];
                    const result = {
                        meta: {
                            total: messages.length
                        },
                        data: messages
                    };
                    resolve(result);
                })
               .catch(error => reject(error))
    })
}

module.exports = {
    method: 'GET',
    path: '/messages/{mid}',
    options: {
        handler: response,
        description: 'Get message',
        notes: ['Get message by id'],
        tags: ['api'],
        validate: {
            params: Joi.object({
                mid: Joi
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