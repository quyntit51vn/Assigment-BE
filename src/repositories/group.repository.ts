import { BaseRepository } from './base.repository';
import { Paginate } from './interfaces/interfaceGlobalRepository';
import { Op, Sequelize } from 'sequelize';
import GroupModel from '../models/group';
import UserModel from '../models/user';
import { Collection } from '../services/helpers/collection';
import { cloneObj } from '../utils/utils';


export class GroupRepo extends BaseRepository<any> {
    private static instance: GroupRepo;
    private constructor() {
        super();
        this.model = GroupModel;
    }

    public static getInstance(): GroupRepo {
        if (!GroupRepo.instance) {
            GroupRepo.instance = new GroupRepo();
        }
        return GroupRepo.instance;
    }

    public async getList(search: string, paginate: Paginate) {
        let data = await this.findAll({
            where: {
                name: { [Op.like]: `%${search}%` }
            },
            include: [
                {
                    model: UserModel,
                    as: 'leader',
                    attributes: ['id', 'name', 'email', 'avatar']
                },
                {
                    model: UserModel,
                    as: 'students',
                    attributes: ['id', 'name',]
                },
            ],
            distinct: true,
            attributes: ['id', 'name', 'subject', 'date_start',
                [Sequelize.fn('COUNT', Sequelize.col('students.id')), 'student_count']
            ],
            group: ["groups.id"],
        })
        data = cloneObj(data).map(record => {
            delete record.students;
            return record
        })
        data = new Collection(data.map(record => {
            delete record.students;
            return record
        }))
        return data.pagination(paginate.page, paginate.limit);

    }

    public show(id) {
        return this.findById(id,
            {
                include: [
                    {
                        model: UserModel,
                        as: 'leader',
                        attributes: ['id', 'name', 'email', 'avatar']
                    },
                    {
                        model: UserModel,
                        as: 'students',
                        attributes: ['id', 'name']
                    }
                ],
                attributes: ['id', 'name', 'subject', 'date_start']
            }
        )
    }

    public async delete(id: string) {
        const data = await this.findById(id, {
            include: [
                {
                    model: UserModel,
                    as: 'students'
                }
            ]
        })
        await data.removeStudent(data.students);
        return super.delete(id)
    }
}
