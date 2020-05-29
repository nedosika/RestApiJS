module.exports = {
    method: 'GET',
    path: '/users',
    handler: async (request, reply) => {
        return new Promise((resolve, reject)=>{
    	    console.log('getUsers');
    	    request.getModel(request.server.config.db.database, 'users')
    	    	.findAll()
    		.then(users => resolve(users))
    		.catch((err) => reject(err));
        })
    }
}

