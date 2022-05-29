import { NotFoundError } from "../base/custom-error";
import { RoleUser } from "../models/enums/user";
import { GroupRepo } from "../repositories/group.repository";
import { UserRepo } from "../repositories/user.repository";

const { body } = require('express-validator');

const userRepo = UserRepo.getInstance();
const groupRepo = GroupRepo.getInstance();
export const createCondition = [
    body('name').exists().withMessage('Please upload name').trim(),
    body('subject').exists().withMessage('Please enter subject').trim(),
    body('date_start').exists().withMessage('Please enter date start').trim(),
    body('leader_id').exists().withMessage('Please enter date start').custom(async (value) => {
        let leader = await userRepo.findOne({
            where: {
                id: value,
                role: RoleUser.Leader
            }
        })
        if (!leader) {
            return Promise.reject('The leader not exist');
        }
        return true;
    }),
];

export const checkExist = async (req: any, res: any, next: any) => {
    const group = await groupRepo.findById(req.params.id)
    if (!group) {
        return res.errors(new NotFoundError('Group not found'))
    }
    next();
}