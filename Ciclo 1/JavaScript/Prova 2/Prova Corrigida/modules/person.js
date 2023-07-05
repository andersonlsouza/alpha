export default class person{
    email;
    birthDate;
    constructor(_email, _birthDate){
        this.email = _email;
        this.birthDate = _birthDate;
    }

    getEmail() {
        return this.email;
    }

    getBirthDate() {
        return this.birthDate;
    }

    getCode() {

        let soma = 0;
        for (let i = 0; i < this.birthDate.length; i++) {
            if (this.birthDate[i] != "-") {
                soma += Number(this.birthDate[i]);
            }
        }
        return soma;
    }
}