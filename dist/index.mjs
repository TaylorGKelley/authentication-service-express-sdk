// src/index.ts
import axios from "axios";
var linkedServiceId = null;
var hostedUrl = null;
function initialize({ clientId, baseUrl }) {
  linkedServiceId = clientId;
  hostedUrl = baseUrl;
  return {
    authorize
  };
}
function authorize(allowedPermissions) {
  return async (req, res, next) => {
    var _a;
    try {
      const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ").at(1);
      if (!token) {
        throw new Error("Unauthorized: No token provided");
      }
      const response = await axios.get(
        `${hostedUrl}/user-permissions/${linkedServiceId}`,
        {
          headers: req.headers
        }
      );
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      const { user, permissions } = response.data;
      req.user = user;
      const isAllowed = allowedPermissions.some(
        (allowedPermission) => permissions.includes(allowedPermission)
      );
      if (!isAllowed && !allowedPermissions.includes("public")) {
        throw new Error("Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
export {
  initialize as default
};
