"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initialize;
const axios_1 = __importDefault(require("axios"));
// Functions
function initialize(authConfig) {
    const clientId = authConfig.clientId;
    const baseUrl = authConfig.serviceBaseUrl;
    const api = axios_1.default.create({ baseURL: baseUrl });
    return {
        authorize: (allowedPermissions) => ((req, res, next) => {
            try {
                // req handler logic
                console.log(clientId, baseUrl);
                next();
            }
            catch (error) {
                next(error);
            }
        }),
    };
}
