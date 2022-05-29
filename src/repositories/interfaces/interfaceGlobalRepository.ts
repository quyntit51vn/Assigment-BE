import { DataTypes } from "sequelize/types";


export interface Paginate {
    page: number;
    limit: number;
}

export interface IWrite<T> {
    create(item: T): Promise<T>;
    update(item: T, id: string): Promise<T>;
    delete(query: string): Promise<boolean>;
}

export interface IRead<T> {
    count(query: any): Promise<T[]>;
    findOne(item: any): Promise<T[]>;
    findById(id: string, option: any): Promise<T>;
    findPaginate(query, paginate: Paginate);
    findAll(query): Promise<T>;
}
