const MyForm = require('./index');

it('test empty validation fields', () => {
    const result = MyForm.validate({});

    expect(result).toEqual({ isValid: false, errorFields: ['fio', 'email', 'phone'] });
});

it('test fio validation success', () => {
    const result = MyForm.validate({
        fio: 'A B C',
        email: 'none@yandex.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result).toEqual({ isValid: true, errorFields: [] });

    const result2 = MyForm.validate({
        fio: ' A B    C ',
        email: 'none@yandex.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result2).toEqual({ isValid: true, errorFields: [] });
});

it('test fio validation fail', () => {
    const result = MyForm.validate({
        fio: 'A B C D ',
        email: 'none@yandex.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result).toEqual({ isValid: false, errorFields: ['fio'] });
});