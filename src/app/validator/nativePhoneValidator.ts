import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface CountryConfig {
  name: string;
  code: string;
  dialCode: string;
  regex: RegExp;
  placeholder: string;
  image: string;
  maxvalidDigits?: number;
  minvalidDigits?: number;
}

// 1. Define your custom rule matrix (Zero external package dependencies)
export const COUNTRY_PHONE_RULES: CountryConfig[] = [
  {
    name: 'Egypt',
    code: 'EG',
    dialCode: '+20',

    regex: /^(?:0)?1[0125]\d{8}$/,
    placeholder: '01*********',
    image: 'images/egypt.svg',
    maxvalidDigits: 11,
    minvalidDigits: 1,
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',

    dialCode: '+966',
    regex: /^5\d{8}$/,
    placeholder: '5********',
    image: 'images/SA.svg',
    maxvalidDigits: 9,
    minvalidDigits: 1,
  },
  // {
  //   name: 'United Arab Emirates',
  //   code: 'AE',
  //   dialCode: '+971',
  //   // Matches 50, 52, 54, 55, 56, 58 followed by 7 digits
  //   regex: /^5[024568]\d{7}$/,
  //   placeholder: '501234567',
  // },
];

// 2. Custom Validator that links the Selected Country to the Input Field
export function nativePhoneValidator(countryControlName: string): ValidatorFn {
  return (phoneControl: AbstractControl): ValidationErrors | null => {
    if (!phoneControl.value) return null;

    const formGroup = phoneControl.parent;
    if (!formGroup) return null;

    // Get the currently selected country code from your PrimeNG dropdown control
    const countryCode = formGroup.get(countryControlName)?.value;
    const rule = COUNTRY_PHONE_RULES.find((c) => c.code === countryCode);

    if (!rule) return null; // No custom rule defined, skip

    // Normalize input to digits only for layout testing
    const cleanDigits = phoneControl.value.replace(/\D/g, '');
    const isValid = rule.regex.test(cleanDigits);

    if (!isValid) {
      return {
        invalidPhoneStructure: {
          country: rule.name,
          message: `Invalid format for ${rule.name}. Expected format: ${rule.placeholder} . cant be exceed ${rule.maxvalidDigits} digits and cant be less than ${rule.minvalidDigits} digits`,
        },
      };
    }

    return null;
  };
}
