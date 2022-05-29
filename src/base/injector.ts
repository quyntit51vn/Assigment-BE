import responseCode from './responseCode';

export const success_response_obj = (message, data) => {
    if (data?.paginate?.page) return success_response_paginate_obj(message, data.data, data.paginate);
    return {
        success: true,
        message,
        data,
    };
};

export const success_response_paginate_obj = (message, data, paginate) => ({
    success: true,
    message,
    data,
    paginate,
});

export const error_response_obj = (message, error) => ({
    success: false,
    error,
    message,
});

const injector = async (req, res, next) => {
    /**
     *
     * @param data
     * @param message
     * @param statusCode
     */

    res.success = (data = null, message = responseCode.SUCCESS.name, statusCode = responseCode.SUCCESS.code) => {
        const response = success_response_obj(message, data);
        if (statusCode < 200 || statusCode > 299) statusCode = responseCode.SUCCESS.code;
        return res.status(statusCode).json(response);
    };

    /**
     *
     * @param error
     * @param message
     * @param statusCode
     */
    res.error = (error = responseCode.SERVER.name, message = 'Failed', statusCode = 200) => {
        const response = error_response_obj(message, error);
        if (statusCode >= 200 && statusCode <= 299) statusCode = 500;
        return res.status(statusCode).json(response);
    };

    /**
     *
     * @param error
     * @param message
     * @param statusCode
     */
    res.errors = (error) => {
        let { statusCode } = error;
        const response = error_response_obj(error.message, error.name);
        if ((statusCode >= 200 && statusCode <= 299) || !statusCode) statusCode = 500;
        return res.status(statusCode).json(response);
    };

    next();
};
export default injector;
