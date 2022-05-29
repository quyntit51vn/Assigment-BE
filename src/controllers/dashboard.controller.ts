import { GroupRepo } from "../repositories/group.repository";
import { UserRepo } from "../repositories/user.repository";

const userRepo = UserRepo.getInstance();
const groupRepo = GroupRepo.getInstance();

export const index = async (_req: any, res: any) => {
    try {
        const [student, group] = await Promise.all([userRepo.getCountStudentHasGroup(), groupRepo.count({})])
        res.success({ student, group });
    } catch (error) {
        console.log(error)
        res.errors(error);
    }
};
