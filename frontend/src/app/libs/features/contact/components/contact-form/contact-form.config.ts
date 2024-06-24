import { ContactField } from '@app/libs/core/models/features/contact/contact.model';

export const ContactFormConfig: ContactField[] = [
  {
    name: 'name',
    type: 'text-input',
    label: 'Name',
    formControlName: 'name',
  },
  {
    name: 'email',
    type: 'text-input',
    label: 'Email',
    formControlName: 'email',
  },
  {
    name: 'body',
    type: 'text-area',
    label: 'Message',
    formControlName: 'body',
  },
  {
    name: 'recaptcha',
    type: 'recaptcha',
    formControlName: 'recaptcha',
  },
];
