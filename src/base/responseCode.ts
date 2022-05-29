const responseCode = {
    SUCCESS: {
        code: 200,
        name: 'OK',
    },
    CREATED: {
        code: 201,
        name: 'Created',
    },
    ACCEPTED: {
        code: 202,
        name: 'Created',
    },
    NO_CONTENT: {
        code: 204,
        name: 'No Content',
    },
    NOT_FOUND: {
        code: 404,
        name: 'Not Found',
    },
    BAD_REQUEST: {
        code: 400,
        name: 'Bad Request',
    },
    FORBIDDEN: {
        code: 403,
        name: 'Forbidden',
    },
    UN_AUTHENTICATION: {
        code: 401,
        name: 'Missing Authentication',
    },
    SERVER: {
        code: 500,
        name: 'Internal Server Error',
    },
    MISSING: {
        code: 422,
        name: 'Missing Parameter',
    },
    UNIQUE_DATA: {
        code: 422,
        name: 'DuplicateKey',
    },
    VALIDATION_ERROR: {
        code: 422,
        name: 'validation error',
    },
    UNSUPPORTED_MEDIA_TYPE: {
        code: 415,
        name: 'Unsupported Media Type',
    },
};

const onlyCode = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    NOT_FOUND: {
        code: 404,
        name: 'Not Found',
    },
    BAD_REQUEST: {
        code: 400,
        name: 'Bad Request',
    },
    FORBIDDEN: {
        code: 403,
        name: 'Forbidden',
    },
    SERVER: {
        code: 500,
        name: 'Internal Server Error',
    },
};

export default responseCode;
