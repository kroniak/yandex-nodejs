var MyForm = {
    validate(obj) {
        const result = {
            isValid: true,
            errorFields: []
        };

        ['fio', 'email', 'phone'].forEach(value => {
            if (!obj.hasOwnProperty(value)) {
                result.isValid = false;
                result.errorFields.push(value);
            }
        });

        for (let name in obj) {
            if (obj.hasOwnProperty(name))
                if (name === 'fio') {
                    const fio = obj[name].replace(/\s\s+/g, ' ').trim().split(' ');
                    if (fio.length !== 3) {
                        result.isValid = false;
                        result.errorFields.push(name);
                    }
                }
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
            fio: 'Molchanov',
            email: 'sds@sdsd',
            phone: '89214445559'
        });

        if (this.validate(this.getData()).isValid) {
            console.log('OK');
            document.forms["myForm"].submit();
        }
    }
};
