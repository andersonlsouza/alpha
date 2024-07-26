class Validator {
    data: number | string;

    constructor( value: number | string ) {
        this.data = value;        
    }
}

const validate = new Validator("Informação");