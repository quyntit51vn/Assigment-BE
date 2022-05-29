const routeV1 = require('express')();

const user = require('./user');
const group = require('./group');
const dashboard = require('./dashboard');
const upload = require('./upload');

routeV1.use('/users', user);
routeV1.use('/groups', group);
routeV1.use('/dashboards', dashboard);
routeV1.use('/file', upload);

module.exports = routeV1;
