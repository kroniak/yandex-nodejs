const MyForm = require('./index');

it('empty fiels validation success', () => {
    const result = MyForm.validate({});

    expect(result).toEqual({ isValid: false, errorFields: ['fio', 'email', 'phone'] });
});

it('fio validation success', () => {
    const result = MyForm.validate({
        fio: 'A B C',
        email: 'none@ya.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result).toEqual({ isValid: true, errorFields: [] });

    const result2 = MyForm.validate({
        fio: ' A B    C ',
        email: 'none@ya.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result2).toEqual({ isValid: true, errorFields: [] });
});

it('fio validation fail', () => {
    const result = MyForm.validate({
        fio: 'A B C D ',
        email: 'none@ya.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result).toEqual({ isValid: false, errorFields: ['fio'] });
});

it('email validation success ya.ru', () => {
    const result = MyForm.validate({
        fio: 'A B C',
        email: 'none@ya.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result).toEqual({ isValid: true, errorFields: [] });
});

it('email validation success yandex.ru', () => {
    const result = MyForm.validate({
        fio: 'A B C',
        email: 'none@yandex.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result).toEqual({ isValid: true, errorFields: [] });
});

it('email validation fail ya.com', () => {
    const result = MyForm.validate({
        fio: 'A B C',
        email: 'none@ya.com',
        phone: '+7(111)222-33-11'
    });

    expect(result).toEqual({ isValid: false, errorFields: ['email'] });
});

it('phone validation success', () => {
    const result = MyForm.validate({
        fio: 'A B C',
        email: 'none@yandex.ru',
        phone: '+7(111)222-33-11'
    });

    expect(result).toEqual({ isValid: true, errorFields: [] });
});

it('phone validation fail by regexp', () => {
    const result = MyForm.validate({
        fio: 'A B C',
        email: 'none@yandex.ru',
        phone: '+8(111)222-33-11'
    });

    expect(result).toEqual({ isValid: false, errorFields: ['phone'] });
});

it('phone validation fail by sum', () => {
    const result = MyForm.validate({
        fio: 'A B C',
        email: 'none@yandex.ru',
        phone: '+7(222)444-55-66'
    });

    expect(result).toEqual({ isValid: false, errorFields: ['phone'] });
});
