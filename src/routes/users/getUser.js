'use strict';

module.exports = {
    method: 'GET',
    path: '/user/{uid}',
    handler: async (request) => {
	return new Promise((resolve, reject)=>{
	    const uid = request.params.uid;
    	    request.getModel(request.server.config.db.database, 'users')
    		.findByPk(uid)
    		.then(result => resolve(result))
    		.catch(err => reject(err))
	})
    }
}
