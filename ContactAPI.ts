import { RESTDataSource } from "apollo-datasource-rest";
import { map } from "lodash";

class ContactAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://budget-eb326.web.app/api/v1";

    this.getContacts = this.getContacts.bind(this);
  }

  async getContacts() {
    return await this.get(this.baseURL + "/contacts");
  }

  async addContact(contact) {
    return await this.post(this.baseURL + "/contacts", contact);
  }

  async deleteContact(contactId) {
    return await this.delete(this.baseURL + `/contacts/${contactId}`);
  }

  async updateContact(contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    const patch = await this.patch(this.baseURL + `/contacts/${contact.id}`, {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
    });

    console.log("patch result: ", patch.toString());

    return patch;
  }
}

export default ContactAPI;
