"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => initialize
});
module.exports = __toCommonJS(index_exports);
var import_axios = __toESM(require("axios"));
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
      const response = await import_axios.default.get(
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
