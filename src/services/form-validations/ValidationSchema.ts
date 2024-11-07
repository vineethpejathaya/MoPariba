import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  // email: Yup.string()
  //   .email('Invalid email format')
  //   .required('Email is required'),
  // password: Yup.string()
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //     'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character',
  //   )
  //   .required('Password is required'),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(4, 'OTP must be exactly 4 digits')
    .matches(/^[0-9]+$/, 'OTP must be numeric')
    .required('OTP is required'),
});

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password and Confirm password must match')
    .required('Confirm password is required'),
});
