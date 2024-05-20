"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateEmailController_1 = require("../controllers/ValidateEmailController");
const multerConfig_1 = require("../middlwares/multerConfig");
const router = (0, express_1.Router)();
const validateEmailController = new ValidateEmailController_1.ValidateEmailController();
router.post('/validate-emails', (0, multerConfig_1.configureMulter)(), (req, res) => validateEmailController.validateEmails(req, res));
exports.default = router;
