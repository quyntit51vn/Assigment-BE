
import * as GroupController from '../../controllers/group.controller';
import * as GroupRequest from '../../controllers/requests/group.request';
import { runConditionMiddleware } from '../../middleware/base.middleware';
import { checkExist, createCondition } from '../../middleware/group.middleware';

const express: any = require('express');

const groupRoute = express.Router({ mergeParams: true });

groupRoute.route('/')
    .get(GroupRequest.requestList, GroupController.getList)
    .post(createCondition, runConditionMiddleware, GroupRequest.requestCreate, GroupController.store);

groupRoute.route('/:id')
    .get(GroupController.show)
    .delete(checkExist, GroupController.destroy);

module.exports = groupRoute;
export { };
