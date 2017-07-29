import file from './index';

const MyForm = file.__get__('MyForm');

it('test emty validation fields', () => {
    const result = MyForm.validate({});

    expect(result).toEqual({ isValid: false, errorFields: ['fio', 'email', 'phone'] });
});