
const asyncHandler = (controllerfunction) => (req, res, next) =>
Promise.resolve(controllerfunction(req, res, next)).catch(next);

export default asyncHandler;