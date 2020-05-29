'use strict';

const handler = async request => new Promise((resolve, reject) => {
console.log('mess');
    request.getModel(request.server.config.db.database, 'messages')
        .findAll()
        .then(results => resolve(results))
        .catch(error => reject(error));
    }
)

module.exports = {
    method: 'GET',
    path: '/messages',
    handler
}

