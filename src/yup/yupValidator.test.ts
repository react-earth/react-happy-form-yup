import {yupValidator} from './yupValidator';
import * as y from 'yup';

describe('yupValidator', () => {
  it('the errors should be returned', async () => {
    const schema = y.object({
      name: y.string().required(),
    });

    expect(await yupValidator(schema)({})).toEqual({
      errors: {name: 'name is a required field'},
    });
  });
});
