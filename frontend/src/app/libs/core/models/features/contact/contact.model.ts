export interface ContactSubmit {
  name: string;
  email: string;
  body: string;
  recaptcha: string;
}

export interface ContactField {
  name: string;
  label?: string;
  formControlName?: string;
  type: ContactFieldType;
}

export type ContactFieldType = 'text-input' | 'text-area' | 'recaptcha';
