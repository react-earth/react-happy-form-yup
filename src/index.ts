export const yupValidator =
  (schema: any, schemaOptions = {}, resolverOptions = {}) =>
  async (values: any) => {
    try {
      const result = await schema.validate(values, { abortEarly: false });

      return {
        values: result,
        errors: {},
      };
    } catch (e: any) {
      if (!e.inner) {
        throw e;
      }

      return {
        values: {},
        errors: e.inner.reduce((error: any, item: any) => {
          error[item.path] = item.message;
          return error;
        }, {}),
      };
    }
  };
