// interface write and Read DB
import { roundTo } from '../utils/utils';
import { IWrite, IRead, Paginate } from './interfaces/interfaceGlobalRepository';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {


    protected model;

    setModel(model) {
        this.model = model;
    }

    getModel() {
        return this.model;
    }

    findOne(query: any): Promise<T[]> {
        return this.model.findOne(query)
    }
    findById(id: string, option: any = {}): Promise<T> {
        return this.model.findByPk(id, option)
    }

    count(query: any): Promise<T[]> {
        return this.model.count(query)
    }

    async findPaginate(query: any, paginate: Paginate) {
        let queryPaginate = {
            ...query,
            limit: paginate.limit,
            offset: paginate.limit * (paginate.page - 1),
            distinct: true,
        }
        let dataPaginate = await this.model.findAndCountAll(queryPaginate)
        return {
            data: dataPaginate.rows,
            paginate: {
                total_record: dataPaginate.count,
                total_page: roundTo(dataPaginate.count / paginate.limit, 0),
                limit: paginate.limit,
                page: paginate.page
            }
        }
    }
    findAll(query: any): Promise<T> {
        return this.model.findAll(query)
    }
    create(item: T): Promise<T> {
        return this.model.create(item)
    }
    update(item: T, query: string | object): Promise<T> {
        let queryItem = typeof (query) == 'string' ? { where: { id: query } } : query
        return this.model.update(item, queryItem)
    }
    delete(query: string): Promise<boolean> {
        let queryItem = typeof (query) == 'string' ? { where: { id: query } } : query
        return this.model.destroy(queryItem)
    }

}
