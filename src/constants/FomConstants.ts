const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export {emailRegEx, passwordRegEx};

export const available_countries = [
  {
    id: 'IN',
    full_name_english: 'India',
    full_name_locale: 'India',
    three_letter_abbreviation: 'IND',
    two_letter_abbreviation: 'IN',
  },
];

export const available_regions = [
  {
    id: 594,
    code: 'OR',
    name: 'Odisha',
  },
];

export const countryObj = {
  India: {
    id: 'IN',
    full_name_english: 'India',
    full_name_locale: 'India',
    three_letter_abbreviation: 'IND',
    two_letter_abbreviation: 'IN',
  },
};

export const regionObj = {
  Odisha: {
    region_id: 594,
    region_code: 'OR',
    region: 'Odisha',
  },
};
