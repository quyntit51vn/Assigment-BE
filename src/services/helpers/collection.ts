import { SyntaxError } from "../../base/custom-error";

export class Collection {
    protected arr;
    constructor(arr) {
        if (!Array.isArray(arr)) {
            throw new SyntaxError('Must Array');
        }
        this.arr = arr;
    }

    //pagination
    pagination(page, limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        const totalRecord = this.arr.length;
        const totalPage = (totalRecord / limit >> 0) + (totalRecord % limit ? 1 : 0);
        if (page < 1) page = 1;

        const indexMin = (page - 1) * limit;
        const indexMax = Math.min((page * limit) - 1, totalRecord - 1);

        let data: any = [];
        if (page <= totalPage) {
            data = this.arr.slice(indexMin, indexMax + 1);
        }

        let paginateRes = {
            limit: limit,
            total_page: totalPage,
            page: page,
            total_record: totalRecord
        }
        return { data: data, paginate: paginateRes };
    }

    //filter
    filter(callback) {
        let items = this.arr;
        if (typeof callback == 'function') {
            items = this.arr.filter(callback)
        }
        return new Collection(items);
    }

    //filter
    search(key, value) {
        return this.filter((e) => {
            return e[key] !== undefined
                && typeof e[key] == 'string'
                && typeof value == 'string'
                && e[key].toLowerCase().includes(
                    value.toLowerCase()
                );
        });

    }

    // get
    get() {
        return this.arr;
    }

    sort(callback) {
        this.arr.sort(callback);
    }

}