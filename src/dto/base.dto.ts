import { cloneObj } from '../utils/utils';

export abstract class BaseDTO {
    protected obj;

    protected user: any = null;

    // get obj simple
    abstract toSimpleJSON();

    protected abstract fillable: Array<string>;

    protected abstract fillableDB: Array<string>;

    protected default = {};

    protected cast = {};

    // get field flexible in obj DTO
    toJSON(fields: Array<string>) {
        let listFieldSuccess = fields.filter((e) => this.fillable.includes(e));

        let res = {};
        for (let field of listFieldSuccess) {
            res = cloneObj(res);
            res[field] =
                this.obj[field] || typeof this.obj[field] == 'boolean' || typeof this.obj[field] == 'number'
                    ? this.obj[field]
                    : this.default[field] != undefined
                        ? this.default[field]
                        : null;
            if (this.cast[field] instanceof Function) res[field] = this.cast[field](res[field]);
        }
        return res;
    }

    // get field from "fillableDB", so add DB
    toDBJSON() {
        return this.toJSON(this.fillableDB);
    }

    // set atribute or add field in obj
    setAttribute = (key, value) => {
        this.obj[key] = value;
    };

    // set value default from "default"
    setDefault = (key, value) => {
        this.default[key] = value;
    };

    // set user
    setUser = (user) => {
        this.user = user;
        return this;
    };
}
