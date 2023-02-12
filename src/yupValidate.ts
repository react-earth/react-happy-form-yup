import {FormErrors} from 'react-happy-form';
import {ObjectSchema, ValidationError} from 'yup';

export const yupValidate = <T>(yupSchema: ObjectSchema<any>) => {
  return async (values: T) => {
    const formErrors: FormErrors<T> = new Map();
    try {
      await yupSchema.validate(values, {abortEarly: false});
    } catch (error: any) {
      if (error instanceof ValidationError) {
        error.inner.forEach((item) => {
          formErrors.set(item.path, item.message);
        });
      }
    }
    return formErrors;
  };
};
