export interface SignUpLayout {
  plans?: PaymentPlans[];
  levels?: LanguageLevels[];
  steps?: SignupSteps[];
  stepperValue?: number;
}

export interface PaymentPlans {
  id: number;
  slug?: string;
  title?: string;
  label?: string;
  fragment?: string;
  benefits?: PaymentPlanBenefits[];
  totalPrice?: PaymentPlanTotalPrice;
}

export interface PaymentPlanTotalPrice extends PaymentPlanBenefits {
  price: number;
  period?: string;
  note?: string;
}

export interface PaymentPlanBenefits {
  icon?: string;
  label?: string;
  fragment?: string;
  style?: { [klass: string]: any; };
}

export interface LanguageLevels {
  label: string;
  value: string;
  icon: string;
}

export interface SignupSteps {
  label?: string;
  fields?: string[];
  extendedAttributes?: any;
  condition?: (formData: any) => boolean;
}
