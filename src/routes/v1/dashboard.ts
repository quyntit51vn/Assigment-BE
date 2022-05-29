
import * as DashboardController from '../../controllers/dashboard.controller';

const express: any = require('express');

const dashboardRoute = express.Router({ mergeParams: true });

dashboardRoute.route('/')
    .get(DashboardController.index)


module.exports = dashboardRoute;
export { };
