import responseCode from './responseCode';
import { error_response_obj } from './injector';

/**
 * Handle un-catch exception
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const handleError = (err, req, res, next) => {
    return res.status(err.status || 500).json(error_response_obj(err.message, responseCode.SERVER.name));
};
