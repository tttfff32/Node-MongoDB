"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmailController = void 0;
const axios_1 = __importDefault(require("axios"));
class ValidateEmailController {
    validateEmails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadedFile = req.file;
            if (!uploadedFile) {
                res.status(400).send({ error: 'No file uploaded' });
                return;
            }
            const emailAddresses = uploadedFile.buffer.toString('utf8').split(',');
            const validationResults = yield Promise.all(emailAddresses.map((emailAddress) => __awaiter(this, void 0, void 0, function* () {
                const trimmedEmail = emailAddress.trim();
                const isValid = yield this.validateEmail(trimmedEmail);
                return { emailAddress: trimmedEmail, isValid };
            })));
            res.status(200).send(validationResults);
        });
    }
    validateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKey = "cb08920a4ee841529f135301064959aa";
                const response = yield axios_1.default.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`);
                return response.data.is_valid_format.value;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.ValidateEmailController = ValidateEmailController;
