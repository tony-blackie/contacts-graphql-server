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
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class ContactAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://budget-eb326.web.app/api/v1";
        this.getContacts = this.getContacts.bind(this);
    }
    getContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get(this.baseURL + "/contacts");
        });
    }
    addContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post(this.baseURL + "/contacts", contact);
        });
    }
    deleteContact(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.delete(this.baseURL + `/contacts/${contactId}`);
        });
    }
    updateContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const patch = yield this.patch(this.baseURL + `/contacts/${contact.id}`, {
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
            });
            console.log("patch result: ", patch.toString());
            return patch;
        });
    }
}
exports.default = ContactAPI;
