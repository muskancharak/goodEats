// response.js
export const successResponse = (res, data, message = "Success", meta = {}) => {
  // Case 1: If data is missing or empty array
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return res.status(404).json({
      success: false,
      message: "No data found",
      data: null,
      meta
    });
  }

  // Case 2: If data is an object with nested array (e.g. { getProducts: [] })
  if (
    typeof data === "object" &&
    data !== null &&
    Object.values(data).some(val => Array.isArray(val) && val.length === 0)
  ) {
    return res.status(404).json({
      success: false,
      message: "No data found",
      data,
      meta
    });
  }

  // Case 3: Normal success
  return res.status(200).json({
    success: true,
    message,
    data,
    meta
  });
};


export const errorResponse = (res, error, statusCode = 500, errorCode = null, meta = {}) => {
    
    console.error("[ERROR]", error.stack || error);

    return res.status(statusCode).json({
        success: false,
        message: error.message,
        errorCode,  
        meta
    });
};
