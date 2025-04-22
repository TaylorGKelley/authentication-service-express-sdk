// src/index.ts
function authorize(allowedPermissions) {
  return (req, res, next) => {
    console.log(allowedPermissions);
    next();
  };
}
export {
  authorize
};
