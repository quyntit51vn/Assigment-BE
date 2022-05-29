import { validationResult } from 'express-validator';
import responseCode from '../base/responseCode';
export const runConditionMiddleware = async (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();
    if (hasError) {
        console.log(error)
        return res.error(responseCode.VALIDATION_ERROR.name, error.array()[0], responseCode.VALIDATION_ERROR.code);
    } else {
        next();
    }
};