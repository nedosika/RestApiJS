'use strict';

const handler = async request => new Promise((resolve, reject) => {
    request.getModel(request.server.config.db.database, 'messages')
        .findAll()
        .then(results => resolve(results))
        .catch(error => reject(error));
    }
)

module.exports = {
    method: 'GET',
    path: '/messages',
    options: {
	handler,
	tags: ['api']
    }
}

