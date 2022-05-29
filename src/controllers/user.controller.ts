import { UserRepo } from "../repositories/user.repository";

const mainRepo = UserRepo.getInstance();
export const getList = async (req: any, res: any) => {
    try {
        let { group_ids, search, paginate } = req.query
        const data = await mainRepo.getListStudent({ group_ids, search }, paginate)
        res.success(data);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

export const getListLeader = async (req: any, res: any) => {
    try {
        let { search, paginate } = req.query
        let data = await mainRepo.getListLeader(search, paginate);
        res.success(data);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};
export const show = async (req: any, res: any) => {
    try {
        const user = await mainRepo.showStudent(req.params.id)
        res.success(user);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

export const store = async (req: any, res: any) => {
    try {
        let { dataStudent, group_ids } = req.body
        const student = await mainRepo.createStudent(dataStudent, group_ids)
        res.success(student);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

export const update = async (req: any, res: any) => {
    try {
        let { dataStudent, group_ids } = req.body
        const student = await mainRepo.updateStudent(req.params.id, dataStudent, group_ids)
        res.success(student);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

export const destroy = async (req: any, res: any) => {
    try {
        const student = await mainRepo.delete(req.params.id)
        res.success(student);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

export const joinGroup = async (req: any, res: any) => {
    try {
        let { user_ids, group_ids } = req.body
        await Promise.all(user_ids.map((async (userId) => {
            return mainRepo.studentJoinGroup(userId, group_ids)
        })))
        res.success('success');
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

