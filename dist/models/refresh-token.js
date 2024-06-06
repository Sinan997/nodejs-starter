"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RefreshTokenSchema = new mongoose_1.Schema({
    token: { type: String, required: true },
    userId: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('RefreshToken', RefreshTokenSchema);
