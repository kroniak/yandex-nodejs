var MyForm = {
    validate(obj) {
        const result = {
            isValid: true,
            errorFields: []
        };

        function pushValidationFail(fieldName) {
            result.isValid = false;
            const { errorFields } = result;
            if (!errorFields.includes(fieldName))
                errorFields.push(fieldName);
        }

        if (!obj) obj = this.getData();

        ['fio', 'email', 'phone'].forEach(value => {
            if (!obj.hasOwnProperty(value)) pushValidationFail(value);
        });

        const { fio = '', email = '', phone = '' } = obj;

        const fioTrimmed = fio.replace(/\s\s+/g, ' ').trim().split(' ');
        if (fioTrimmed.length !== 3) pushValidationFail('fio');

        const regEmail = /^\w+([\.-]?\w+)*@ya.ru|yandex.ru|yandex.ua|yandex.by|yandex.kz|yandex.com$/;
        if (!regEmail.test(email)) pushValidationFail('email');

        const regPhone = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
        if (!regPhone.test(phone)) pushValidationFail('phone')
        else {
            const sPhone = phone
                .replace(/\+/g, '')
                .replace(/\-/g, '')
                .replace(/\(/g, '')
                .replace(/\)/g, '');
            let sum = 0;
            for (var i = 0; i < sPhone.length; i++) {
                sum += Number(sPhone[i]);
            }
            if (sum > 30) pushValidationFail('phone');
        }

        return result;
    },

    getData() {
        const inputs = document
            .getElementById('myForm')
            .getElementsByTagName('input');

        const result = {};

        for (var i = 0; i < inputs.length; i++) {
            const field = inputs[i];
            if (field.id !== 'submitButton')
                result[field.name] = field.value;
        }

        return result;
    },

    setData(obj) {
        const inputs = document
            .getElementById('myForm')
            .getElementsByTagName('input');

        for (let name in obj) {
            if (obj.hasOwnProperty(name) && (name === 'fio' || name === 'email' || name === 'phone')) {
                inputs[name].value = obj[name];
            }
        }
    },

    submit() {
        this.setData({
            fio: 'Molchanov Nikolay V.',
            email: 'sds@ya.ru',
            phone: '+7(111)222-33-11'
        });

        const validationResult = this.validate();
        if (validationResult.isValid) {
            console.log('OK');
            document.forms["myForm"].submit();
        }
    }
}

if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = MyForm;
}
