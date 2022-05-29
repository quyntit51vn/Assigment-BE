
import * as UserControler from '../../controllers/user.controller';
import * as UserRequest from '../../controllers/requests/user.request';
import { checkExist, createStudentCondition, joinGroupCondition } from '../../middleware/user.middleware';
import { runConditionMiddleware } from '../../middleware/base.middleware';

const express: any = require('express');

const userRoute = express.Router({ mergeParams: true });

userRoute.route('/')
    .get(UserRequest.requestListStudent, UserControler.getList)
    .post(createStudentCondition, runConditionMiddleware, UserRequest.requestCreateStudent, UserControler.store)

userRoute.get('/leaders', UserRequest.requestListLeader, UserControler.getListLeader)

userRoute.route('/:id')
    .get(UserControler.show)
    .delete(checkExist, UserControler.destroy)
    .put(createStudentCondition, runConditionMiddleware, UserRequest.requestCreateStudent, UserControler.update)

userRoute.post('/joinGroup', joinGroupCondition, runConditionMiddleware, UserControler.joinGroup)

module.exports = userRoute;
export { };
