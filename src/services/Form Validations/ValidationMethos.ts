import {emailRegEx, passwordRegEx} from '../../constants/FomConstants';

export const handleLoginValidation = (formData: {
  email: string;
  password: string;
  rememberMe: boolean;
}) => {
  const isEmpty = (Object.keys(formData) as Array<keyof typeof formData>).some(
    (key: keyof typeof formData) =>
      formData[key] === '' ||
      formData[key] === null ||
      formData[key] === undefined,
  );

  if (isEmpty) {
    return {
      isInValid: true,
      errorMessage: 'Email and password are required',
    };
  }

  if (!emailRegEx.test(formData.email)) {
    return {
      isInValid: true,
      errorMessage: 'Enter an valid email',
    };
  }

  if (!passwordRegEx.test(formData.password)) {
    return {
      isInvalid: true,
      errorMessage:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character',
    };
  }
  return {
    isInValid: false,
    errorMessage: '',
  };
};

export const handleSignUpValidation = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const isEmpty = (Object.keys(formData) as Array<keyof typeof formData>).some(
    (key: keyof typeof formData) =>
      formData[key] === '' ||
      formData[key] === null ||
      formData[key] === undefined,
  );

  if (isEmpty) {
    return {
      isInValid: true,
      errorMessage: 'Enter all the mandatory fields',
    };
  }

  if (!emailRegEx.test(formData.email)) {
    return {
      isInValid: true,
      errorMessage: 'Enter an valid email',
    };
  }

  if (!passwordRegEx.test(formData.password)) {
    return {
      isInvalid: true,
      errorMessage:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character',
    };
  }

  if (formData.password !== formData.confirmPassword) {
    return {
      isInvalid: true,
      errorMessage: 'Password and confirm password must be same',
    };
  }

  return {
    isInValid: false,
    errorMessage: '',
  };
};
