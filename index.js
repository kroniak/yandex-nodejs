var MyForm = {
    /**
     * Return object with validation result
     * 
     * @param {Object} [obj] Object with input types values. Optional. 
     * @returns
     */
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

    /**
     * Get object with inputs values
     * 
     * @returns 
     */
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

    /**
     * Set input values from obj arg.
     * 
     * @param {Object} obj 
     */
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

    /**
     * Submit form event handler 
     * 
     */
    submit() {
        /**
         * Fetch data from form action URL
         * 
         * @param {string} url 
         * @param {HTMLElement} div 
         */
        function fetchData(url, div) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === 'success') {
                        div.classList.toggle('success');
                        div.classList.remove('error');
                        div.classList.remove('progress');

                        div.textContent = 'Success';
                    } else if (data.status === 'error') {
                        div.classList.toggle('error');
                        div.classList.remove('success');
                        div.classList.remove('progress');

                        if (data.reason)
                            div.textContent = data.reason;
                    } else if (data.status === 'progress') {
                        div.classList.remove('success');
                        div.classList.remove('error');
                        if (!div.classList.contains('progress'))
                            div.classList.add('progress');

                        if (data.timeout)
                            setTimeout(fetchData, data.timeout, url, div);
                    }
                });
        }

        /**
         * Set validation statuses to field
         * 
         * @param {string[]} errorFields 
         */
        function setValidationStatuses({errorFields}) {
            const inputs = document
                .getElementById('myForm')
                .getElementsByTagName('input');

            for (const input of inputs) {
                if (input.id !== 'submitButton')
                    if (errorFields.includes(input.name) && !input.classList.contains('error')) {
                        input.classList.add('error')
                    } else if (!errorFields.includes(input.name) && input.classList.contains('error')) {
                        input.classList.remove('error')
                }
            }
        }

        const validationResult = this.validate();
        setValidationStatuses(validationResult);

        if (validationResult.isValid) {
            document.getElementById('submitButton').disabled = true;

            const url = document.getElementById('myForm').action;
            const resultDiv = document.getElementById('resultContainer');

            fetchData(url, resultDiv);
        }
    }
}

if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = MyForm;
}
