import { BaseRepository } from './base.repository';
import User from '../models/user';
import { Paginate } from './interfaces/interfaceGlobalRepository';
import { Op } from 'sequelize';
import { RoleUser } from '../models/enums/user';
import GroupModel from '../models/group';
import UserModel from '../models/user';
import { IUser } from '../models/docs/user.interface';
import { GroupRepo } from './group.repository';
import { MailService } from '../services/mail';
import { MAX_JOIN_GROUP } from '../base/variable';

interface queryListStudent {
    group_ids: Array<number> | null;
    search: string;
}

export class UserRepo extends BaseRepository<any> {
    private static instance: UserRepo;
    private constructor() {
        super();
        this.model = User;
    }

    public static getInstance(): UserRepo {
        if (!UserRepo.instance) {
            UserRepo.instance = new UserRepo();
        }
        return UserRepo.instance;
    }

    public getListStudent(query: queryListStudent, paginate: Paginate) {
        let whereGroup = null;

        if (Array.isArray(query.group_ids) && query.group_ids.length) {
            whereGroup = {
                id: { [Op.in]: query.group_ids }
            }
        }
        return this.findPaginate({
            where: {
                [Op.and]: [
                    { role: RoleUser.Student },
                    {
                        [Op.or]: [
                            {
                                name: { [Op.like]: `%${query.search}%` }
                            },
                            {
                                birth_place: { [Op.like]: `%${query.search}%` }
                            },
                            {
                                email: { [Op.like]: `%${query.search}%` }
                            }
                        ]
                    }
                ]
            },
            include: [
                {
                    model: GroupModel,
                    as: 'groups',
                    where: whereGroup,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ],
            attributes: ['id', 'name', 'sex', 'birth_date', 'birth_place', 'email', 'avatar',]
        }, paginate)
    }

    public getCountStudentHasGroup() {
        return this.count({
            where: {
                role: RoleUser.Student
            },
            distinct: true,
            include: [
                {
                    model: GroupModel,
                    as: 'groups',
                    where: {},
                }
            ]
        })
    }

    public getListLeader(search: string, paginate: Paginate) {
        return this.findPaginate({
            where: {
                [Op.and]: [
                    { role: RoleUser.Leader },
                    {
                        [Op.or]: [
                            {
                                name: { [Op.like]: `%${search}%` }
                            }
                        ]
                    }
                ]
            },
            distinct: true,
            attributes: ['id', 'name', 'email']
        }, paginate)
    }

    public showStudent(id) {
        return this.findOne(
            {
                where: {
                    role: RoleUser.Student,
                    id
                },
                include: [
                    {
                        model: GroupModel,
                        as: 'groups',
                        through: { attributes: [] },
                        attributes: ['id', 'name', 'subject', 'date_start'],
                        include: {
                            model: UserModel,
                            as: 'leader',
                            attributes: ['id', 'name', 'email', 'avatar']
                        }
                    }
                ]
            }
        )
    }

    public async createStudent(data: IUser, group_ids: Array<number>) {
        const [student, groups] = await Promise.all([this.create(data), GroupRepo.getInstance().findAll({
            where: {
                id: { [Op.in]: group_ids }
            }
        })])
        Promise.all(group_ids.map(groupId => {
            return student.addGroup(groupId)
        }))
        //send mail
        new MailService()
            .to(student.email)
            .sendJoinGroup(student, groups)
            .execute();
        return student;
    }

    public async updateStudent(studentId, data: IUser, group_ids: Array<number>) {
        await this.update(data, studentId);
        // join group + send mail
        await this.studentJoinGroup(studentId, group_ids, true)
        return this.showStudent(studentId);
    }

    public async studentJoinGroup(studentId, group_ids, is_replace = false) {
        const [student, groups] = await Promise.all([
            this.findById(studentId, {
                include: {
                    model: GroupModel,
                    as: 'groups',
                }
            }), GroupRepo.getInstance().findAll({
                where: {
                    id: { [Op.in]: group_ids }
                }
            })]
        )
        // get new group to send mail
        const groupNew = groups.filter(group => {
            return student.groups.findIndex(e => e.id == group.id) == -1
        })
        // get new group to send mail
        const groupOld = student.groups.filter(group => {
            return groups.findIndex(e => e.id == group.id) == -1
        })

        // remove all group
        if (is_replace)
            await student.removeGroup(groupOld)
        const groupNewToJoin = groupNew.slice(0, MAX_JOIN_GROUP - student.groups.length)
        // update data and join group
        await Promise.all(groupNewToJoin.map(group => {
            return student.addGroup(group.id)
        }))
        //send mail
        if (groupNewToJoin.length) {
            new MailService()
                .to(student.email)
                .sendJoinGroup(student, groupNewToJoin)
                .execute();
        }


        return this.showStudent(studentId);
    }

    public async delete(id: string) {
        const data = await this.findById(id, {
            include: [
                {
                    model: GroupModel,
                    as: 'groups'
                }
            ]
        })
        await data.removeGroup(data.groups);
        return super.delete(id)
    }
}
