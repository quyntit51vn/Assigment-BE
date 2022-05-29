import { DefaultPaginate } from "../../models/enums/paginate";
import { Paginate } from "../../repositories/interfaces/interfaceGlobalRepository";

export const handleRequestPaginate = (query: any): Paginate => {
    let { limit, page } = query
    limit = parseInt(limit) ? parseInt(limit) : DefaultPaginate.limit;
    page = parseInt(page) > 0 ? parseInt(page) : DefaultPaginate.page;
    return {
        limit,
        page
    }
}