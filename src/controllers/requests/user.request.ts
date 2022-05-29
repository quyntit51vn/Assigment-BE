import { DefaultPaginate } from "../../models/enums/paginate";
import { RoleUser } from "../../models/enums/user";
import { handleRequestPaginate } from "./helper.request";

export const requestListStudent = (req: any, res: any, next: any) => {
    let { group_ids, search } = req.query
    req.query.search = search ? search : ''
    req.query.group_ids = group_ids ? JSON.parse(group_ids) : null
    req.query.paginate = handleRequestPaginate(req.query)
    next();
}

export const requestListLeader = (req: any, res: any, next: any) => {
    let { search } = req.query
    req.query.search = search ? search : ''
    req.query.paginate = handleRequestPaginate(req.query)
    next();
}

export const requestCreateStudent = (req: any, res: any, next: any) => {
    let { avatar, name, email, sex, birth_place, birth_date } = req.body
    req.body.dataStudent = {
        avatar,
        name,
        email,
        sex,
        birth_place,
        birth_date: new Date(birth_date),
        role: RoleUser.Student
    }
    next();
}