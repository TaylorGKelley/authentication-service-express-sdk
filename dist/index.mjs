// src/index.ts
import axios from "axios";
var linkedServiceId = null;
var hostedUrl = null;
function initialize({ clientId, baseUrl }) {
  linkedServiceId = clientId;
  hostedUrl = baseUrl;
}
function authorize(allowedPermissions) {
  return async (req, res, next) => {
    var _a, _b, _c, _d;
    try {
      const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ").at(1);
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const response = await axios.get(
        `${hostedUrl}/api/v1/user-permissions/${linkedServiceId}`,
        {
          headers: req.headers
        }
      );
      if (response.status !== 200) {
        res.status(response.status).json(response.data);
        return;
      }
      const { user, permissions } = response.data;
      req.user = user;
      const isAllowed = allowedPermissions.some(
        (allowedPermission) => permissions.includes(allowedPermission)
      );
      if (!isAllowed && !allowedPermissions.includes("public")) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
      next();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res.status((_b = error.status) != null ? _b : 500).json({ message: (_d = (_c = error.response) == null ? void 0 : _c.data) == null ? void 0 : _d.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };
}
export {
  authorize,
  initialize as default
};
