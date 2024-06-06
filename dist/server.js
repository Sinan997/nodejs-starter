"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const connect_db_1 = __importDefault(require("./utils/connect-db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.get('/health', (req, res) => {
    res.send('hello world');
});
app.listen(process.env.PORT || 3000, () => {
    (0, connect_db_1.default)();
    console.log(`server started on port ${process.env.PORT || 3000}`);
});
