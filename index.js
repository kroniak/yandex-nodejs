var MyForm = {
    validate(obj) {
        return {
            isValid: true,
            errorFields: []
        }
    },

    getData() {},

    setData(obj) {},

    submit() {
        if (this.validate(this.getData()).isValid) {
            console.log('OK');
        }
    }
};
