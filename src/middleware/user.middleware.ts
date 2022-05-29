import e from "express";
import { Op } from "sequelize";
import { NotFoundError } from "../base/custom-error";
import { MAX_JOIN_GROUP } from "../base/variable";
import { RoleUser, SexUser } from "../models/enums/user";
import { GroupRepo } from "../repositories/group.repository";
import { UserRepo } from "../repositories/user.repository";
import { getValueEnum } from "../utils/utils";

const { body } = require('express-validator');

const groupRepo = GroupRepo.getInstance();
const userRepo = UserRepo.getInstance();
export const createStudentCondition = [
    body('avatar').exists().withMessage('Please upload avatar').trim(),
    body('email').exists().withMessage('Please enter email').isEmail().withMessage('The email is not valid').trim(),
    body('name').exists().withMessage('Please enter name').trim(),
    body('sex').exists().withMessage('Please enter sex').custom(value => {
        if (!getValueEnum(SexUser).includes(value))
            return Promise.reject('the sex is valid');
        return true
    }).trim(),
    body('birth_place').exists().withMessage('Please enter birth place').trim(),
    body('birth_date').exists().withMessage('Please enter birth date').isDate().withMessage('The birth date is valid').trim(),
    body('group_ids').exists().isArray().withMessage('The group ids is not valid').custom(async (value) => {
        let groups = await groupRepo.findAll({
            where: {
                id: { [Op.in]: value }
            }
        })
        if (groups.length != value.length) {
            return Promise.reject('The group ids have value not exist');
        }
        if (groups.length > MAX_JOIN_GROUP) {
            return Promise.reject('Max group is ' + MAX_JOIN_GROUP);
        }
        return true;
    }),
];

export const joinGroupCondition = [
    body('group_ids').exists().isArray().withMessage('The group ids is not valid').custom(async (value) => {
        let groups = await groupRepo.findAll({
            where: {
                id: { [Op.in]: value }
            }
        })
        if (groups.length != value.length) {
            return Promise.reject('The group ids have value not exist');
        }

        return true;
    }),
    body('user_ids').exists().isArray().withMessage('The user ids is not valid').custom(async (value) => {
        let student = await userRepo.findAll({
            where: {
                id: { [Op.in]: value },
                role: RoleUser.Student
            }
        })
        if (student.length != value.length) {
            return Promise.reject('The user ids have value not exist');
        }
        return true;
    }),
];

export const checkExist = async (req: any, res: any, next: any) => {

    const student = await userRepo.showStudent(req.params.id)
    if (!student) {
        return res.errors(new NotFoundError('Student not found'))
    }
    next();
}
