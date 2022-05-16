"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
function apiAdapter(baseURL) {
    return axios_1.default.create({
        baseURL: baseURL,
    });
}
exports.apiAdapter = apiAdapter;
//# sourceMappingURL=apiAdapter.js.map