const config = require('./config.js');
const ServerAPI = require('./src/server.js');
const server = new ServerAPI(config);

server.init();