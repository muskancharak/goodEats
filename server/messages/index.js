export const SUCCESS = {
  // User
  USER_REGISTERED: "User registered successfully.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",
  OTP_SENT: "OTP has been sent successfully.",
  OTP_VERIFIED: "OTP verified successfully.",
  PASSWORD_CHANGED: "Password changed successfully.",
  PASSWORD_RESET_TOKEN_SENT: "Password reset token sent to email.",
  PROFILE_UPDATED: "Profile updated successfully.",

  // Category
  MENU_ADDED: "Menu added successfully.",
  MENU_UPDATED: "Category updated successfully.",
  MENU_DELETED: "Category deleted successfully.",
  MENU_FETCHED: "Categories fetched successfully.",

  // Subcategory
  RESTRO_ADDED: "Restro added successfully.",
  RESTRO_UPDATED: "Restro updated successfully.",
  RESTRO_DELETED: "Restro deleted successfully.",
  RESTRO_FETCHED: "Restro fetched successfully.",

  // Product
  PRODUCT_ADDED: "Product added successfully.",
  PRODUCT_UPDATED: "Product updated successfully.",
  PRODUCT_DELETED: "Product deleted successfully.",
  PRODUCT_FETCHED: "Products fetched successfully.",
  PRODUCT_STATUS_UPDATED: "Product status updated successfully.",
  PRODUCT_APPROVED: "Product approved successfully.",
  PRODUCT_REJECTED: "Product rejected successfully.",

  //seller req
  SENT_REQUEST : "Request sent successfully",

  //admin
  FECHED_REQUEST : "all request fetched successfully",
  STATUS_CHANGED : "status changed successully"

};



export const ERROR = {
  USER_ALREADY_EXISTS: "User already exists with this email.",
  USER_NOT_FOUND: "User not found.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  OTP_INVALID: "Invalid OTP.",
  OTP_EXPIRED: "OTP has expired.",
  PASSWORD_MISMATCH: "Old password does not match.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  SERVER_ERROR: "Something went wrong on the server.",
  EMAIL_NOT_SENT: "Failed to send email. Please try again."
};
