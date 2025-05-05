require('dotenv').config();
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_controller_1 = require("./users.controller");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Enable CORS and body parsing
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Mount the users router at /users
app.use('/users', users_controller_1.usersRouter);
// Start the server
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
    console.log('API key:', process.env.ALPHAVANTAGE_API_KEY);
});
