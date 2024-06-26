"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middlewares/validators/auth");
const router = (0, express_1.Router)();
router.post('/login', auth_2.validateLoginBody, auth_1.loginController);
router.post('/logout', auth_2.validateLogoutBody, auth_1.logoutController);
router.post('/refresh-token', auth_2.validateLogoutBody, auth_1.refreshTokenController);
exports.default = router;
