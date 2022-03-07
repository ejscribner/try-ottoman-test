const { model, addValidators, Schema } = require('ottoman');

addValidators({
  phone: (value) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (value && !value.match(regex)) {
      throw new Error('Phone number is invalid.');
    }
  },
});

const TestSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, validator: 'phone' },
});

const keyGenFunc = () => {
  return ''
}

const TestModel = model(
    'test',
    TestSchema,
    {
      scopeName: 'testScope',
      keyGenerator: keyGenFunc,
      keyGeneratorDelimiter: ''
    }
);

module.exports = {
  TestModel
}
