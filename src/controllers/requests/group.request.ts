import { handleRequestPaginate } from "./helper.request"

export const requestList = (req: any, res: any, next: any) => {
    let { group_ids, search } = req.query
    req.query.search = search ? search : ''
    req.query.group_ids = group_ids ? JSON.parse(group_ids) : null
    req.query.paginate = handleRequestPaginate(req.query)
    next();
}

export const requestCreate = (req: any, res: any, next: any) => {
    let { name, leader_id, subject, date_start } = req.body
    req.body.dataGroup = {
        name,
        leader_id,
        subject,
        date_start: new Date(date_start)
    }
    next();
}