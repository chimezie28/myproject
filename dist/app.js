"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = __importDefault(require("./config/environment"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
(0, environment_1.default)();
const app = (0, express_1.default)();
// Define the root route to send plain text
app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Welcome to the Insemi App!');
});
app.use(express_1.default.json());
app.use('/api/users', user_routes_1.default);
exports.default = app;
