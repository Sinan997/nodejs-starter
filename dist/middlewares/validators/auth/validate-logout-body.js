"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogoutBody = void 0;
function validateLogoutBody(req, res, next) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(406).json({ code: 'MISSING_FIELDS', message: 'Fill required places.' });
    }
    next();
}
exports.validateLogoutBody = validateLogoutBody;
