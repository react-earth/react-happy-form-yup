import * as Yup from 'yup';
import type Lazy from 'yup/lib/Lazy';

type Options<T extends Yup.AnyObjectSchema | Lazy<any>> = Parameters<T['validate']>[1];

export type Validator = <T extends Yup.AnyObjectSchema | Lazy<any>>(
  schema: T,
  schemaOptions?: Options<T>,
  validateOptions?: {mode?: 'async' | 'sync'}
) => (values: any) => Promise<{errors: Record<string, string>}>;

export const yupValidator: Validator =
  (schema, schemaOptions = {}, validateOptions = {}) =>
  async (values) => {
    try {
      await schema[validateOptions.mode === 'sync' ? 'validateSync' : 'validate'](
        values,
        Object.assign({abortEarly: false}, schemaOptions)
      );

      return {
        errors: {},
      };
    } catch (e: any) {
      if (!e.inner) {
        throw e;
      }

      return {
        errors: e.inner.reduce((error: any, item: any) => {
          error[item.path] = item.message;
          return error;
        }, {}),
      };
    }
  };
