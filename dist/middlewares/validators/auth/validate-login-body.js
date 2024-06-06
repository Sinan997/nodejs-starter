"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginBody = void 0;
function validateLoginBody(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(406).json({ code: 'MISSING_FIELDS', message: 'Fill required places.' });
    }
    next();
}
exports.validateLoginBody = validateLoginBody;
