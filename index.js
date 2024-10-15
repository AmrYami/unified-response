

class customErrorException extends Error {
  constructor(message, type, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;  // Add custom type for error classification
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnifiedResponse {

  static customError(message, type = "Error") {
    return new customErrorException(message, type, statusCode);
  }


  static success(data, message = "Success", statusCode = 200) {
    return {
      statusCode: statusCode,
      body: {
        status: "success",
        message,
        data,
      },
    };
  }

  static error(error, message = "An error occurred", statusCode = 500) {
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        status: "error",
        message,
        error: error.message || error,
      }),
    };
  }


  static buildSuccessResponse(statusCode, body = {}) {
    return {
      statusCode,
      body: body,

    };
  }

  static buildErrorResponse(statusCode, error = {}) {
    return {
      statusCode,
      error: error,

    };
  };

  static successResponse(message, data = {}) {
    return this.buildSuccessResponse(200, {
      success: true,
      message,
      data,
    });
  };

  static createdResponse(message, data = {}) {
    return this.buildSuccessResponse(201, {
      success: true,
      message,
      data,
    });
  };

  static validationErrorResponse(message, data = {}) {
    return this.buildErrorResponse(422, {
      success: false,
      message,
      data,
    });
  };


  static dataAlreadyExistResponse(message, errors = {}) {
    return this.buildErrorResponse(409, {
      success: false,
      message,
      errors,
    });
  };

  static errorResponse(message, statusCode = 500, data = {}) {
    return this.buildErrorResponse(statusCode, {
      success: false,
      message,
      data,
    });
  };

}

module.exports = UnifiedResponse;
