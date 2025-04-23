// src/index.ts
import axios from "axios";
var clientId = "8d46d402-37e4-4b9c-82ef-ccf44acbb43f";
function authorize(allowedPermissions) {
  return async (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ").at(1);
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const response = await axios.get(
      `http://localhost:7001/api/v1/user-permissions/${clientId}`,
      {
        headers: req.headers
      }
    );
    if (response.status !== 200) {
      res.status(response.status).json(response.data);
      return;
    }
    req.user = response.data.user;
    next();
  };
}
export {
  authorize
};
