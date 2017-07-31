var MyForm = {
    validate(obj) {
        const result = {
            isValid: true,
            errorFields: []
        };

        function pushValidationFail(fieldName) {
            result.isValid = false;
            const {errorFields} = result;
            if (!errorFields.includes(fieldName))
                errorFields.push(fieldName);
        }

        if (!obj)
            obj = this.getData();

        ['fio', 'email', 'phone'].forEach(value => {
            if (!obj.hasOwnProperty(value)) pushValidationFail(value);
        });

        const {fio = '', email = '', phone = ''} = obj;

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
            for (const digit of sPhone) {
                sum += Number(digit);
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

        for (const input of inputs) {
            if (input.id !== 'submitButton')
                result[input.name] = input.value;
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
        function turnOffNotNeedClass(div, classes) {
            if (Array.isArray(classes)) {
                for (const item of classes) {
                    const rule = '/(?:^|\s)' + item + '(?!\S)/';
                    if (div.className.match(new RegExp(rule, 'g')))
                        div.classList.toggle(item);
                }

            }
        }

        function fetchData(url, resultDiv) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    if (data.status === 'success') {
                        resultDiv.classList.toggle('success');
                        turnOffNotNeedClass(resultDiv, ['error', 'progress'])

                        resultDiv.textContent = 'Success';
                    } else if (data.status === 'error') {
                        resultDiv.classList.toggle('error');
                        turnOffNotNeedClass(resultDiv, ['success', 'progress'])
                        if (data.reason)
                            resultDiv.textContent = data.reason;
                    } else if (data.status === 'progress') {
                        turnOffNotNeedClass(resultDiv, ['success', 'error']);
                        if (!resultDiv.className.match(/(?:^|\s)progress(?!\S)/))
                            resultDiv.className += ' progress';

                        if (data.timeout)
                            setTimeout(fetchData, data.timeout, url, resultDiv);
                    }
                });
        }

        const inputs = document
            .getElementById('myForm')
            .getElementsByTagName('input');

        // this.setData({
            //     fio: 'Molchanov Nikolay V.',
            //     email: 'sds@ya.ru',
            //     phone: '+7(111)222-33-11'
            // });

        const validationResult = this.validate();

        if (validationResult.isValid) {
            for (const input of inputs) {
                if (input.id !== 'submitButton')
                    if (input.className.match(/(?:^|\s)error(?!\S)/))
                        input.classList.toggle('error');
            }

            document.getElementById('submitButton').disabled = true;

            const url = document.getElementById('myForm').action;
            const resultDiv = document.getElementById('resultContainer');

            fetchData(url, resultDiv);
        } else {
            const {errorFields} = validationResult;

            for (const name of errorFields) {
                document
                    .getElementById('myForm')
                    .getElementsByTagName('input')[name].classList.toggle('error');
            }
        }
    }
}

if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = MyForm;
}
