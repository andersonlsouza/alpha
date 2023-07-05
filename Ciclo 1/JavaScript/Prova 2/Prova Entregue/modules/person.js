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
        for (let i = 0; i < 10; i++) {
            if (this.birthDate.slice(i,1) != "-") {
                soma += Number(this.birthDate.slice(i,1));
            }
        }
        console.log(soma);

        return soma;
        // Transformar data de nascimento em soma
    }
}