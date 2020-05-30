'use strict';

const Hapi = require('@hapi/hapi');
const filepaths = require('filepaths');
const Sequelize = require('sequelize');
const path = require('path');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../package');

module.exports = class {
    constructor(config){
	this._config = config;
    }

    init = async () => {
	const config = this._config;
	const server = await new Hapi.server(config.server);
	const __dirname = path.resolve();

	await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: config.swagger
            },
	    {
		plugin: require('hapi-sequelizejs'),
		options: [
    		    {
        		name: config.db.database, // identifier
        		models: [__dirname + '/src/models/**/*.js'], // Путь к моделькам
            		//ignoredModels: ['./src/models/getUsers.js'], // Если какие-то из моделек нужно заигнорить
        		sequelize: new Sequelize(config.db), // Инициализация
        		sync: true, // default false
        		forceSync: false, // force sync (drops tables) - default false
    		    },
    		]
	    }
	]);

	for(let route of filepaths.getSync(__dirname + '/src/routes/'))
	    server.route(require(route));

	server.ext({
	    type: 'onRequest',
	    method: async function (request, h) {
		request.server.config = Object.assign({}, config);
		//request.server.logger = logger;
		return h.continue;
	    }
	});

	try {
	    await server.start();
	    console.log('Server running on %s', server.info.uri);
	} catch(err) {
	    console.log(JSON.stringify(err));
	}

	return server;
    }
}
