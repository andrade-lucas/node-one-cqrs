import { isNullOrUndefined } from "util";

export class Flunt {
    public errors: string[];

    constructor() {
        this.errors = [];
    }

    hasMinLen = (value, min, message) => {
        if (!value || value.length < min)
            this.errors.push(message);
    }

    hasMaxLen = (value, max, message) => {
        if (!value || value.length > max)
            this.errors.push(message);
    }

    isFixedLen = (value, len, message) => {
        if (!value || value.length != len)
            this.errors.push(message);
    }

    isNullOrEmpty = (value, message) => {
        if (!value || value.length <= 0 || isNullOrUndefined(value))
            this.errors.push(message);
    }

    isEmail = (value, message) => {
        let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!reg.test(value))
            this.errors.push(message);
    }

    isCpf = (value, message) => {
        var soma;
        var resto;
        soma = 0;
        if (value == "00000000000") {
            this.errors.push(message);
        }

        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
        }

        resto = soma % 11;

        if (resto == 10 || resto == 11 || resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }

        if (resto != parseInt(value.substring(9, 10))) {
            this.errors.push(message);
        }

        soma = 0;

        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
        }
        resto = soma % 11;

        if (resto == 10 || resto == 11 || resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }

        if (resto != parseInt(value.substring(10, 11))) {
            this.errors.push(message);
        }
    }

    clean = () => {
        this.errors = [];
    }

    isValid = () => {
        return this.errors.length === 0;
    }
}