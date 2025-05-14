"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureEnvironment;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
function configureEnvironment() {
    const NODE_ENV = process.env.NODE_ENV;
    if (NODE_ENV) {
        const envPath = path_1.default.join(__dirname, '..', `.env.${NODE_ENV}`);
        dotenv_1.default.config({ path: envPath });
    }
    else {
        console.error("NODE_ENV is not set!");
    }
}
