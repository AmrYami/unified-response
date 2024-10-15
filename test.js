const UnifiedResponse = require('./index');

// Test Success Response
console.log(UnifiedResponse.successResponse({ userId: 1 }, "User fetched successfully"));

// Test Error Response
console.log(UnifiedResponse.errorResponse("User not found"));

