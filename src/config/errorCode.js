module.exports = {

  DUPLICATE_KEY_VALUE: {
    httpStatusCode: 409,
    body: {
      code: 'duplicate_key_value',
      message: 'Value already existed',
    },
  },

  INTERNAL_SERVER_ERROR: {
    httpStatusCode: 500,
    body: {
      code: 'internal_server_error',
      message: 'Something went wrong, please try again later.',
    },
  },

  NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: 'not_found',
      message: 'You lost somewhere. Please check url again.',
    },
  },

  RESOURCE_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: 'resource_not_found',
      message: 'Requested resource not found.',
    },
  },

  RESOURCE_ALREADY_EXISTS: {
    httpStatusCode: 409,
    body: {
      code: 'resource_already_exists',
      message: 'Requested resource already exists.',
    },
  },

  FORBIDDEN: {
    httpStatusCode: 403,
    body: {
      code: 'forbidden',
      message: 'Permission denied.',
    },
  },

  UNAUTHORIZED: {
    httpStatusCode: 401,
    body: {
      code: 'unauthorized',
      message: 'You are not authorized.',
    },
  },

  TOKEN_EXPIRED: {
    httpStatusCode: 401,
    body: {
      code: 'token_expired',
      message: 'Provided authorization token has been expired. Please renew token with provider entity.',
    },
  },

  CONFLICT: {
    httpStatusCode: 409,
    body: {
      code: 'conflict',
      message: 'Duplicate resource',
    },
  },

  INVALID_DATA: {
    httpStatusCode: 400,
    body: {
      code: 'invalid_data',
      message: 'Provided arguments are invalid or does not exists',
    },
  },

  NOT_IMPLEMENTED: {
    httpStatusCode: 501,
    body: {
      code: 'not_implemented',
      message: 'Server does not support the functionality required to fulfill the request.',
    },
  },

  UNPROCESSABLE: {
    httpStatusCode: 422,
    body: {
      code: 'unprocessable',
      message: 'The request is unable to be processed.',
    },
  },

  PERMISSION_DENIED: {
    httpStatusCode: 403,
    body: {
      code: 'permission_denied',
      message: 'Permission denied.',
    },
  },

  23505: {
    httpStatusCode: 409,
    body: {
      code: 'duplicate_key_value',
      message: 'Value already existed',
    },
  },

};
