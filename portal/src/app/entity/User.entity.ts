import { Contact } from './Contact.entity';
import { Address } from './Address.entity';
import { FormGroup } from '@angular/forms';
export class User {
  companyId: string;
  userId: string;
  firstName: string;
  lastName: string;
  userLogin: string;
  status: string;
  lastLoginDate: string;
  notes: string;
  userRoles: any[];
  address: Address = new Address();
  isDayLightSavingsTimeObserved: any;
  preferredDateFormat: any;
  preferredTimezone: any;
  preferredLanguage: any;
  contactInformation: Contact = new Contact();
  isRequiredGXSMarketingMaterialsl:any;
  consentCause:  any;

  convertUserType(rForm: FormGroup): User {

    this.lastName = rForm.controls.lastName.value;
    this.firstName = rForm.controls.firstName.value;
    this.contactInformation.email= rForm.controls.email.value;
    this.contactInformation.fax = rForm.controls.fax.value;
    if (rForm.controls.postalCode.value && rForm.controls.postalCode.value.length > 0)
      this.address.postalCode = rForm.controls.postalCode.value;
    this.contactInformation.mobileNumber = rForm.controls.mobile.value;
    if (rForm.controls.state.value && rForm.controls.state.value.length > 0)
      this.address.state = rForm.controls.state.value;
    this.address.city = rForm.controls.city.value;
    this.address.addressLine1 = rForm.controls.addressLine1.value;
    this.address.addressLine2 = rForm.controls.addressLine2.value;
    this.contactInformation.telephone = rForm.controls.phone.value;

    this.address.countryCode = rForm.controls.country.value;

    return this;
  }
}

