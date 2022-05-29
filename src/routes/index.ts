const route = require('express')();
const apiV1 = require('./v1/index');

route.get('/', (req, res) => res.send('Welcome '));
route.use('/api/v1', apiV1);
module.exports = route;
