import {useCallback} from 'react';
import * as Yup from 'yup';
import {ObjectSchema} from 'yup';
import useToast from './UseToast';

interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors?: {[key: string]: string};
}

const useValidation = <T extends object>(schema: ObjectSchema<T>) => {
  const {showErrorToast} = useToast();

  const validate = useCallback(
    async (formData: T): Promise<ValidationResult<T>> => {
      try {
        const validatedData = (await schema.validate(formData, {
          abortEarly: false,
        })) as T;
        return {isValid: true, data: validatedData};
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: {[key: string]: string} = {};
          err.inner.forEach(error => {
            validationErrors[error.path as string] = error.message;
          });
          const errorMessages = Object.values(validationErrors).join('\n');
          showErrorToast(errorMessages, 'Validation Errors');
          return {isValid: false, errors: validationErrors};
        }

        throw err;
      }
    },
    [schema, showErrorToast],
  );

  return {validate};
};

export default useValidation;
