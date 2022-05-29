import { GroupRepo } from "../repositories/group.repository";

const mainRepo = GroupRepo.getInstance();
export const getList = async (req: any, res: any) => {
    try {
        let { search, paginate } = req.query
        const data = await mainRepo.getList(search, paginate);
        res.success(data);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

export const store = async (req: any, res: any) => {
    try {
        let { dataGroup } = req.body
        let group = await mainRepo.create(dataGroup)
        res.success(group);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

export const show = async (req: any, res: any) => {
    try {
        const group = await mainRepo.show(req.params.id)
        res.success(group);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};

export const destroy = async (req: any, res: any) => {
    try {
        const group = await mainRepo.delete(req.params.id)
        res.success(group);
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};
