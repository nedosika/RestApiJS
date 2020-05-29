'use strict';

module.exports = {
    method: 'GET',
    path: '/',
    options:{
	handler: (request, h) => {
    	    return 'REST API Server v0.1b';
	},
	tags: ['api'],
	validate:{
	}
    }
}

