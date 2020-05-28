'use strict';

import Hapi from '@hapi/hapi';
import filepaths from 'filepaths';

const server = new Hapi.server({
    port: 3000,
    host: '192.168.0.200'
});

const routes = filepaths.getSync('./src/routes/');

for(let route of routes)
    import(route).then((module) => {server.route(module.default)});

server.start();
console.log('Server running on %s', server.info.uri);
