import { SignUpLayout } from './signup-page.model';

export const SignUpConfiguration: SignUpLayout = {
  plans: [
    {
      id: 1,
      title: 'ChoosePlan.Monthly.Label',
      slug: 'monthly',
      label: 'Order',
      benefits: [
        {
          icon: 'checkBoxChecked',
          label: 'ChoosePlan.General.AllFeatures',
        },
        {
          icon: 'checkBoxChecked',
          label: 'ChoosePlan.Monthly.Offer',
        },
      ],
      totalPrice: {
        price: -1,
        period: 'ChoosePlan.Monthly.Period',
      },
    },
    {
      id: 2,
      title: 'ChoosePlan.Promise.Label',
      slug: 'free',
      fragment: 'ChoosePlan.Recommended',
      label: 'Start learning for free',
      benefits: [
        {
          icon: 'checkBoxChecked',
          label: 'ChoosePlan.General.AllFeatures',
        },
        {
          icon: 'checkBoxChecked',
          label: 'ChoosePlan.Promise.Offer',
        },
        {
          icon: 'checkBoxChecked',
          label: 'ChoosePlan.Promise.Note',
        },
      ],
      totalPrice: {
        price: -1,
        note: 'ChoosePlan.Promise.Condition',
        style: { 'flex-direction': 'column', 'text-align': 'center', 'font-weight': '500' },
      },
    },
    {
      id: 3,
      title: 'ChoosePlan.Annual.Label',
      slug: 'annual',
      label: 'Order',
      benefits: [
        {
          icon: 'checkBoxChecked',
          label: 'ChoosePlan.General.AllFeatures',
        },
        {
          icon: 'checkBoxChecked',
          label: 'ChoosePlan.Annual.Offer',
        },
      ],
      totalPrice: {
        price: -1,
        period: 'ChoosePlan.Annual.Period',
      },
    },
  ],
  levels: [
    {
      label: 'new-to-japanese',
      value: 'new',
      icon: 'skillLevel',
    },
    {
      label: 'beginner',
      value: 'beginner',
      icon: 'skillLevelBasic',
    },
    {
      label: 'intermediate',
      value: 'intermediate',
      icon: 'skillLevelIntermediate',
    },
    {
      label: 'upper-intermediate',
      value: 'upper-intermediate',
      icon: 'skillLevelAdvanced',
    },
    {
      label: 'advanced',
      value: 'advanced',
      icon: 'skillLevelAdvanced',
    },
  ],
  steps: [
    {
      label: 'Choose plan',
      fields: ['paymentPlan'],
    },
    {
      label: 'The Cost of Your Word',
      fields: ['fee'],
      extendedAttributes: {
        minValue: 3,
        maxValue: 500
      },
      condition: (formData: any) => formData?.controls?.tariff?.value === 'free'
    },
    {
      label: 'Japanese level',
      fields: ['level'],
    },
    {
      label: 'Topics',
      fields: ['favoriteCategoryId'],
    },
    {
      label: 'Languages',
      fields: ['languages'],
    },
    {
      label: 'E-mail',
      fields: ['email'],
    },
    {
      label: 'Password',
      fields: ['password', 'passwordRepeat'],
    },
    {
      label: 'Name',
      fields: ['name'],
    },
    {
      label: 'Phone',
      fields: ['telephone'],
    },
    {
      label: 'Validation',
      fields: [],
    }
  ],
  stepperValue: 5
};
